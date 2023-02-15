
$('.terms-toggle').click(function () {
  $('.terms').toggleClass('hidden');
  $('.terms-content').slideToggle();
});
let index = 0;
dayNavigation = function (direction) {
  let allinput = $('input[name="next[]"]');
  let current = $('input[name="next[]"]:checked');

  // console.log(radioValue,'radioValue')
  // currentVal = current.val();
  if (direction == 'next') {
    current.next().click();
    current.next().attr("checked", "checked");
    console.log(current.next().val(), "next prev")
  } else {
    console.log(current.prev().val(), "valoare prev")
    // console.log(allinput[i], "2ccsasas")
    current.prev().prop("checked", "checked");
    current.prev().click();
  }
}



document.addEventListener('DOMContentLoaded', () => {
  getDataJson();
  ratingsData();
})

function ratingsData(m1, m2, m3, s1, s2, s3) {
  var members = {
    member_1: m1,
    member_2: m2,
    member_3: m3,
  }
  console.log("members")
  for (var member in members) {
    let ratePercentage = (members[member] / 5) * 100;
    const inner = document.querySelectorAll(`.${member} .inner-star`)
    for (let i = 0; i < inner.length; i++) {
      inner[i].style.width = `${ratePercentage}%`
    }
  }
  var gains = {
    gain_1: s1,
    gain_2: s2,
    gain_3: s3,
  }
  for (var gain in gains) {
    let ratePercentage = (gains[gain] / 5) * 100;
    console.log(ratePercentage, "speedy e")
    const inner = document.querySelectorAll(`.${gain} .inner-star`)
    for (let j = 0; j < inner.length; j++) {
      inner[j].style.width = `${ratePercentage}%`
    }
  }
  var actives = {
    active_1: 5,
    active_2: 5,
    active_3: 5,
  }
  for (var active in actives) {
    let ratePercentage = (actives[active] / 5) * 100;
    const inner = document.querySelectorAll(`.${active} .inner-star`)
    for (let k = 0; k < inner.length; k++) {
      inner[k].style.width = `${ratePercentage}%`
    }
  }
}

console.log(ratingsData)



function selectRandomRadioButton(radioButtons) {
  const index = Math.floor(Math.random() * radioButtons.length);
  const element = radioButtons[index];

  element.checked = true;

  return `Selected Option ${element.value}`;
}

document.addEventListener('DOMContentLoaded', () => { //selecteaza random un jucator
  const radioButtons = document.getElementsByClassName('input-radio');

  const message = selectRandomRadioButton(radioButtons);
  console.log(message);
});

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

document.addEventListener('DOMContentLoaded', () => {
  getDataJson();
})

//  var usernameToCheck = "NicolaeJan";
//  var usernameToCheck = "69Fotomodel";
//  var usernameToCheck = "mmanta";
//  var usernameToCheck = "iTaviB";
//  var usernameToCheck = "iTaviB2";
//  var usernameToCheck = "logged_out";
//  var usernameToCheck = null;
var usernameToCheck = getCookie("netbet_login");
const dataLink = new Request('https://casino-promo.netbet.ro/scripts/cursa-streamurilor/data.php?user=' +
  usernameToCheck);

