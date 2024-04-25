function firstMenu(state, score){
    let startButton = document.getElementById("startMe")
    let startPage = document.querySelector(".startPage")
    let slider = document.querySelector("input")
    startPage.style.display = "flex"
    let recordedScore = score
    recordedScore += score
    if (state === null){
      let paragraph = document.querySelector("p")
      paragraph.innerText = `Start Game`
    } else {
        let paragraph = document.querySelector("p")
      paragraph.innerText = `You Lost!`
      startButton.innerText = `Play Again?`
    }

    startButton.addEventListener("click", handleStart)
    function handleStart(){
        startPage.style.display = "none"
    console.log(slider.value)
        
    loadIt(slider.value, 0)
    startButton.removeEventListener("click", handleStart)
    return

    }

    
}

function winState(state, score){

    let startButton = document.getElementById("startMe")
    let startPage = document.querySelector(".startPage")
    let slider = document.querySelector("input")
    startPage.style.display = "flex"
    let recordedScore = score
    recordedScore += score

    startButton.innerText = "Continue?"

    startButton.addEventListener("click", handleStart)
    function handleStart(){
        startPage.style.display = "none"
    console.log(slider.value)
        
    loadIt(slider.value, recordedScore)
    startButton.removeEventListener("click", handleStart)
    return

    }
}

window.addEventListener('DOMContentLoaded', firstMenu(null, 0))


function loadIt(rankNumbers, scoreUpdate){

//! Stuff for the single load

// ? Variables
// Board Config
const width = "4vmin"
const height = "4vmin"
const cellCount = 340
let cells = []
let knownAliens = []

let alienIdArray = []
let scoreToAdd = scoreUpdate
// Character Config
const shipStartingPosition = 331



// Alien Config
let alienStartingPositions = [55,72,89,106,123,140,157] 
const grid = document.querySelector(".grid")
grid.innerHTML = ""

    function createGrid(){
    
        for (let x = 0; x < cellCount; x++){
            const cell = document.createElement("div")
            cell.setAttribute("id", x)
            // cell.innerText =x
            cell.style.height = height
            cell.style.Width = width
            
            grid.appendChild(cell)
            cells.push(cell)
            
        }
        
        
        // added the shooter class to starting position
        addShip(shipStartingPosition)
        
        addAliensStarting()
    
    }

    // ? Add Ship Class
function addShip(position){
    cells[position].classList.add("ship")
    
}

function addAliensStarting(){
    //Randomizing the ranks of enemies
    //Would be good to set a difficulty before game starts!
    // !Got rid of randomizer - use later
    // let alienRanks = (Math.floor(Math.random()*3)+2)
    let preExistingAliens = document.querySelectorAll(".alien")
    preExistingAliens.forEach((alien )=> {alien.remove()})
    let alienRanks = rankNumbers
    for(let r = 0; r < alienRanks; r++){
        for (let c = 0; c < 9; c++){
           //select the first starting position using "r" in reverseStartingPositions
           let startingRow = alienStartingPositions[r]
           //assign "alien" class to the starting position using "c"
           alienIdArray.push(startingRow+c)
           let aNewHope = document.getElementById(startingRow + c)
            aNewHope.classList.add("alien")
            
            knownAliens.push(aNewHope)
            
            // aliensNumbers++
            
            
            
        }
    } startingAliensTotal = knownAliens.length
}

createGrid()
init(shipStartingPosition, knownAliens, cells, alienIdArray, scoreToAdd)
return
}


