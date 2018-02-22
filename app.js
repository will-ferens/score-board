const url = 'https://winner-loser.herokuapp.com/games'

let playerForm = document.querySelector('.player-form')
let page = document.body
let dropDown = document.body.querySelector('select')
let imgSrc = './imgs/qmark.jpg'

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
        let counter 
        let counterUp 
        let counterDwn 
            if(element !== ''){
                var playerCard = newItem('div')
                playerCard.className = 'player-card'
                appendToPage(page, playerCard)

                var playerName = newItem('p')
                playerName.textContent = element
                appendToPage(playerCard, playerName)
                
                counterDwn = newItem('button')
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
                counterUp.setAttribute('data-player-name', element)
                counterUp.textContent = '+'
                counterUp.className = 'counter-up'
                appendToPage(playerCard, counterUp)

                counterDwn.addEventListener('click', function(){
                    console.log('poop')
                    counter.value = Number(counter.value) -1
                })
                counterUp.addEventListener('click', function(){
                    counter.value = Number(counter.value) +1
                })
            }
        })
})

    fetch(url).then(function(response){
    console.log(response.json())
    })
}

callLeaderBoard()

