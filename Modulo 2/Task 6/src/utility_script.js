export {
  proPublicaUrl,
  proPublicaInit,
  openStatesUrls,
  openStatesKey,
  openStatesInit,
  fetchAndCache,
  switchingOrder
};

//info para fetch en pro publica
var proPublicaUrl = {
  senate: 'https://api.propublica.org/congress/v1/113/senate/members.json',
  house: 'https://api.propublica.org/congress/v1/113/house/members.json'
};

var proPublicaInit = {
  method: 'GET',
  headers: {
    'x-api-key': 'N4twLSHqhiMcbcmomYSqtLX4W70Ue4Gwia7u6919'
  }
};
//info para etch en open states
var openStatesUrls = {
  jurUrl: 'https://openstates.org/api/v1/metadata/',
  legUrl: 'https://openstates.org/api/v1/legislators/'
};

var openStatesKey = 'apikey=1e13327e-05c6-4214-a3f3-e07e42225c7a';

var openStatesInit = {
  method: 'GET',
  mode: 'cors'
};
//fetch con cache
function fetchAndCache(url, init) {
  let inCache = sessionStorage.getItem(url);

  if (inCache !== null) {
    let response = new Response(new Blob([inCache]));
    return Promise.resolve(response);
  }

  return fetch(url, init).then(response => {
    if (response.ok) {
      response
        .clone()
        .text()
        .then(info => sessionStorage.setItem(url, info));
    }
    return response;
  });
}

function switchingOrder(param, order) {
  if (!order) {
    return function(a, b) {
      return a[param] === b[param] ? 0 : a[param] > b[param] ? 1 : -1;
    };
  } else {
    return function(a, b) {
      return a[param] === b[param] ? 0 : a[param] < b[param] ? 1 : -1;
    };
  }
}
