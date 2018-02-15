const url = 'https://winner-loser.herokuapp.com/games'

function newItem(item){
    return document.createElement(item)
}
function appendToPage(parent, element){
    return parent.appendChild(element)
}

document.querySelector('.player-form').addEventListener('submit', function(event){
    event.preventDefault()
    const submissions = new FormData(event.target)
    const playerNames = {
        "players": {
            "player1": submissions.get("player")
        }
    }
    console.log(playerNames)
})


function callLeaderBoard() {
    fetch(url).then(function(response){
    console.log(response.json())
    })
}

callLeaderBoard()