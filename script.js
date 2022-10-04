// index 
const cardContainer = document.getElementById('card-container')
const cardName = document.getElementById('card-name')
const cardDescription = document.getElementById('card-description')
const practiceButton = document.getElementById('practice-button')
const createPage = document.getElementById('create-page')

let cards = []

//push new card to cards and reseting texbox values
function new_Card(){
  cards.push({
    cardName: cardName.value,
    cardDescription: cardDescription.value,
    id: new Date().getTime()
  })
  cardName.value = ''
  cardDescription.value = ''
  render()
}

//delete card by comparing the id of the bin clicked on to the id of cards to see which match
function delete_card(binId){
  for (let i = 0; i < cards.length; i++ ){
    if(binId == cards[i].id){
      cards.splice(i, 1)
    }else{}
  }
  render()
}

//creates two text elements and an image element
function render(){
  cardContainer.innerHTML = ''
  cards.forEach(function (card){
    const divName = document.createElement('div')
    divName.setAttribute('style', '10px; display: grid; place-items: center; padding: 30px; background-color: white; max-width: 600px; min-width: 300px;')
    cardContainer.appendChild(divName)
    divName.innerText = card.cardName

    const divDescription = document.createElement('div')
    divDescription.setAttribute('style', 'display: grid; place-items: center; padding: 30px; background-color: white; position: relative; max-width: 600px; min-width: 300px;')
    cardContainer.appendChild(divDescription)
    divDescription.innerText = card.cardDescription

    const binIcon = document.createElement('img')
    binIcon.src = "images/bin.png"
    binIcon.style = "width: 25px; position: absolute; right: -60px"
    binIcon.id = card.id
    divDescription.appendChild(binIcon)
    binIcon.onclick = function(){delete_card(binIcon.id)}
  })
}

//quiz
const containerDiv = document.getElementById('container-div')
const runFlashCardButton = document.getElementById('initiate-button')
const arrowContainer = document.getElementById('arrow-container')


//stores cards array in local storage so doesn't get reset when swapping html files / pages
function storeArray(){
  cards.push(JSON.parse(localStorage.getItem('card')))
}

function runFlashCard(){
  if (isCardName) {
    containerDiv.innerHTML = cards[i][j].cardName
  }else{
    containerDiv.innerHTML = cards[i][j].cardDescription
  }
  
  arrowContainer.style.display = 'flex'
}

function changePage(){
  localStorage.clear()
  localStorage.setItem("card", JSON.stringify(cards))
}


let i = 0

//card number
let j = 0

let leftArrowPressed = false
let rightArrowPressed = false

isCardName = true;

function checkArrowPressed(){
  if (leftArrowPressed && isCardName) {
    if (j > 0){
      j--
      leftArrowPressed = false
      isCardName = false;
      runFlashCard()
    }else{leftArrowPressed = false}
  } 

  else if (leftArrowPressed && isCardName === false) {
    isCardName = true;
    console.log('left', isCardName)
    runFlashCard()
  }

  else if(rightArrowPressed && isCardName) {
    isCardName = false;
    console.log('right', isCardName)
    runFlashCard()
  }
  
  else if (rightArrowPressed && isCardName === false && cards[0].length > (j+1)) {
    j++ 
    rightArrowPressed = false
    isCardName = true
    runFlashCard()
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










  





