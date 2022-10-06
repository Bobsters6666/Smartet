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
}

// Variable to hold the current angle of rotation
let rotation = 0

// How much to rotate the image at a time
const angle = 180

function checkKeyPressed(){
  if (leftArrowPressed) {
    if (j > 0){

      //increments rotation after each interation. 
      rotation = rotation + angle
      containerDiv.style.transition = 'transform 0s ease'
      containerDiv.style.transform = `rotateX(0deg)`
      j--
      leftArrowPressed = false
      isCardName = true;
      runCurrentFlashCard('first')
    }else{leftArrowPressed = false}
  } 

 
  else if (rightArrowPressed && selectedCard[0].length > (j+1)) {
    rotation = (rotation + angle) % 360
    containerDiv.style.transition = 'transform 0s ease'
    containerDiv.style.transform = `rotateX(0deg)`
    j++ 
    rightArrowPressed = false
    isCardName = true
    runCurrentFlashCard('first')
  } 

  else if (enterPressed) {
    new_Card()
    enterPressed = false
  }

  else if(spacePressed && isCardName) {
    rotation = (rotation + angle) % 360
    containerDiv.style.transition = 'transform 0.6s ease'
    containerDiv.style.transform = `rotateX(${rotation}deg)`
    isCardName = false;
  }

  else if(spacePressed && isCardName === false) {
    rotation = (rotation + angle) % 360
    containerDiv.style.transition = 'transform 0.6s ease'
    containerDiv.style.transform = `rotateX(${rotation}deg)`
    isCardName = true;
  }

  else{console.log('cant')}
}

window.addEventListener('keyup', (event) =>{
  switch (event.key) {
    case 'ArrowRight' :
      rightArrowPressed = true
      checkKeyPressed()
      break

    case 'ArrowLeft':
      leftArrowPressed = true
      checkKeyPressed()
      break

    case 'Enter':
      enterPressed = true
      checkKeyPressed()
      break
    case ' ':
      spacePressed = true
      checkKeyPressed()
      break
  }
})