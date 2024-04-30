# ReadMe Space Invaders

### Description

In this project I recreated the classic arcade game “Space Invaders” using HTML, CSS and JavaScript. It was due on the 16th of December 2023.


### Deployment link

###### Github link:
https://github.com/TKittow/unit1_Project_Space_Invaders

###### The Deployment Link:
https://tkittow.github.io/unit1_Project_Space_Invaders/



### Timeframe & Working Team (Solo/Pair/Group)

I completed this project on my own within the span of a week leading up to the aforementioned deadline of the 16th of December 2023.

### Technologies Used

* HTML
* CSS 
* JavaScript 
* VSCode 
* Git 
* GitHub 
* Adobe Photoshop

### Brief

Working game, built by you, hosted somewhere on the internet
Link to your hosted working game in the URL section of your Github repo
Git repository hosted on Github, with a link to your hosted game, and frequent commits dating back to the very beginning of the project
Follow the technical requirements:

### Technical Requirements

Render a game in the browser
Be built on a grid: do not use HTML Canvas for this
Design logic for winning & visually display which player won
Include separate HTML / CSS / JavaScript files
Stick with KISS (Keep It Simple Stupid)and DRY (Don't Repeat Yourself) principles
Use Javascript for DOM manipulation
Deploy your game online, where the rest of the world can access it (we will do this together at the end of the project)
Use semantic markup for HTML and CSS (adhere to best practices)


### Planning

Here you can see my first sketch for the project. I approached this by viewing online footage to get an idea for the spaces needed. I knew the grid would need to be taller than it is wide or the aliens would never realistically make it down to the bottom (as their mechanic is to only move down one row when they hit a side). This was then eventually changed to an odd number of squares across as I wanted the shooter to start perfectly center.
![Planning](https://github.com/TKittow/unit1_Project_Space_Invaders/blob/main/img/ReadMe/Project%201%20-%20Plan.png)



### Build/Code Process

###### Board-Building
The build process began with framing the board. As mentioned in my planning I created a grid for the board. I did this in a for loop to create as many cells (as divs) as is listed in the cellCount variable at the top of my function that loads the board. My idea behind this was to keep as many elements modular as possible so I would be able to change the experience.

###### Ship-Building
Next I started work on the Shooter (the ship). I implemented its movement via handleShipMovement function which would stop the ship from moving off the board. This was important due to my system for moving the ship by declaring the ship’s location, removing the ‘ship’ class, adding (or subtracting) to move left or right, and then finally adding the ship class (which is an image) to the new space.

![Ship and board built](https://github.com/TKittow/unit1_Project_Space_Invaders/blob/main/img/ReadMe/Project%201%20-%20Board%20Creation.png)

```
function handleShipMovement(event){

    // add in Consts for keys 
    const key = event.keyCode
    const left = 97
    const right = 100
    
    //remove ship from the current position before its updated 
    removeShip()

    //execute key press and define limits 

    if(key === left && shipCurrentPosition !== cellCount -17 && roundWon !== true && shipHit !== true){
        shipCurrentPosition--
        blasterStartingPosition--
    }else if (key === right && shipCurrentPosition !== cellCount - 1 && roundWon !== true && shipHit !== true){
        shipCurrentPosition++
        blasterStartingPosition++
    }

    addShip(shipCurrentPosition)
}
```

###### Ship-Shooting
I then implemented the shooting of the ship. This logic was very similar as it would also require a keystroke and the process of moving the blaster-bolt was very similar to the ship’s movement (except instead of horizontal it was vertical). One major difference was that once the blaster key had been pressed, the bolt would continue to move until it either hit an alien or the wall at the top of the screen.

The function shootBlaster is used to add the first blaster class (which applies an image). The moveBlaster function then uses setInterval to continue to move the blaster until the div that the laser has been applied to either:
Contains an alien (by checking whether it has the ‘alien’ class applied to it), at which point it will remove the alien class, remove the alien from the array or aliens (discussed next) and remove the blaster. Then it attempts to add the hundred class (which is an image of 100) then removes the image and clears the interval of that blaster after 0.5s using the setTimeout function.
The laser reaches the top row, at which point the laser image is removed and the endscreen is added on a setTimeout function.



###### Alien-Building
I then created the addAliensStarting function which takes the rankNumbers (passed down from the slider from the start menu) and creates a for loop (for the total number of ranks needing to be created) and then creates another for loop for each alien to be created within this rank.

```
function addAliensStarting(){
    //Randomizing the ranks of enemies
    //Would be good to set a difficulty before the game starts!
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
```

###### Alien Movement

```
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
```





### Challenges


The alien’s movement proved especially tricky. I initially tried to move them all individually however this proved difficult and resulted in some unexpected behavior of the aliens not moving as a pack. After much trial and error, I landed on the current system of checking on the first and the last (top left and bottom right aliens) in the array. This however is still not a perfect system as the first and last alien might not necessarily be the furthest left or furthest right respectively and therefore the aliens will spill over to the other side before the first and last aliens hit the border.


### Wins
Planning: The research I had done prior to the game was a massive win for me as this informed so many decisions I had to make further down the line.
Styling: I was very happy with the aesthetics of my take on Space Invaders achieved through my styling.
Not using Canvas: Despite my feeling that the task would have been accomplished much easier using Canvas, I am happy that I did not; I feel this has given me a fantastic understanding of manipulating the DOM.



### Key Learnings/Takeaways

My key takeaway from this was that the game should be completely linked, every function should reference or trigger another as problems seem to occur when functions are isolated. This emphasizes the importance of planning.

I also really felt the importance of not over-complicating the projects I work on. I felt that I had so many moving pieces at the end that it became extremely time-consuming to troubleshoot my issues and produce a streamlined end-product.


### Future Improvements

I would like to be able to create multiple levels and increase the speed at which the aliens drop based on the numbers of aliens left. I also planned to increase the size of the board at later levels so as to be able to create even more aliens.


