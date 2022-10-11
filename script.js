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

  //Moves the cursor to the first input box, to make add multiple cards easier. No need to manually click. 
  cardName.focus()
  render()
}


//delete card by comparing the id of the bin clicked to the id of cards and delete the card that matches the id. 
function deleteCard(binId){
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
    binIcon.onclick = function(){deleteCard(binIcon.id)}

  })
}

//quiz
const containerDiv = document.getElementById('container-div')
const runFlashCardButton = document.getElementById('initiate-button')
const cardSet = document.getElementsByClassName('cardset')
const firstSection = document.getElementById('first-section')
const secondSection = document.getElementById('second-section')
const flashcardContainer = document.getElementById('flashcard-container')
const currentCardNumber = document.getElementById('current-card-number')
const quizLeftSection = document.getElementById('left-section')
const quizLeftSection2 = document.getElementById('left-section-2')

//stores cards array in local storage so doesn't get reset when swapping html files / pages


//card number
let j = 0

let leftArrowPressed = false
let rightArrowPressed = false
let enterPressed = false
let spacePressed = false

let isCardName = true;
let isPractice = false;
let isTest = false;
let isCardsetEdit = false;

function createQuizGrid(num){
 for (let i = 0; i < num; i++){
    const currentArray = JSON.parse(localStorage.getItem(localStorage.key(i)))
    const newDiv = document.createElement('div')
    newDiv.classList.add('cards-grid')
    firstSection.appendChild(newDiv)

    const nameDiv = document.createElement('p')
    nameDiv.style = "position: absolute; display: grid; place-items: center; width: 65%; height 70%; overflow-wrap: anywhere; padding-bottom: 10%;"
    nameDiv.innerText = localStorage.key(i)
    newDiv.appendChild(nameDiv)


    const newPracticeButton = document.createElement('button')
    newPracticeButton.innerText = 'Pratice'
    newPracticeButton.classList.add('button', 'practice-button')
    newDiv.appendChild(newPracticeButton)
    newPracticeButton.onclick = function(){runFlashCard(currentArray)}

    const newTestButton = document.createElement('button')
    newTestButton.innerText = 'Test'
    newTestButton.classList.add('button', 'test-button')
    newDiv.appendChild(newTestButton)
    newTestButton.onclick = function(){runFlashCardTest(currentArray)}
  }
}


function runFlashCard(key) {

  containerDiv.innerText = ''

  isPractice = true

  //Save the initial key into an empty array so the key can be used without requiring the function caller to have access to the initial key. e.g. when running this function is keysPressed(). 
  selectedCard.push(key)

  firstSection.style.display = 'none'
  secondSection.style.display = 'grid'
  
  quizLeftSection.style.display = 'none'
  quizLeftSection2.style.display = 'grid'
  
  const cardNameDiv = document.createElement('div')
  cardNameDiv.classList.add('card-front')
  containerDiv.appendChild(cardNameDiv)

  const cardDescriptionDiv = document.createElement('div')
  cardDescriptionDiv.classList.add('card-back')
  containerDiv.appendChild(cardDescriptionDiv)

  cardNameDiv.innerText = selectedCard[0][j].cardName
  cardDescriptionDiv.innerText = selectedCard[0][j].cardDescription

  currentCardNumber.innerHTML = (j + 1) + '/' + selectedCard[0].length

}

const newInput2 = document.createElement('input')
newInput2.rows = 1
newInput2.classList.add('textbox')


function runFlashCardTest(key){

  selectedCard.push(key)

  quizLeftSection.style.display = 'grid'
  quizLeftSection2.style.display = 'none'

  containerDiv.innerText = ''

  isTest = true
  
  firstSection.style.display = 'none'
  secondSection.style.display = 'grid'

  const nameDiv = document.createElement('p')
  nameDiv.style = "position: absolute; display: grid; place-items: center; width: 65%; height 70%; overflow-wrap: anywhere; padding-top: 20%;"
  nameDiv.innerText = selectedCard[0][j].cardName
  containerDiv.appendChild(nameDiv)

  newInput2.value = ''

  nameDiv.appendChild(newInput2)

  currentCardNumber.innerHTML = (j + 1) + '/' + selectedCard[0].length

}



