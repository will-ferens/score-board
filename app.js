const url = 'https://winner-loser.herokuapp.com/games'

let playerForm = document.querySelector('.player-form')
let page = document.body
let dropDown = document.body.querySelector('select')
let imgSrc = './imgs/qmark.jpg'


let counter 
let counterUp 
let counterDwn 

let config = {
    attributes: true,
    childList: true,
    characterData: true
}
let observer = new MutationObserver(function(mutations){
        console.log(mutations)
        let scores = []
        
        function modifyQty(val) {
            var qty = document.getElementsByClassName('amount').value
            var newQty = parseInt(qty,10) + val;
            
            if (newQty < 0) {
                newQty = 0
            }
            
            document.getElementsByClassName('amount').value = newQty
            return newQty
        }

        document.querySelectorAll('.counter-up').forEach(function(element){
            console.log(element)
            element.addEventListener('click', function(event){
                console.log(event.target)
                if(event.target.getAttribute('data') == document.querySelector('.amount').getAttribute('data')){
                    document.querySelector('.amount').value++
                }   
                //console.log(document.querySelector('.amount').value)
            })
        })
        //document.getElementsByClassName('amount') 
        //.addEventListener('click', function(){
        //     console.log('poop')
        //     modifyQty(+1)
        // })
        // counterDwn.addEventListener('click', function(){
        //     modifyQty(-1)
        // })
})


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
        if(element !== ''){
            var playerCard = newItem('div')
            playerCard.className = 'player-card'
            appendToPage(page, playerCard)

            var playerName = newItem('p')
            playerName.textContent = element
            appendToPage(playerCard, playerName)
            
            counterDwn = newItem('button')
            counterDwn.setAttribute('data', element)
            counterDwn.textContent = '-'
            counterDwn.className = 'counter-down'
            appendToPage(playerCard, counterDwn)
            
            counter = newItem('input')
            counter.setAttribute('data', element)
            counter.value = 0
            counter.className = 'amount'
            appendToPage(playerCard, counter)

            counterUp = newItem('button')
            counterUp.setAttribute('data', element)
            counterUp.textContent = '+'
            counterUp.className = 'counter-up'
            appendToPage(playerCard, counterUp)
        }
    })
})

observer.observe(page, config)


//function checkDOMChange(){
    // check for any new element being inserted here,
    // or a particular node being modified
    
    // call the function again after 100 milliseconds
    //add scores to an array
    //compare scores to find winner
    //add winner name, loser name, game name to JSON POST
    //build leaderboard page
        //all time
        //each game
        //most losingist 
//     setTimeout( checkDOMChange, 100 )
//     counterUp.addEventListener('click', function(){
//         console.log('poopy pants')
//     })
// }

function callLeaderBoard() {
    fetch(url).then(function(response){
    console.log(response.json())
    })
}

callLeaderBoard()