async function getDataJson() {
  const response = await fetch(dataLink, {
      method: 'GET',
      mode: 'cors',
      cache: "default",
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network Response is not OK');
      }
      return response.json();
      console.log(response.json(), "response")
    })
    .then((objectData) => {
      let tableData = '';
      objectData.map((values, index, itemsToRenderInTable) => {
        let result = values.hasOwnProperty('stream');
      }).join("");

      // true

      console.log(objectData, "incarcata cu lungimea de ", objectData.length);

      let table1Text = "";
      let table2Text = "";
      let table3Text = "";

      let team1scores = 0;
      let team2scores = 0;
      let team3scores = 0;

      var totalMembers1 = 0;
      var totalMembers2 = 0;
      var totalMembers3 = 0;

      let counter1 = counter2 = counter3 = 0;

      for (var i = 0; i < objectData.length; i += 1) {
        if (objectData[i].stream == 1) {
          team1scores += parseInt(objectData[i].points, 10);
          totalMembers1 += 1;
          counter1 += 1;
          if (objectData[i].username == usernameToCheck) {
            table1Text += "<tr style='background-color:#FF0000'><td>" + objectData[i].ranking + "</td><td><b>" +
              objectData[i].username + "</b></td><td>" + objectData[i].points + "</td></tr>";
            console.log("am gasit username-ul in echipa: ", objectData[i].stream, " pe pozitia ", objectData[i]
              .ranking);
          } else if (counter1 <= 78) {
            table1Text += "<tr><td style='background-color: #ff6333'>" + objectData[i].ranking + "</td><td>" +
              objectData[i].username +
              "</td><td>" + objectData[i].points + "</td></tr>";
          } else {
            table1Text += "<tr><td>" + objectData[i].ranking + "</td><td>" + objectData[i].username +
              "</td><td>" + objectData[i].points + "</td></tr>";
          }
        } else if (objectData[i].stream == 2) {
          team2scores += parseInt(objectData[i].points, 10);
          totalMembers2 += 1;
          counter2 += 1;
          if (objectData[i].username == usernameToCheck) {
            table2Text += "<tr style='background-color:#FF0000'><td>" + objectData[i].ranking + "</td><td><b>" +
              objectData[i].username + "</b></td><td>" + objectData[i].points + "</td></tr>";
            console.log("am gasit username-ul in echipa: ", objectData[i].stream, " pe pozitia ", objectData[i]
              .ranking);
          } else if (counter2 <= 78) {
            table2Text += "<tr><td style='background-color: #ff6333'>" + objectData[i].ranking + "</td><td>" +
              objectData[i].username +
              "</td><td>" + objectData[i].points + "</td></tr>";
          } else {
            table2Text += "<tr><td>" + objectData[i].ranking + "</td><td>" + objectData[i].username +
              "</td><td>" + objectData[i].points + "</td></tr>";
          }
        } else {
          team3scores += parseInt(objectData[i].points, 10);
          totalMembers3 += 1;
          counter3 += 1;
          if (objectData[i].username == usernameToCheck) {
            table3Text += "<tr style='background-color:#FF0000'><td>" + objectData[i].ranking + "</td><td><b>" +
              objectData[i].username + "</b></td><td>" + objectData[i].points + "</td></tr>";
            console.log("am gasit username-ul in echipa: ", objectData[i].stream, " pe pozitia ", objectData[i]
              .ranking);
          } else if (counter3 <= 78) {
            table3Text += "<tr><td style='background-color: #ff6333'>" + objectData[i].ranking + "</td><td>" +
              objectData[i].username +
              "</td><td>" + objectData[i].points + "</td></tr>";
          } else {
            table3Text += "<tr><td>" + objectData[i].ranking + "</td><td>" + objectData[i].username +
              "</td><td>" + objectData[i].points + "</td></tr>";
          }
        }
        if (objectData[i].username == usernameToCheck) {
          console.log("am gasit username-ul in echipa: ", objectData[i].stream, " pe pozitia ", objectData[i]
            .ranking);
        }
      };

      table1Text += "</table>";
      table2Text += "</table>";
      table3Text += "</table>";

      table1_body.innerHTML = table1Text;
      table2_body.innerHTML = table2Text;
      table3_body.innerHTML = table3Text;

      scoresTeam1.innerHTML = team1scores;
      scoresTeam2.innerHTML = team2scores;
      scoresTeam3.innerHTML = team3scores;

      scoresStars_1 = Math.round(team1scores / Math.max(team1scores, team2scores, team3scores) * 5);
      scoresStars_2 = Math.round(team2scores / Math.max(team1scores, team2scores, team3scores) * 5);
      scoresStars_3 = Math.round(team3scores / Math.max(team1scores, team2scores, team3scores) * 5);

      console.log('Scores stele ar trebui sa fie asa: ', scoresStars_1, ' ', scoresStars_2, ' ', scoresStars_3);


      memberStars_1 = Math.round(totalMembers1 / Math.max(totalMembers1, totalMembers2, totalMembers3) * 5);
      memberStars_2 = Math.round(totalMembers2 / Math.max(totalMembers1, totalMembers2, totalMembers3) * 5);
      memberStars_3 = Math.round(totalMembers3 / Math.max(totalMembers1, totalMembers2, totalMembers3) * 5);

      console.log('Members stele ar trebui sa fie asa: ', memberStars_1, ' ', memberStars_2, ' ',
        memberStars_3);
      console.log('am numarat ', totalMembers1, ' in echipa 1,', totalMembers2, ' in echipa 2 si ',
        totalMembers3, 'in echipa 3.');

      ratingsData(memberStars_1, memberStars_2, memberStars_3, scoresStars_1, scoresStars_2, scoresStars_3);

    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
}



if (usernameToCheck != null && usernameToCheck != "logged_out") {
  async function checkUserAsync(usernameToCheck) {
    let response = await fetch(
      `https://casino-promo.netbet.ro/scripts/cursa-streamurilor/getstatus.php?user=${usernameToCheck}`);
    let data = await response.json()
    return data;
  }

  checkUserAsync(usernameToCheck)
    .then((data) => {

      var groupsOpen = data.groups.toString().split('');
      console.log(groupsOpen, "grupurile");

      //          groupsOpen[0] = 0;
      if (data.status == 0) {
        if (groupsOpen[0] == 1) {
          console.log("echipa 1 este deschisa");
          document.getElementById("joinTeam1").innerHTML = document.getElementById("joinTeam1_A").innerHTML =
            document.getElementById("joinTeam1_B").innerHTML = 'intră în echipă';
          paramsButton1 = '?user=' + data.user + '&optin=1&stream=1';
        } else {
          document.getElementById("joinTeam1").innerHTML = document.getElementById("joinTeam1_A").innerHTML =
            document.getElementById("joinTeam1_B").innerHTML = 'inactiv';
          document.getElementById("joinTeam1").className = document.getElementById("joinTeam1_A").className =
            document.getElementById("joinTeam1_B").className = 'cta-button-disabled cta-buttonTablet-disabled ';
        }
        if (groupsOpen[1] == 1) {
          console.log("echipa 2 este deschisa");
          document.getElementById("joinTeam2").innerHTML = document.getElementById("joinTeam2_A").innerHTML =
            document.getElementById("joinTeam2_B").innerHTML = 'intră în echipă';
          paramsButton2 = '?user=' + data.user + '&optin=1&stream=2';
        } else {
          document.getElementById("joinTeam2").innerHTML = document.getElementById("joinTeam2_A").innerHTML =
            document.getElementById("joinTeam2_B").innerHTML = 'inactiv';
          document.getElementById("joinTeam2").className = document.getElementById("joinTeam2_A").className =
            document.getElementById("joinTeam2_B").className = 'cta-button-disabled cta-buttonTablet-disabled ';
        }
        if (groupsOpen[2] == 1) {
          console.log("echipa 3 este deschisa");
          document.getElementById("joinTeam3").innerHTML = document.getElementById("joinTeam3_A").innerHTML =
            document.getElementById("joinTeam3_B").innerHTML = 'intră în echipă';
          paramsButton3 = '?user=' + data.user + '&optin=1&stream=3';
        } else {
          document.getElementById("joinTeam3").innerHTML = document.getElementById("joinTeam3_A").innerHTML =
            document.getElementById("joinTeam3_B").innerHTML = 'inactiv';
          document.getElementById("joinTeam3").className = document.getElementById("joinTeam3_A").className =
            document.getElementById("joinTeam3_B").className = 'cta-button-disabled cta-buttonTablet-disabled ';
        }
      } else {
        document.getElementById("joinTeam1").innerHTML = document.getElementById("joinTeam1_A").innerHTML =
          document.getElementById("joinTeam1_B").innerHTML =
          document.getElementById("joinTeam2").innerHTML = document.getElementById("joinTeam2_A").innerHTML =
          document.getElementById("joinTeam2_B").innerHTML =
          document.getElementById("joinTeam3").innerHTML = document.getElementById("joinTeam3_A").innerHTML =
          document.getElementById("joinTeam3_B").innerHTML = 'inactiv';

        document.getElementById("joinTeam1").className = document.getElementById("joinTeam1_A").className =
          document.getElementById("joinTeam1_B").className =
          document.getElementById("joinTeam2").className = document.getElementById("joinTeam2_A").className =
          document.getElementById("joinTeam2_B").className =
          document.getElementById("joinTeam3").className = document.getElementById("joinTeam3_A").className =
          document.getElementById("joinTeam3_B").className = 'cta-button-disabled cta-buttonTablet-disabled ';
      }
      if (data.stream == 1) {
        console.log('am gasit in echipa 1');
        document.getElementById("joinTeam1").innerHTML = document.getElementById("joinTeam1_A").innerHTML =
          document.getElementById("joinTeam1_B").innerHTML = 'ieși din echipă';
        paramsButton1 = '?user=' + data.user + '&optin=0&stream=1';
        document.getElementById("joinTeam1").className = document.getElementById("joinTeam1_A").className =
          document.getElementById("joinTeam1_B").className = "cta-button";
      } else if (data.stream == 2) {
        console.log('am gasit in echipa 2');
        document.getElementById("joinTeam2").innerHTML = document.getElementById("joinTeam2_A").innerHTML =
          document.getElementById("joinTeam2_B").innerHTML = 'ieși din echipă';
        paramsButton2 = '?user=' + data.user + '&optin=0&stream=2';
        document.getElementById("joinTeam2").className = document.getElementById("joinTeam2_A").className =
          document.getElementById("joinTeam2_B").className = "cta-button cta-button-table";
      } else if (data.stream == 3) {
        console.log('am gasit in echipa 3');
        document.getElementById("joinTeam3").innerHTML = document.getElementById("joinTeam3_A").innerHTML =
          document.getElementById("joinTeam3_B").innerHTML = 'ieși din echipă';
        paramsButton3 = '?user=' + data.user + '&optin=0&stream=3';
        document.getElementById("joinTeam3").className = document.getElementById("joinTeam3_A").className =
          document.getElementById("joinTeam3_B").className = "cta-button";
      }
    });
} else {
  document.getElementById("joinTeam1").innerHTML = document.getElementById("joinTeam1_A").innerHTML = document
    .getElementById("joinTeam1_B").innerHTML =
    document.getElementById("joinTeam2").innerHTML = document.getElementById("joinTeam2_A").innerHTML = document
    .getElementById("joinTeam2_B").innerHTML =
    document.getElementById("joinTeam3").innerHTML = document.getElementById("joinTeam3_A").innerHTML = document
    .getElementById("joinTeam3_B").innerHTML = `<a href="https://casino.netbet.ro/conectare">conectează-te</a>`;
  document.getElementById("joinTeam1").className = document.getElementById("joinTeam1_A").className = document
    .getElementById("joinTeam1_B").className =
    document.getElementById("joinTeam2").className = document.getElementById("joinTeam2_A").className = document
    .getElementById("joinTeam2_B").className =
    document.getElementById("joinTeam3").className = document.getElementById("joinTeam3_A").className = document
    .getElementById("joinTeam3_B").className = 'cta-button cta-button-table';
}


// scriptul lui marian de dialog / modal

$(function () {
  $(".btnShowPplayers").click(function () {
    $('#dialog').dialog('open');
  });
});

// end scriptul lui marian de dialog / modal


function actionButton1() {
  $("#dialog").dialog({
    modal: true,
    autoOpen: false,
    title: "Ești sigur(ă)?",
    width: 320,
    height: 160,
    buttons: [{
        id: "Join",
        text: "Confirmă",
        click: async function () {
          //              alert("Join Team is ok.");
          let response = await fetch(
            `https://casino-promo.netbet.ro/scripts/cursa-streamurilor/setstatus.php${paramsButton1}`);
          let data = await response.json()
          location.reload();
          return data;
        }
      },
      {
        id: "Cancel",
        text: "Anulează",
        click: function () {
          $(this).dialog('close')
          //              alert("anulare is ok.");
        }
      }
    ],
    autoOpen: false,
    show: {
      effect: "fade",
      duration: 300
    },
    hide: {
      effect: "fade",
      duration: 200
    }
  });
}


function actionButton2() {
  $("#dialog").dialog({
    modal: true,
    autoOpen: false,
    title: "Ești sigur(ă)?",
    width: 320,
    height: 160,
    buttons: [{
        id: "Join",
        text: "Confirmă",
        click: async function () {
          //              alert("Join Team is ok.");
          let response = await fetch(
            `https://casino-promo.netbet.ro/scripts/cursa-streamurilor/setstatus.php${paramsButton2}`);
          let data = await response.json()
          location.reload();
          return data;
        }
      },
      {
        id: "Cancel",
        text: "Anulează",
        click: function () {
          $(this).dialog('close')
          //              alert("anulare is ok.");
        }
      }
    ],
    autoOpen: false,
    show: {
      effect: "fade",
      duration: 300
    },
    hide: {
      effect: "fade",
      duration: 200
    }
  });
}

function actionButton3() {
  $("#dialog").dialog({
    modal: true,
    autoOpen: false,
    title: "Ești sigur(ă)?",
    width: 320,
    height: 160,
    buttons: [{
        id: "Join",
        text: "Confirmă",
        click: async function () {
          //              alert("Join Team is ok.");
          let response = await fetch(
            `https://casino-promo.netbet.ro/scripts/cursa-streamurilor/setstatus.php${paramsButton3}`);
          let data = await response.json()
          location.reload();
          return data;
        }
      },
      {
        id: "Cancel",
        text: "Anulează",
        click: function () {
          $(this).dialog('close')
          //              alert("anulare is ok.");
        }
      }
    ],
    autoOpen: false,
    show: {
      effect: "fade",
      duration: 300
    },
    hide: {
      effect: "fade",
      duration: 200
    }
  });
}

console.log("end")
