const key = '9f84fdadc9232e8d8827d2261537379a'
const package = './games.json'
const url = 'https://winner-loser.herokuapp.com/games'



let searchResponse
let playerForm = document.querySelector('.player-form')
let page = document.body.querySelector('main')
let dropDown = document.body.querySelector('select')
let imgSrc = './imgs/qmark.jpg'
let gameChosen = 'none'

let scores = {}

function newItem(item){
    return document.createElement(item)
}
function appendToPage(parent, element){
    return parent.appendChild(element)
}

function getGames() {
    fetch(package, {
    headers:  {
        "Accept": "application/json"
   },
   method: 'GET'
}).then(response => {
    return response.json()
}).then(response => {
    Object.keys(response).map(current => {
        let option = newItem('option')
        
        option.textContent = current
        option.value = current
        appendToPage(dropDown, option)
    })
})
}
getGames()

playerForm.addEventListener('submit', function(event){
    event.preventDefault()
    const submissions = new FormData(event.target)
    let searchResponse = submissions.get("search")
    let playerValues = [
        submissions.get("player"), 
        submissions.get("player2"),
        submissions.get("player3"), 
        submissions.get("player4")
    ]
    gameChosen = dropDown.value
    playerForm.className = "hidden"

    let gameForm = newItem('FORM')
    gameForm.className = 'game-form'
    appendToPage(page, gameForm)

    let printGame = newItem('h2')
    printGame.textContent = gameChosen
    appendToPage(gameForm, printGame)

    let gameEnd = newItem('button')
    gameEnd.textContent = 'End Session' 
    gameEnd.type = 'submit'
    gameEnd.className = 'game-end' 
    appendToPage(gameForm, gameEnd)

    playerValues.forEach(function(element, index){
            let counter
            if(element !== ''){
                let playerCard = newItem('div')
                playerCard.className = 'player-card'
                appendToPage(gameForm, playerCard)

                let playerName = newItem('p')
                playerName.textContent = element
                appendToPage(playerCard, playerName)
                
                counterDwn = newItem('button')
                counterDwn.type = 'button'
                counterDwn.setAttribute('data-player-name', element)
                counterDwn.textContent = '-'
                counterDwn.className = 'counter-down'
                appendToPage(playerCard, counterDwn)
                
                counter = newItem('input')
                counter.setAttribute('data-player-name', element)
                counter.value = 0
                counter.className = 'amount'
                appendToPage(playerCard, counter)

                counterUp = newItem('button')
                counterUp.type = 'button'
                counterUp.setAttribute('data-player-name', element)
                counterUp.textContent = '+'
                counterUp.className = 'counter-up'
                appendToPage(playerCard, counterUp)

                counterDwn.addEventListener('click', function(){
                    counter.value = Number(counter.value) -1
                })
                counterUp.addEventListener('click', function(){
                    counter.value = Number(counter.value) +1
                })
                gameEnd.addEventListener('click', function(event){
                    event.preventDefault()
                    let data = playerName.textContent
                    scores[data] = counter.value
                    playerCard.className = 'hidden'
                    gameEnd.className = 'hidden'
                })
            }     
    })
    gameEnd.addEventListener('click', function(event){
        let winner = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b)
        let loser = Object.keys(scores).reduce((a, b) => scores[a] < scores[b] ? a : b)

        let printWinner = newItem('h1')
        printWinner.textContent = winner + ' wins!'
        appendToPage(page, printWinner)

        let printLoser = newItem('h1')
        printLoser.textContent = loser + ' loses.'
        appendToPage(page, printLoser)
        
        function postLeaderBoard(){
            fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                    method: 'POST',
                    body: JSON.stringify({
                        "game_name": gameChosen,
                        "winner_name": winner,
                        "loser_name": loser
                    })
            }).then(response => {
               return response
            })
        }
        postLeaderBoard()
    })
})

//TO-DO: Unfuck css
//Make it mobile
//*add css animations?