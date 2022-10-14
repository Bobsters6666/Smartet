let isQuiz = false

// Variable to hold the current angle of rotation
let rotation = 0

// How much to rotate the image at a time
const angle = 180

let topProgressBarLength = 0

//Top bar in quiz left section that tracks how many wrong or correct in test. 
let wrongIncrement = 0
let correctIncrement = 0

function checkKeyPressed(){

  //Practice
  if (isPractice) {

    //Previous Card
    if (leftArrowPressed) {
      if (j > 0){
        topProgressBarLength -= 75 / (selectedCard[0].length - 1)
        gsap.to('#top-progress-bar', {width: topProgressBarLength + 'vw', duration: 1 })
  
        //increments rotation after each interation. 
        rotation = rotation + angle
        containerDiv.style = 'transition: transform 0.35s ease; transform: rotate(0deg)'
        containerDiv.classList.toggle('run-shake-animation')
        
        j--
        leftArrowPressed = false
        isCardName = true;
  
        //Run functions accordingly to which mode is currently active. 
        if (isPractice) {
          //Can take in any parameter because only the first array in the list is used. 
          runFlashCard(1)
        }
  
        else if (isTest){
          runFlashCardTest(1)
          
        }
  
        
      }else{leftArrowPressed = false}
    } 
  
   
    //Next Card
    else if (rightArrowPressed && selectedCard[0].length > (j+1)) {
      topProgressBarLength += 75 / (selectedCard[0].length - 1)
      gsap.to('#top-progress-bar', {width: topProgressBarLength + 'vw', duration: 1 })
  
      rotation = (rotation + angle) % 360
      containerDiv.style = 'transition: transform 0.35s ease; transform: rotate(0deg) '
      containerDiv.classList.toggle('run-shake-animation')
  
      j++ 
      rightArrowPressed = false
      isCardName = true
  
      //Run functions accordingly to which mode is currently active. 
      if (isPractice) {
        runFlashCard(1)
      }
  
      else if (isTest){
        runFlashCardTest(1)
      }
    } 

    //Switch to back of card
    else if(spacePressed && isCardName) {
      rotation = (rotation + angle) % 360
      containerDiv.style.transition = 'transform 0.4s ease'
      containerDiv.style.transform = `rotateX(${rotation}deg)`
      isCardName = false;
      spacePressed = false;
    }
  
    //Switch to front of card
    else if(spacePressed && isCardName === false) {
      rotation = (rotation + angle) % 360
      containerDiv.style.transition = 'transform 0.4s ease'
      containerDiv.style.transform = `rotateX(${rotation}deg)`
      isCardName = true;
      spacePressed = false;
    }
  
    else{console.log('cant')}
  }
  

  //Check if answer is correct or if it reached the end of current cardset. 
  else if (enterPressed && isTest) {

    //if end reached and answer is correct
    if ((j+1) >= selectedCard[0].length && selectedCard[0][j].cardDescription == newInput2.value) {

      if (selectedCard[0][j].cardDescription == newInput2.value) {

        //Update bar
        gsap.to('#quiz-correct-bar', {width: correctIncrement + 'px', duration: 0 })

      }

      else{
        //Update bar
        gsap.to('#quiz-correct-bar', {width: correctIncrement + 'px', duration: 0 })
      
      }

      //set a timeout function to ensure bar widths' are updated before alerting. 
      setTimeout(() => {
        alert(`You scored ${Math.round(correctIncrement / 2, 2)} percent! Better luck next time`)
        returnToPrevious()
      }, 50);
    }

 
    //if end hasn't been reached 
    if (j+1 <= selectedCard[0].length){

      //if correct
      if (selectedCard[0][j].cardDescription == newInput2.value) {

        //increase the green bar width is input is correct
        correctIncrement += 200 / selectedCard[0].length
        gsap.to('#quiz-correct-bar', {width: correctIncrement + 'px', duration: 0.05 })

        j++
        runFlashCardTest(1)
      }

      //if wrong 
      else{

        //increases the red bar width if input is wrong
        wrongIncrement += 200 / selectedCard[0].length
        gsap.to('#quiz-wrong-bar', {width: wrongIncrement + 'px', duration: 0.05 })

        showCorrectAnswer()
      }

      
    }
  
  }
  
  //Save new Cardset
  else if (enterPressed && isCardsetEdit) {
    new_Card()
    showSaveButton()
    enterPressed = false
  }

}


//Check which buttons are pressed. 
window.addEventListener('keyup', (event) =>{
  if (isQuiz){
    switch (event.key) {
      case 'ArrowRight' :
        rightArrowPressed = true
       
        checkKeyPressed()
        break
  
      case 'ArrowLeft':
        leftArrowPressed = true
        
        checkKeyPressed()
        break
  
      case ' ':
        spacePressed = true
        checkKeyPressed()
        break
    }
  }

  switch (event.key) {
    case 'Enter':
      enterPressed = true
      checkKeyPressed()
      break
  }
  
})


// prevent space bar from scrolling the page. 
window.addEventListener('keydown', function(e) {
  if (isQuiz){
    switch (e.key) {
      case ' ' :
        e.preventDefault();
        break
    }
    }
  }
);


//Clears Everything that needs to be cleared 
function clearAll(){
  localStorage.clear()
  cards = []
  selectedCard = []
  selectedId = []
  cardContainer.innerHTML = ''
}


//Resets everything. Basically a page refresh but with a button click. 
function returnToPrevious(){
  firstSection.style.display = 'grid'
  secondSection.style.display = 'none'
  selectedCard = []
  topProgressBarLength = 0
  gsap.to('#top-progress-bar', {width: topProgressBarLength + 'vw', duration: 1 })
  j = 0

  containerDiv.innerText = ''

  isTest = false;
  isPractice = false

  wrongIncrement = 0
  correctIncrement = 0

  gsap.to('#quiz-correct-bar', {width: correctIncrement + 'px', duration: 0 })
  gsap.to('#quiz-wrong-bar', {width: wrongIncrement + 'px', duration: 0 })

  containerDiv.style = 'transition: transform 0.35s ease; transform: rotate(0deg) '
}


//Checks whether the 'save' button should be displayed. 
function showSaveButton(){
  if (cards[0].length > 0 || cards.length > 1) {
    saveButton.style.display = 'inline-block'
  } else{saveButton.style.display = 'none'}
}


//Ask user for card name, then save the name and content as an object in local storage. Reset cards and card container. 
function saveCardset(){
  let cardsetName = prompt("Name the Cardset")
  localStorage.setItem(cardsetName, JSON.stringify(cards))
  console.log(cards)
  cards = []
  cardContainer.innerHTML = ''
  // saveButton.style.display = 'none'
}

let textBox = document.getElementsByClassName('textbox')


//Prevents enter from creating a new line in textboxes, this will make it that the cardName / cardDescription having a /n at the end
$(".textbox").keypress(function(event) {
  if (event.which == 13) {        
       event.preventDefault()
    }
});

