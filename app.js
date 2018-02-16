const url = 'https://winner-loser.herokuapp.com/games'

var playerForm = document.querySelector('.player-form')
function newItem(item){
    return document.createElement(item)
}
function appendToPage(parent, element){
    return parent.appendChild(element)
}

playerForm.addEventListener('submit', function(event){
    event.preventDefault()
    const submissions = new FormData(event.target)
    const playerNames = {
        "players": {
            "player1": submissions.get("player"),
            "player2": submissions.get("player2"),
            "player3": submissions.get("player3"),
            "player4": submissions.get("player4"),

        }
    }
    console.log(playerNames)
    playerForm.className = "hidden"


})


function callLeaderBoard() {
    fetch(url).then(function(response){
    console.log(response.json())
    })
}

callLeaderBoard()