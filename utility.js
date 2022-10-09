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
  j = 0
}

// Variable to hold the current angle of rotation
let rotation = 0

// How much to rotate the image at a time
const angle = 180

let topProgressBarLength = 0

function checkKeyPressed(){
  if (leftArrowPressed) {
    if (j > 0){
      topProgressBarLength -= 75 / (selectedCard[0].length - 1)

      //increments rotation after each interation. 
      rotation = rotation + angle
      containerDiv.style.transition = 'transform 0.35s ease'
      containerDiv.style.transform = `rotateX(0deg)`
      containerDiv.classList.toggle('run-shake-animation')
      j--
      gsap.to('#top-progress-bar', {width: topProgressBarLength + 'vw', duration: 1 })
      leftArrowPressed = false
      isCardName = true;
      runCurrentFlashCard('first')
    }else{leftArrowPressed = false}
  } 

 
  else if (rightArrowPressed && selectedCard[0].length > (j+1)) {
    topProgressBarLength += 75 / (selectedCard[0].length - 1)
    rotation = (rotation + angle) % 360
    containerDiv.style.transition = 'transform 0.35s ease'
    containerDiv.style.transform = `rotateX(0deg)`
    containerDiv.classList.toggle('run-shake-animation')
    // containerDiv.style.transition = 'transform 0.4s ease'
    j++ 

    gsap.to('#top-progress-bar', {width: topProgressBarLength + 'vw', duration: 1 })


    rightArrowPressed = false
    isCardName = true
    runCurrentFlashCard('first')
  } 

  else if (enterPressed) {
    new_Card()
    showSaveButton()
    enterPressed = false
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


// prevent space bar from scrolling the page. 
window.addEventListener('keydown', function(e) {
  switch (e.key) {
    case ' ' :
      e.preventDefault();
      break
  }
  }
);


//must keep, somehow keeps animation working. 
containerDiv.classList.toggle('hi')
