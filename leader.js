const url = 'https://winner-loser.herokuapp.com/games'
const page = document.querySelector('.leader-board')
let counts = {}
let winnersByGame = []
let games = ["Super Smash Brothers",
"Super Smash Brothers Melee",
"Halo",
"Mario Kart 64",
"Halo 2",
"Halo 3",
"Mario Party 2",
"NHL",
"Starcraft II",
"FIFA",
"HearthStone"]
let chosenGame = 'Super Smash Brothers'

function newItem(item){
    return document.createElement(item)
}
function appendToPage(parent, element){
    return parent.appendChild(element)
}

document.querySelector('#all-time').addEventListener('click', callLeaderBoardAll)
document.querySelector('#by-game').addEventListener('click', callLeaderBoardGames)


function callLeaderBoardGames() {
    fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
            method: 'GET'
    }).then(response => {
       return response.json()
    }).then(response => {
            let chooseGame = newItem('FORM')
            appendToPage(page, chooseGame)
            
            let q = newItem('p')
            q.textContent = 'Choose game to see scores:'
            appendToPage(chooseGame, q)
            
            let drop = newItem('select')
            drop.className = "drop-down"
            appendToPage(chooseGame, drop)

            games.forEach(current => {
                let option = newItem('option')
                option.textContent = current
                option.value = current
                appendToPage(drop, option)
            })

            drop.addEventListener('change', findWinners)
            
            function findWinners() {response.data.filter(function(current, index) {
                chosenGame = document.querySelector('.drop-down').value
                let value = current.winner_name  
                let game = current.game_name 
                if(chosenGame == game){
                    winnersByGame.push(value)
                } 
                return winnersByGame
            })
            function compressArray(original) {
                var compressed = []
                var copy = original.slice(0)
                for (var i = 0; i < original.length; i++) {
                    var myCount = 0
                    for (var w = 0; w < copy.length; w++) {
                        if (original[i] == copy[w]) {
                            myCount++
                            delete copy[w]
                        }
                    }
                    if (myCount > 0) {
                        var a = new Object()
                        a.value = original[i]
                        a.count = myCount
                        compressed.push(a)
                    }
                }
                    compressed.forEach(function (current, index) {
                        let gameWinners = newItem('div')
                        appendToPage(page, gameWinners)
                        
                        let winnerNames = newItem('p')
                        winnerNames.textContent = current.value
                        appendToPage(gameWinners, winnerNames)

                        let totalWins = newItem('span')
                        totalWins.textContent = current.count
                        appendToPage(gameWinners, totalWins)
                                            
                    })
            }
            compressArray(winnersByGame)
        }
    })
}

function callLeaderBoardAll() {
    fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
            method: 'GET'
    }).then(response => {
       return response.json()
    }).then(response => {
        response.data.forEach(current => {
            if(!counts.hasOwnProperty(current.winner_name)) {
                counts[current.winner_name] = 0
            }
            counts[current.winner_name] += 1
        })
    function topThree () {
        
            let winners = newItem('div')
            winners.className = "top-winners"
            appendToPage(page, winners)

            let winner1 = newItem('p')
            let winner1Score = newItem('p')
            
            let winner2 = newItem('p')
            let winner2Score = newItem('p')
            
            let winner3 = newItem('p')
            let winner3Score = newItem('p')
            
                        
            winner1.textContent = Object.keys(counts)[0]
            winner1Score.textContent =  Object.values(counts)[0]
            
            winner2.textContent = Object.keys(counts)[1]
            winner2Score.textContent =  Object.values(counts)[1]
            
            winner3.textContent = Object.keys(counts)[2]
            winner3Score.textContent =  Object.values(counts)[2]
                        
            appendToPage(winners, winner1)
            appendToPage(winners, winner1Score)
            appendToPage(winners, winner2)
            appendToPage(winners, winner2Score)
            appendToPage(winners, winner3)
            appendToPage(winners, winner3Score)
                        
    }
    topThree()
    })
}

//if selected game matches a key in object, print game and winners