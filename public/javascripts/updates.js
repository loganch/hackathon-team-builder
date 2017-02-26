var doc = document;
var teams = doc.getElementById('teams');
var test = doc.getElementById('test');

function showCards() {
    var teams = document.getElementById('teams');
    teams.classList.toggle('is-hidden');
}

function clearTeams() {
    teams.textContent = '';
}

function makeCards(data = []) {
    var cardsCode = "";

    //create the cards
    // var teamNode = document.createElement('div');
    // teamNode.classList.add('columns');
    // teamNode.innerHTML = "<div class='columns'><div class='column'><h2>Team</h2></div></div>";
    // teams.appendChild(teamNode);

    for (var i in data) {
        cardsCode += '<div class="column">';
        cardsCode += '<div class="card ' + data[i][1] + ' "><div class="card-content"><div class="content">';
        cardsCode += '<div class="title">' + data[i][0] + '</div><div class="subtitle">' + data[i][1];
        cardsCode += '</div></div></div></div></div></div>';
    }

    var cardNode = document.createElement('div');
    cardNode.classList.add('columns');
    cardNode.classList.add('section');
    cardNode.innerHTML = cardsCode;

    teams.appendChild(cardNode);
}

// test.onclick = function() {
//     teams.innerHTML = ''; //erase existing cards
//     makeCards([
//         ["Wendell", "Software"],
//         ["Kari", "Software"],
//         ["Logan", "Software"]
//     ]);
// }