export async function customFetch(
  reqMethod,
  pathUrl,
  headerParams = [],
  reqBody = ''
) {
  let init;

  switch (reqMethod) {
    case 'GET':
      init = { method: 'GET' };
      break;

    case 'POST':
      if (headerParams.length !== 0) {
        let headerObj = new Headers();
        headerParams.forEach(header =>
          headerObj.set(Object.keys(header)[0], Object.values(header)[0])
        );

        init = {
          method: 'POST',
          headers: headerObj,
          body: reqBody
        };
      } else {
        init = { method: 'POST' };
      }
  }

  try {
    return await fetch(pathUrl, init);
  } catch (error) {
    // eslint-disable-next-line no-console
    return console.log(error);
  }
}

function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default { customFetch, emailIsValid };
