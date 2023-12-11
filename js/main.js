function init(){

// ! Variables & Elements

//  ? Elements

const grid = document.querySelector(".grid")

// ? Variables
// Board Config
const width = "4vmin"
const height = "4vmin"
const cellCount = 340
let cells = []
let intervalId;

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
        // cell.innerText =x
        cell.style.height = height
        cell.style.Width = width
        
        grid.appendChild(cell)
        cells.push(cell)
    }
    // added the shooter class to starting position
    addShip(shipStartingPosition)
    addAliens()
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
function moveBlaster(blasterStartingPosition){
    let thatBlasterPosition = blasterStartingPosition
    let blasterFinal = 0

    //time function
    
      intervalId = setInterval(function(){
            blasterFinal++
            let aFinalSpot;
            if (blasterFinal < 19){
            cells[thatBlasterPosition].classList.remove("blaster")
            thatBlasterPosition -= 17
            cells[thatBlasterPosition].classList.add("blaster")
            // If the target div contains the class of alien, remove the alien class
                if (cells[thatBlasterPosition].classList.contains("alien")){
                cells[thatBlasterPosition].classList.remove("alien")
                cells[thatBlasterPosition].classList.remove("blaster")
                blasterFinal = 19 //This ends the loop
                }
            // } else if (){

            }else{cells[thatBlasterPosition].classList.remove("blaster")
                aFinalSpot = cells[thatBlasterPosition]
                clearInterval(intervalId)
                blasterEndScreen(aFinalSpot)
                }
        },100)
        
}
    
//!NEEDS WORK!
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
    }else {console.log("Invalid Key Entry!")}

    addShip(shipCurrentPosition)
}

function handleShooting(event){
    const key = event.keyCode
    const shoot = 32
    
    if (key === shoot) {
        console.log("UP")
        shootBlaster(shipCurrentPosition)
        moveBlaster(blasterStartingPosition)
    }else {console.log("Invalid Key Entry!")}
}


function addAliens(){
    //Randomizing the ranks of enemies
    //Would be good to set a difficulty before game starts!
    let alienRanks = (Math.floor(Math.random()*3)+2)
    console.log(alienRanks)
    let reversedStartingPosition = alienStartingPositions
    console.log(reversedStartingPosition)
    for(let r = 0; r < alienRanks; r++){
        for (let c = 0; c < 9; c++){
           //select the first starting position using "r" in reverseStartingPositions
           let startingRow = reversedStartingPosition[r]
           //assign "alien" class to the starting position using "c"
           let aNewHope = document.getElementById(`${startingRow + c}`)
            aNewHope.classList.add("alien")
            
          
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


window.addEventListener('DOMContentLoaded', init)

// ! Extras

