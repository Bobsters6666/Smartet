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

function checkArrowPressed(){
  if (leftArrowPressed && isCardName) {
    if (j > 0){
      j--
      leftArrowPressed = false
      isCardName = false;
      runCurrentFlashCard('first')
    }else{leftArrowPressed = false}
  } 

  else if (leftArrowPressed && isCardName === false) {
    isCardName = true;
    console.log('left', isCardName)
    runCurrentFlashCard('first')
  }

  else if(rightArrowPressed && isCardName) {
    isCardName = false;
    console.log('right', isCardName)
    runCurrentFlashCard('first')
  }
  
  else if (rightArrowPressed && isCardName === false && selectedCard[0].length > (j+1)) {
    j++ 
    rightArrowPressed = false
    isCardName = true
    runCurrentFlashCard('first')
  } 
  else{console.log('cant')}
}

window.addEventListener('keyup', (event) =>{
  switch (event.key) {
    case 'ArrowRight' :
      rightArrowPressed = true
      checkArrowPressed()
      break

    case 'ArrowLeft':
      leftArrowPressed = true
      checkArrowPressed()
      break
  }
})