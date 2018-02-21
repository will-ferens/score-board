const url = 'https://winner-loser.herokuapp.com/games'

var playerForm = document.querySelector('.player-form')
var page = document.body
var dropDown = document.body.querySelector('select')
let imgSrc = './imgs/qmark.jpg'
let counter 
let counterUp
let counterDwn

function newItem(item){
    return document.createElement(item)
}
function appendToPage(parent, element){
    return parent.appendChild(element)
}

function findImg(){
    dropDown.addEventListener('change', function(){
        switch(dropDown.value){
            case 'Super Smash Bros': 
                imgSrc = './imgs/ssb.png'
            break
            case 'Mario Kart':
                imgSrc = './imgs/smk.jpg'
            break
            case 'Halo':
                imgSrc = './imgs/halo.jpg'
            break
            case 'FIFA':
                imgSrc = './imgs/fifa.jpg'
            break
            case 'Starcraft':
                imgSrc = './imgs/sc.jpg'
            break
        }
    })
}

findImg()

function modifyQty(val) {
    var qty = document.getElementById('counter').value;
    var newQty = parseInt(qty,10) + val;
    
    if (newQty < 0) {
        newQty = 0
    }
    
    document.getElementById('counter').value = new_qty;
    return newQty
}

playerForm.addEventListener('submit', function(event){
    event.preventDefault()
    const submissions = new FormData(event.target)
    var gameName = submissions.get("dropdown")
    var playerValues = [
        submissions.get("player"), 
        submissions.get("player2"),
        submissions.get("player3"), 
        submissions.get("player4")
    ]
    playerForm.className = "hidden"

    var gameCard = newItem('div')
    gameCard.className = 'game-card'
    appendToPage(page, gameCard)
    
    var printGame = newItem('p')
    printGame.textContent = gameName
    appendToPage(gameCard, printGame)

    var gameImg = newItem('img')
    gameImg.src = imgSrc
    gameImg.id = 'game-img'

    appendToPage(gameCard, gameImg)

    playerValues.forEach(function(element, index){
        if(element !== ''){
            var playerCard = newItem('div')
            playerCard.className = 'player-card'
            appendToPage(page, playerCard)

            var playerName = newItem('p')
            playerName.textContent = element
            appendToPage(playerCard, playerName)
            
            counterDwn = newItem('button')
            counterDwn.textContent = '-'
            counterDwn.id = 'counter'
            counterDwn.onClick = 'modifyQty(-1)'
            appendToPage(playerCard, counterDwn)
            
            counter = newItem('input')
            counter.value = '0'
            counter.id = 'amount'
            appendToPage(playerCard, counter)

            counterUp = newItem('button')
            counterUp.textContent = '+'
            counterUp.id = 'counter'
            counterUp.onClick = 'modifyQty(+1)'
            appendToPage(playerCard, counterUp)
        }
    })
})


function checkDOMChange(){
    // check for any new element being inserted here,
    // or a particular node being modified
    
    // call the function again after 100 milliseconds
    setTimeout( checkDOMChange, 100 )
    counterUp.addEventListener('click', function(){
        console.log('poopy pants')
    })
}

checkDOMChange()

function callLeaderBoard() {
    fetch(url).then(function(response){
    console.log(response.json())
    })
}

callLeaderBoard()