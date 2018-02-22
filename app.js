const url = 'https://winner-loser.herokuapp.com/games'

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


playerForm.addEventListener('submit', function(event){
    event.preventDefault()
    const submissions = new FormData(event.target)
    let gameName = submissions.get("dropdown")
    let playerValues = [
        submissions.get("player"), 
        submissions.get("player2"),
        submissions.get("player3"), 
        submissions.get("player4")
    ]
    playerForm.className = "hidden"

    let gameCard = newItem('div')
    gameCard.className = 'game-card'
    appendToPage(page, gameCard)
    
    let printGame = newItem('p')
    printGame.textContent = gameName
    appendToPage(gameCard, printGame)

    let gameImg = newItem('img')
    gameImg.src = imgSrc
    gameImg.id = 'game-img'

    appendToPage(gameCard, gameImg)

    let gameForm = newItem('FORM')
    gameForm.className = 'game-form'
    appendToPage(page, gameForm)

    let gameEnd = newItem('button')
    gameEnd.textContent = 'End Session' 
    gameEnd.type = 'submit'
    
    //compare scores
    //find winner/loser
    //post game to API
    
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
                    console.log(Object.values(scores))
                })
            }
            
    })
    
    

   
})

function callLeaderBoard(){
    fetch(url).then(function(response){
        console.log(response.json())
    })
}
callLeaderBoard()