//library 
const libraryGrid = document.getElementById('library-grid')
const quizGrid = document.getElementById('first-section')
const libraryEdit = document.getElementById('library-edit')
// const editSaveButton = document.getElementById('save-edit-button')


function deleteCardset(key){

  localStorage.removeItem(key)
  createLibraryGrid(localStorage.length)

}

function editCardset(key) {

  isCardsetEdit = true 

  libraryGrid.style.display = 'none'
  libraryEdit.style.display = 'block'

  //rememeber to parse!! 
  cards.push(JSON.parse(localStorage.getItem(key)))
  cards = cards[0]
  render()

}

function editCardsetName(key, div, nameDiv){
  const newInput = document.createElement('textarea')
  newInput.value = key
  newInput.rows = 1
  newInput.style = 'position: absolute; top: 45%; padding: 10px 10px; text-align: center; height 20px;'
  div.appendChild(newInput)
  
  const newSaveButton = document.createElement('button')
  newSaveButton.classList.add('button')
  newSaveButton.style = 'position: absolute; top: 70%;'
  newSaveButton.innerText = 'save'
  div.appendChild(newSaveButton)

  nameDiv.innerText = ''

  newSaveButton.onclick = () => {
    localStorage[newInput.value] = localStorage.getItem(key)
    if (key != newInput.value){
      localStorage.removeItem(key)
    }
    createLibraryGrid(localStorage.length)
  }
 
}



function saveCardsetEdit(){
  saveCardset()
  libraryReset()
}


//Resets library to original layout and updates the library grid. 
function libraryReset(){
  libraryGrid.style.display = 'grid'
  libraryEdit.style.display = 'none'
  createLibraryGrid(localStorage.length)
  cards = []
}



//Create the library grid, with number of cards equal to the items in local storage
function createLibraryGrid(num){
  libraryGrid.innerHTML = ''
  for (let i = 0; i < num; i++){
    const newDiv = document.createElement('div')
    newDiv.setAttribute('style', 'width: 80%; height: 300px; background-color: white; display: grid; place-items: center; position: relative; border-radius: 10px; box-shadow: 0 0 40px rgba(0, 0, 0, 0.3); position: relative')
    libraryGrid.appendChild(newDiv)

    const nameDiv = document.createElement('p')
    nameDiv.style = "position: absolute; display: grid; place-items: center; width: 65%; height 70%; overflow-wrap: anywhere;"
    nameDiv.innerText = localStorage.key(i)
    newDiv.appendChild(nameDiv)

    const nameEditIcon = document.createElement('img')
    nameEditIcon.src = "images/name-edit.png"
    nameEditIcon.style = "width: 20px; position: absolute; right: 20px; top 0; cursor: pointer"
    newDiv.appendChild(nameEditIcon)
    nameEditIcon.onclick = function(){editCardsetName(localStorage.key(i), newDiv, nameDiv)}

    const newBinIcon = document.createElement('img')
    newBinIcon.src = "images/bin.png"
    newBinIcon.style = "width: 25px; position: absolute; right: 10px; bottom: 10px; cursor: pointer"
    newDiv.appendChild(newBinIcon)
    newBinIcon.onclick = function(){deleteCardset(localStorage.key(i))}
    
    const newEditIcon = document.createElement('img')
    newEditIcon.src = "images/edit.png"
    newEditIcon.style = "width: 25px; position: absolute; left: 10px; bottom: 10px; cursor: pointer"
    newDiv.appendChild(newEditIcon)
    newEditIcon.onclick = function(){editCardset(localStorage.key(i))}
  }
}





