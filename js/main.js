function allMenu(){
  let startButton = document.getElementById("startMe")
    let startPage = document.querySelector(".startPage")


    startButton.addEventListener("click", handleStart)
    function handleStart(){
        startPage.style.display = "none"
        

//remove all ships
let leftOverAliens = document.querySelectorAll(".alien")
leftOverAliens.forEach((alien) =>{alien.classList.remove("alien")})
console.log(leftOverAliens)
//remove all aliens
let leftOverShip = document.querySelectorAll(".ship")
leftOverShip.forEach((ship) =>{ship.classList.remove("ship")})
console.log(leftOverShip)
//remove all bombs
let leftOverBombs = document.querySelectorAll(".bomb")
leftOverBombs.forEach((bomb) =>{bomb.classList.remove("bomb")})
console.log(leftOverBombs)
//remove all cells of grid



    init()
    }

    
}

window.addEventListener('DOMContentLoaded', allMenu)

function endGame(){
    let startButton = document.getElementById("startMe")
    let startPage = document.querySelector(".startPage")
    startButton.innerText = "Play Again"
    let startPageText = document.querySelector("h1")
    startPageText.innerText = "You Lost!"
    startPage.style.display = "flex"
    console.log("EXECUTED")

    startButton.addEventListener("click", handleStart)
    function handleStart(){
        startPage.style.display = "none"
        


    let leftOverAliens = document.querySelectorAll(".alien")
    leftOverAliens.forEach((alien) =>{alien.classList.remove("alien")})
    console.log(leftOverAliens)
    //remove all aliens
    let leftOverShip = document.querySelectorAll(".ship")
    leftOverShip.forEach((ship) =>{ship.classList.remove("ship")})
    console.log(leftOverShip)
    //remove all bombs
    let leftOverBombs = document.querySelectorAll(".bomb")
    leftOverBombs.forEach((bomb) =>{bomb.classList.remove("bomb")})
    console.log(leftOverBombs)



        for (let x = 0; x < 340; x++){
            let cellToRemove = document.getElementById(x)
            cellToRemove.remove()
            
        }

        for (let x = 0; x < 340; x++){
            let cellToRemove = document.getElementById(`${x}`)
            cellToRemove.remove()
            
        }

    //    let deleteGrid = document.querySelector(".grid")
    //    deleteGrid.remove()

    //    //Add Grid

    //   let newDiv = document.createElement("div")
    //   newDiv.classList.add("grid")
    //     const gridWrapper = document.querySelector("grid-wrapper")
    //     gridWrapper.appendChild(newDiv)
        


    init()
    }
}



function init(){

// ! Variables & Elements

//  ? Elements

const grid = document.querySelector(".grid")
const allAliens = document.querySelectorAll(".alien")

// ? Variables
// Board Config
const width = "4vmin"
const height = "4vmin"
const cellCount = 340
let cells = []
let knownAliens = []
let direction = 1
let alienIdArray = []
let score = 0
let startingAliensTotal = 0
let shipHit = false
let alienReachedEnd = false
let roundWon = false
let aliensKilled = 0
// Character Config
const shipStartingPosition = 331
let shipCurrentPosition = shipStartingPosition
let blasterStartingPosition = shipCurrentPosition - 17

// Alien Config
let alienStartingPositions = [55,72,89,106,123] 

// ! Functions


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

// ? Remove Ship Class
function removeShip(){
    cells[shipCurrentPosition].classList.remove("ship")
}

// ? Add Blaster Bolt
function shootBlaster(){
    cells[blasterStartingPosition].classList.add("blaster")
}

// ? Move Blaster Up
//!NEEDS WORK!
function moveBlaster(laserLocation){
    
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
               
                laserFinal = 19 //This ends the loop
                
                }
            // } else if (){

            }else{cells[laserLocation].classList.remove("blaster")
                aFinalSpot = cells[laserLocation]
                clearInterval(intervalId)
                blasterEndScreen(aFinalSpot)
                }

            if (startingAliensTotal === aliensKilled){
                clearInterval(intervalId)
                roundWon=true
                
            }
        },103)
        
}
    
function bombDrop(bombLocation){
    
    let bombFinal = 0

    //time function
    
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
               // !Call function for end game
               endGame()
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

function removeAlienFromArray(location){
    
    let el = alienIdArray.indexOf(location) //el is a number
    alienIdArray.splice(el,1)
    aliensNumbers = alienIdArray.length
    console.log(alienIdArray.length)
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
    }else if (key === right && shipCurrentPosition != cellCount - 1 && roundWon !== true && shipHit !== true){
        shipCurrentPosition++
        blasterStartingPosition++
    }else {}

    addShip(shipCurrentPosition)
}

function handleShooting(event){
    const key = event.keyCode
    const shoot = 32
    
    if (key === shoot && roundWon !== true && shipHit !== true) {
        
        shootBlaster(shipCurrentPosition)
        moveBlaster(blasterStartingPosition)
        
    }else {}
}


function addAliensStarting(){
    //Randomizing the ranks of enemies
    //Would be good to set a difficulty before game starts!
    // !Got rid of randomizer - use later
    // let alienRanks = (Math.floor(Math.random()*3)+2)
    let preExistingAliens = document.querySelectorAll(".alien")
    console.log(preExistingAliens)
    let alienRanks = 5
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

function updateScore(score){
    
    
    let scoreCard = document.querySelector(".score")
    
    scoreCard.innerText = `Score: ${score}`
   
    
}

function addAliens(id){
    
       let alien = document.getElementById(id)
       alien.classList.add("alien")
   
}

function removeAliens(id){
    
       let alien = document.getElementById(id)
       alien.classList.remove("alien")
       
}

function updateSpeed(){

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
        }
    }

}

alienMovement()

function alienMovement(){
    let speed = 500
    updateSpeed()
    
    
   const secondInterval = setInterval(alienTimedMovement, speed)

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
   if (shipHit === true){clearInterval(secondInterval)}

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
    
    
   }
}


// ! Events
// ? Add Event Listener for Keyboard Entry
document.addEventListener("keypress", handleShipMovement)
document.addEventListener("keyup", handleShooting)

// ! Page Load
createGrid()

}




// ! Extras

