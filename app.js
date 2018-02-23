const url = 'https://winner-loser.herokuapp.com/games'
const igdb = require('igdb-api-node').default
const client = igdb('9f84fdadc9232e8d8827d2261537379a')


let searchResponse
let playerForm = document.querySelector('.player-form')
let page = document.body
let dropDown = document.body.querySelector('select')
let imgSrc = './imgs/qmark.jpg'

let scores = {}

function newItem(item){
    return document.createElement(item)
}
function appendToPage(parent, element){
    return parent.appendChild(element)
}



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
    playerForm.className = "hidden"
    
    client.games({
        fields: '*', // Return all fields
        limit: 5, // Limit to 5 results
        offset: 15,
        search: searchResponse // Index offset for results
    }, [
        'name',
        'cover'
    ]).then(response => {
        console.log(response.json())
    }).catch(error => {
        throw error
    })

    let gameForm = newItem('FORM')
    gameForm.className = 'game-form'
    appendToPage(page, gameForm)

    let gameEnd = newItem('button')
    gameEnd.textContent = 'End Session' 
    gameEnd.type = 'submit' 
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
                    gameCard.className = 'hidden'
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

        
    })
    

   
})



function callLeaderBoard(){
    fetch(url).then(function(response){
        console.log(response.json())
    })
}
callLeaderBoard()

