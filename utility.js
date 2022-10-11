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
  if (isPractice) {
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
  
        if (isPractice) {
          //Can take in any parameter because only the first array in the list is used. 
          runFlashCard(1)
        }
  
        else if (isTest){
          runFlashCardTest(1)
          
        }
  
        
      }else{leftArrowPressed = false}
    } 
  
   
    else if (rightArrowPressed && selectedCard[0].length > (j+1)) {
      topProgressBarLength += 75 / (selectedCard[0].length - 1)
      gsap.to('#top-progress-bar', {width: topProgressBarLength + 'vw', duration: 1 })
  
      rotation = (rotation + angle) % 360
      containerDiv.style = 'transition: transform 0.35s ease; transform: rotate(0deg) '
      containerDiv.classList.toggle('run-shake-animation')
  
      j++ 
      rightArrowPressed = false
      isCardName = true
  
      if (isPractice) {
        runFlashCard(1)
      }
  
      else if (isTest){
        runFlashCardTest(1)
      }
    } 

    else if(spacePressed && isCardName) {
      rotation = (rotation + angle) % 360
      containerDiv.style.transition = 'transform 0.4s ease'
      containerDiv.style.transform = `rotateX(${rotation}deg)`
      isCardName = false;
      spacePressed = false;
    }
  
    else if(spacePressed && isCardName === false) {
      rotation = (rotation + angle) % 360
      containerDiv.style.transition = 'transform 0.4s ease'
      containerDiv.style.transform = `rotateX(${rotation}deg)`
      isCardName = true;
      spacePressed = false;
    }
  
    else{console.log('cant')}
  }
  

  else if (enterPressed && isCardsetEdit) {
    new_Card()
    showSaveButton()
    enterPressed = false
  }

  else if (enterPressed && isTest) {

    if (selectedCard[0][j].cardDescription == newInput2.value) {
      correctIncrement += 200 / selectedCard[0].length
      gsap.to('#quiz-correct-bar', {width: correctIncrement + 'px', duration: 0.2 })
    }

    else{
      wrongIncrement += 200 / selectedCard[0].length
      gsap.to('#quiz-wrong-bar', {width: wrongIncrement + 'px', duration: 0.2 })
    }

    if ((j+1) >= selectedCard[0].length) {
      setTimeout(() => {
        alert(`You scored ${Math.round(correctIncrement / 2, 2)} percent! Better luck next time`)
        returnToPrevious()
      }, 250);
    }
    
    else{
      j++
      runFlashCardTest(1)
    }
  
  }
}

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
  if (isQuiz || isCardsetEdit){
    switch (e.key) {
      case ' ' :
        e.preventDefault();
        break
    }
    }
  }
);

function clearAll(){
  localStorage.clear()
  cards = []
  selectedCard = []
  selectedId = []
  cardContainer.innerHTML = ''
}

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

  gsap.to('#quiz-correct-bar', {width: correctIncrement + 'px', duration: 0.2 })
  gsap.to('#quiz-wrong-bar', {width: wrongIncrement + 'px', duration: 0.2 })

  containerDiv.style = 'transition: transform 0.35s ease; transform: rotate(0deg) '
}

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