function init(firstParam,secondParam,thirdParam, fourthParam, thing){

// ! Variables & Elements

//  ? Elements Passed through

let shipStartingPosition = firstParam
let knownAliens = secondParam
let cells = thirdParam
const allAliens = document.querySelectorAll(".alien")



// ? Variables
// Board Config
const cellCount = 340
let direction = 1
let alienIdArray = fourthParam
let score = 0
score = thing
let startingAliensTotal = knownAliens.length
let shipHit = false
shipHit = false
let roundWon = false
roundWon = false
let aliensKilled = 0
let endScore = 0
// Character Config
let shipCurrentPosition = shipStartingPosition
let blasterStartingPosition = shipCurrentPosition - 17


// ! Functions


// ? Add Ship Class
function addShip(position){
    cells[position].classList.add("ship")
    
}

// ? Remove Ship Class
function removeShip(){
    cells[shipCurrentPosition].classList.remove("ship")
}

// ? Add Blaster Bolt
function shootBlaster(){
    cells[blasterStartingPosition].classList.add("blaster")
}

// ? Move Blaster Up

function moveBlaster(laserLocation){
    let startingAliensTotal = knownAliens.length
    let laserFinal = 0

    //time function
    
    const intervalId = setInterval(function(){
            laserFinal++
            let aFinalSpot;
            if (laserFinal < 19 && shipHit !== true){
            cells[laserLocation].classList.remove("blaster")
            laserLocation -= 17
            cells[laserLocation].classList.add("blaster")
            // If the target div contains the class of alien, remove the alien class
                if (cells[laserLocation].classList.contains("alien")){
                cells[laserLocation].classList.remove("alien")
                removeAlienFromArray(laserLocation)
                cells[laserLocation].classList.remove("blaster")
               cells[laserLocation].classList.add("Hundred")
               
               setTimeout(function(){
                   cells[laserLocation].classlist.remove("Hundred")
                },500)
                clearInterval(intervalId)
            }

            }else{cells[laserLocation].classList.remove("blaster")
                aFinalSpot = cells[laserLocation]
                clearInterval(intervalId)
                blasterEndScreen(aFinalSpot)
                }


                //!This is what is causing it to crash on win
            if (startingAliensTotal === aliensKilled){
                playerWins()
                console.log("THIS IS WHY!")
                clearInterval(intervalId)
                
            }
        },103)
        return
}
    
function bombDrop(bombLocation){
    
    let bombFinal = 0

    //time function
    let c = Math.ceil(Math.random()*100)
        if (c > 10){
    const bombId = setInterval(function(){
        
            bombFinal++
            let aFinalSpot;
            let bombPath = Math.floor(bombLocation / 17)
            if (bombLocation + 17 < cellCount && bombFinal < bombPath && shipHit !== true){
            cells[bombLocation].classList.remove("bomb")
            bombLocation += 17
            cells[bombLocation].classList.add("bomb")
            
                if (cells[bombLocation].classList.contains("ship")){
                // ! End the Game!
               bombFinal=bombPath //This ends the loop
               shipHit = true
            //    bombEndScreen(aFinalSpot)
               // !Call function for end game
               playerLoses()
               clearInterval(bombId)
                } 
                // else if (cells[bombLocation].class){}
            

            }else{cells[bombLocation].classList.remove("bomb")
                aFinalSpot = cells[bombLocation]
                clearInterval(bombId)
                if (bombLocation + 17 > cellCount){
                    bombEndScreen(aFinalSpot)
                }
                
                // blasterEndScreen(aFinalSpot)
                }
        },500)
    } 
}

function removeAlienFromArray(location){
    
    let el = alienIdArray.indexOf(location) //el is a number
    alienIdArray.splice(el,1)
    aliensNumbers = alienIdArray.length
    aliensKilled++
   
    // aliensNumbers--
}

function blasterEndScreen(position){
       
        position.classList.add("blaster-end")
    
    setTimeout(function(){
       
        position.classList.remove("blaster-end")
        
    },500)

}

function bombEndScreen(position){
       
    position.classList.remove("ship")
    position.classList.add("bomb-end")

setTimeout(function(){
   
    position.classList.remove("bomb-end")
    
},500)

}


// ? Handle Movement
function handleShipMovement(event){

    // add in Consts for keys √
    const key = event.keyCode
    const left = 97
    const right = 100
    

    //remove ship from the current position before its updated √
    removeShip()

    //execute key press and define limits √

    if(key === left && shipCurrentPosition !== cellCount -17 && roundWon !== true && shipHit !== true){
        shipCurrentPosition--
        blasterStartingPosition--
    }else if (key === right && shipCurrentPosition !== cellCount - 1 && roundWon !== true && shipHit !== true){
        shipCurrentPosition++
        blasterStartingPosition++
    }

    addShip(shipCurrentPosition)
}

function handleShooting(event){
    const key = event.keyCode
    const shoot = 32
    
    if (key === shoot && roundWon !== true && shipHit !== true) {
        
        shootBlaster(shipCurrentPosition)
        moveBlaster(blasterStartingPosition)
        
    }
}




function updateScore(score){
    
    
    let scoreCard = document.querySelector(".score")
    totalScore = score + thing
    scoreCard.innerText = `Score: ${totalScore}`
    endScore = totalScore
   
    
}

function addAliens(id){
    
       let alien = document.getElementById(id)
       alien.classList.add("alien")
   
}

function removeAliens(id){
    
       let alien = document.getElementById(id)
       alien.classList.remove("alien")
       
}

function updateSpeed(speed){
//change speed with a time interval
}

const bombDroppingInterval = setInterval(alienBombDropping,1000) 
function alienBombDropping(){
    
    alienBombDropOccasion()
    
    function alienBombDropOccasion(){
        let choices = alienIdArray.length
        
        let bomberIdx = alienIdArray[Math.floor(Math.random()*choices)]
        bombDrop(bomberIdx)
        

        if (alienIdArray.length < 15){clearInterval(bombDroppingInterval)}
        // setTimeout(function(){clearInterval(bombDroppingInterval)},400)
        if (shipHit === true){clearInterval(bombDroppingInterval)
            document.removeEventListener("keypress", handleShipMovement)
document.removeEventListener("keyup", handleShooting)
        }
    }

}




    
   const secondInterval = setInterval(alienTimedMovement, 500)

    //locate aliens
    
    //  knownAliens.forEach(function(alien){
    //     let a = alien.id
    function alienTimedMovement(){    

    let firstAlien = alienIdArray[0]
    let lastAlien = alienIdArray[alienIdArray.length -1]
    let newPosition = []

    let addScore = (startingAliensTotal - alienIdArray.length) *100
           
            addScore
           updateScore(addScore)
   
   
    if (lastAlien % 17 !== 16 && direction === 1){
        newPosition = alienIdArray.map((pos) => {
            removeAliens(pos)
            return pos +=1
        })
         

        alienIdArray = [...newPosition]
    } else if (lastAlien % 17 === 16 && direction === 1){
        newPosition = alienIdArray.map((pos) => {

            removeAliens(pos)
            direction = -1
            return pos +=17
            
        })

    alienIdArray = [...newPosition]
    } else if (firstAlien % 17 === 0 && direction === -1){
        newPosition = alienIdArray.map((pos) => {
            removeAliens(pos)
            direction = 1
            return pos += 17
        })
        alienIdArray = [...newPosition]
    } else {
        newPosition = alienIdArray.map((pos) => {
            removeAliens(pos)
            return pos -= 1
        })
        alienIdArray = [...newPosition]
    }

    alienIdArray.forEach((pos) => {
        addAliens(pos)
    })
    
    
    if (lastAlien + 17 > 340){
        console.log("YOU LOSE")
        updateScore(score)
        clearInterval(secondInterval)
        alienReachedEnd = true;
        
    }
    
    if (shipHit === true || roundWon === true)
    {clearInterval(secondInterval)}
   
}



// ! Events
// ? Add Event Listener for Keyboard Entry
document.addEventListener("keypress", handleShipMovement)
document.addEventListener("keyup", handleShooting)

function playerLoses(){
    firstMenu(false, 0)
    location.reload(true)
}




function playerWins(){
    
// winState(true, endScore)
location.reload(true)
}


//! The closing tags for the init Function
}


// ! Extras

