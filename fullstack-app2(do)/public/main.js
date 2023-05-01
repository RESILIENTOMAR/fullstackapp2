
var trash = document.getElementsByClassName("fa-trash");



Array.from(trash).forEach(function (element) {
  element.addEventListener('click', function () {
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const msg = this.parentNode.parentNode.childNodes[3].innerText
    fetch('Fan', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name,
        'msg': msg
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});


function goToTeam() {
  var teamSelector = document.getElementById("teams");
  var selectedTeam = teamSelector.value;
  if (selectedTeam !== "") {
    window.location.href = selectedTeam;
  }
}

const logo = document.querySelector('img');

function teamInfo() {
  const teamName = document.querySelector('option').value;
  const url = `http://localhost:8005/api/${teamName}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.querySelector('h1').innerText = data.name
      document.querySelector('#stars').innerText = data.stars
      document.querySelector('#trophies').innerText = data.trophies

      logo.src = data.logo


    })
}