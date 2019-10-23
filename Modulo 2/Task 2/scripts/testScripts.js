/*
//Datos en tabla 1.0
var tableBody = document.querySelector('tbody');

for (var i = 0; i < data.results[0].members.length; i++) {

  var member = data.results[0].members[i];

  var tr = document.createElement('tr');
  var nameTd = document.createElement('td');
  var partyTd = document.createElement('td');
  var stateTd = document.createElement('td');
  var seniorityTd = document.createElement('td');
  var votesTd = document.createElement('td');

  nameTd.appendChild(document.createTextNode(member.first_name+
                    ((member.middle_name == null) ? ' ' : ' ' + member.middle_name + ' ') +
                     member.last_name));
  partyTd.appendChild(document.createTextNode(member.party));
  stateTd.appendChild(document.createTextNode(member.state));
  seniorityTd.appendChild(document.createTextNode(member.seniority+' years'));
  votesTd.appendChild(document.createTextNode(member.votes_with_party_pct+' %'));

[nameTd, partyTd, stateTd, seniorityTd, votesTd].forEach(function(cell){
  tr.appendChild(cell)
});

  tableBody.appendChild(tr);

}

//Datos en tabla 1.5
var tableBody = document.querySelector('tbody');
data.results[0].members.forEach(function(member){

  var tr = document.createElement('tr');

  var nameTd = document.createElement('td');
  var partyTd = document.createElement('td');
  var stateTd = document.createElement('td');
  var seniorityTd = document.createElement('td');
  var votesTd = document.createElement('td');

  nameTd.appendChild(document.createTextNode(member.first_name+
                    ((member.middle_name == null) ? ' ' : ' ' + member.middle_name + ' ') +
                     member.last_name));
  partyTd.appendChild(document.createTextNode(member.party));
  stateTd.appendChild(document.createTextNode(member.state));
  seniorityTd.appendChild(document.createTextNode(member.seniority+' years'));
  votesTd.appendChild(document.createTextNode(member.votes_with_party_pct+' %'));

[nameTd, partyTd, stateTd, seniorityTd, votesTd].forEach(function(cell){
  tr.appendChild(cell)
});

  tableBody.appendChild(tr);

})

//Datos en tabla 2.0
var tableBody = document.querySelector('tbody');

data.results[0].members.forEach(function(member){

  var tr = document.createElement('tr');

  var memberData = [member.first_name + ((member.middle_name == null) ? ' ' : ' ' + member.middle_name + ' ') + member.last_name,
                    member.party, member.state, member.seniority+' years', member.votes_with_party_pct+' %'];

  memberData.forEach(function(cell){
    var td = document.createElement('td');
    td.appendChild(document.createTextNode(cell));
    tr.appendChild(td);
  })

  tableBody.appendChild(tr);

})
*/
