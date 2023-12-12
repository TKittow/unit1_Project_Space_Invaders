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
let edgeCells = []
let knownAliens = []
let aliensNumbers = 0
let doWeChange = 0
let direction = 1
let justChanged = true

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
        cell.id = x
        cell.innerText =x
        cell.style.height = height
        cell.style.Width = width
        
        grid.appendChild(cell)
        cells.push(cell)
        
    }
    
    
    // added the shooter class to starting position
    addShip(shipStartingPosition)
    populateEdgeCells()
    addAliens()

}

function populateEdgeCells(){
    let allCells = cells.map(function(cell){
        let a = cell.id
        if(a%17 === 0 || a%17 === 16){edgeCells.push(a)}
        else{return}
    })
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
            if (laserFinal < 19){
            cells[laserLocation].classList.remove("blaster")
            laserLocation -= 17
            cells[laserLocation].classList.add("blaster")
            // If the target div contains the class of alien, remove the alien class
                if (cells[laserLocation].classList.contains("alien")){
                cells[laserLocation].classList.remove("alien")
                removeAlienFromArray(cells[laserLocation])
                cells[laserLocation].classList.remove("blaster")
               
                laserFinal = 19 //This ends the loop
                
                }
            // } else if (){

            }else{cells[laserLocation].classList.remove("blaster")
                aFinalSpot = cells[laserLocation]
                clearInterval(intervalId)
                blasterEndScreen(aFinalSpot)
                }
        },103)
        
}
    
function removeAlienFromArray(location){
    console.log(knownAliens)
    let el = knownAliens.indexOf(location) //el is a number
    knownAliens.splice(el,1)
    console.log(knownAliens)
    aliensNumbers = knownAliens.length
    // aliensNumbers--
}

function blasterEndScreen(position){
       
        position.classList.add("blaster-end")
    
    setTimeout(function(){
       
        position.classList.remove("blaster-end")
        
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

    if(key === left && shipCurrentPosition !== cellCount -17 ){
        shipCurrentPosition--
        blasterStartingPosition--
    }else if (key === right && shipCurrentPosition != cellCount - 1){
        shipCurrentPosition++
        blasterStartingPosition++
    }else {}

    addShip(shipCurrentPosition)
}

function handleShooting(event){
    const key = event.keyCode
    const shoot = 32
    
    if (key === shoot) {
        
        shootBlaster(shipCurrentPosition)
        moveBlaster(blasterStartingPosition)
        
    }else {}
}


function addAliens(){
    //Randomizing the ranks of enemies
    //Would be good to set a difficulty before game starts!
    // !Got rid of randomizer - use later
    // let alienRanks = (Math.floor(Math.random()*3)+2)
    let alienRanks = 5
    for(let r = 0; r < alienRanks; r++){
        for (let c = 0; c < 9; c++){
           //select the first starting position using "r" in reverseStartingPositions
           let startingRow = alienStartingPositions[r]
           //assign "alien" class to the starting position using "c"
           let aNewHope = document.getElementById(`${startingRow + c}`)
            aNewHope.classList.add("alien")
            
            knownAliens.push(aNewHope)
            // aliensNumbers++
            
            
            
        }
    } console.log(knownAliens)
}

// function checkAliens(){
//    let b = []
   
//    let e = document.getElementsByClassName("alien")
//    let knownAliensArray = Array.from(e)
//    console.log(b)
//    knownAliens = []
//    let c = knownAliensArray.split(", ")
//    console.log(c)
   
// }

alienMovement()

function alienMovement(){

   const secondInterval = setInterval(function(){

    //locate aliens
    
     knownAliens.forEach(function(alien){
        let a = alien.id
        
        
        if(!edgeCells.includes(`${a}`)){
            //Create a function to move all cells
            
            
        } else {
            //Move all alien cells down then change the direction
            doWeChange++
            }
        
     }) 
     
     if(doWeChange === 0 || justChanged === false){
        
        // checkAliens()
        
         alienMovementAlong(knownAliens)
         
     }else{
     alienMovementDown(knownAliens)
     doWeChange=0
     justChanged = false
     }
     
    //  clearInterval(secondInterval)
    },2001)
}
    
function alienMovementAlong(array){
    justChanged = true
    doWeChange = 0
    
    let anotherArray = array.map(function(element){
    let n = parseInt(element.id) //string to number
    
    cells[n].classList.remove("alien")
    n += direction
    element.id = `${n}`
    return element

})
console.log("another Array", anotherArray)
knownAliens = [...anotherArray]

knownAliens.forEach(function(element){
    let n = parseInt(element.id) //string to number
    
    cells[n].classList.add("alien")
})
}



function alienMovementDown(array){
    
        let anotherArray = []
    anotherArray = array.map(function(element){
        let n = parseInt(element.id) //string to number
        
        cells[n].classList.remove("alien")
        n += 17
        element.id = `${n}`
    anotherArray.push(element)
    knownAliens = [...anotherArray]
    })
    knownAliens.forEach(function(element){
        let n = parseInt(element.id) //string to number
        
        cells[n].classList.add("alien")
        direction *= -1
    })
   
    
//     setTimeout(function(){
//     direction *= -1
//     let anotherArray = []
// anotherArray = array.map(function(element){
//     let n = parseInt(element.id) //string to number
    
//     cells[n].classList.remove("alien")
//     n += direction
//     element.id = `${n}`
// anotherArray.push(element)
// knownAliens = [...anotherArray]
// })
// knownAliens.forEach(function(element){
//     let n = parseInt(element.id) //string to number
    
//     cells[n].classList.add("alien")
// })
// },600)

}



    // alienMovementPath(movingAliens)
    
    //move all aliens right
    //if an alien is in the final column
    //move all aliens down then left
    //if an alien is in the final column move all aliens right

    //!Later
    //If an alien makes it to the final row, end the game


// function alienMovementPath(array){
//    const thePlan = setInterval(function(){
//     let positionB = array.map(function(position){
//         console.log(positionB)
//     })
//     },1000)
// }



// ! Events
// ? Add Event Listener for Keyboard Entry
document.addEventListener("keypress", handleShipMovement)
document.addEventListener("keyup", handleShooting)

// ! Page Load
createGrid()

}


window.addEventListener('DOMContentLoaded', init)

// ! Extras

