// index 
const cardContainer = document.getElementById('card-container')
const cardName = document.getElementById('card-name')
const cardDescription = document.getElementById('card-description')
const saveButton = document.getElementById('save-button')
const createPage = document.getElementById('create-page')

let cards = []
let selectedCard = []
let selectedId = []

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

    if (cards[0].length > 0 || cards.length > 1) {
      saveButton.style.display = 'inline-block'
    } else{saveButton.style.display = 'none'}
    console.log(2)
  })
}

//quiz
const containerDiv = document.getElementById('container-div')
const runFlashCardButton = document.getElementById('initiate-button')
const arrowContainer = document.getElementById('arrow-container')
const cardSet = document.getElementsByClassName('cardset')
const practiceButton = document.getElementsByClassName('practice-button')
const firstSection = document.getElementById('first-section')
const secondSection = document.getElementById('second-section')

//stores cards array in local storage so doesn't get reset when swapping html files / pages


//card number
let j = 0

let leftArrowPressed = false
let rightArrowPressed = false

isCardName = true;

function runFlashCard(item){

  //rewrite the text within the cardSet to the key of the local storage (i)
  for (let i = 0; i < localStorage.length; i++ ){
    item[i].innerText = localStorage.key(i)

    // selectedCard.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
    let currentObject = JSON.parse(localStorage.getItem(localStorage.key(i)))
    selectedId.push(currentObject[0].id)
    practiceButton[i].id = currentObject[0].id
    
  }
}

//checks the id of the button pressed with the id of cardSets to see which cardSet matches it. 
function findSelectedFlashCard(index){
  for (let i = 0; i < selectedId.length; i ++) {
    if (selectedId[i] == practiceButton[index].id) {
      firstSection.style.display = 'none'
      secondSection.style.display = 'inline-block'
      arrowContainer.style.display = 'flex'

      runCurrentFlashCard(localStorage.key(i))

    }else{}
  } 
}

function runCurrentFlashCard(cardsetName){
  selectedCard.push(JSON.parse(localStorage.getItem(cardsetName)))
  if (isCardName) {
    containerDiv.innerText = selectedCard[0][j].cardName
  }else{
    containerDiv.innerText = selectedCard[0][j].cardDescription
  }
}

function saveCardset(){
  let cardsetName = prompt("Name the Cardset")
  localStorage.setItem(cardsetName, JSON.stringify(cards))
  cardContainer.innerHTML = ''
  cards = []
  console.log(localStorage)
}


//library
const libraryGrid = document.getElementById('library-grid')
const quizGrid = document.getElementById('first-section')


function createGrid(num, grid){
  for (let i = 0; i < num; i++){
    const new_div = document.createElement('div')
    new_div.setAttribute('style', 'width: 80%; height: 300px; background-color: white; display: grid; place-items: center;')
    grid.appendChild(new_div)
    new_div.innerText = localStorage.key(i)
  }
}







