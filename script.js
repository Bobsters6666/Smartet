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
const arrowContainer = document.getElementById('arrow-container')
const cardSet = document.getElementsByClassName('cardset')
const practiceButton = document.getElementsByClassName('practice-button')
const firstSection = document.getElementById('first-section')
const secondSection = document.getElementById('second-section')
const flashcardContainer = document.getElementById('flashcard-container')
const cardNameDiv = document.getElementById('card-name-div')
const cardDescriptionDiv = document.getElementById('card-description-div')
const topProgressBar = document.getElementById('top-progress-bar')

//stores cards array in local storage so doesn't get reset when swapping html files / pages


//card number
let j = 0

let leftArrowPressed = false
let rightArrowPressed = false
let enterPressed = false
let spacePressed = false

isCardName = true;

//shifting each new card slighting off center to create thickness. 
let cardShiftX = 0 
let cardShiftY = 0



// function createQuizCardset(){
//   const newCard = document.createElement('div')
//   newCard.classList.add('container-div')
//   secondSection.appendChild(newCard)
// }

function showSaveButton(){
  if (cards[0].length > 0 || cards.length > 1) {
    saveButton.style.display = 'inline-block'
  } else{saveButton.style.display = 'none'}
  console.log(3)
}


function runFlashCard(item){

  //rewrite the text within the cardSet to the key of the local storage (i)
  for (let i = 0; i < localStorage.length; i++ ){
    item[i].innerText = localStorage.key(i)

    //need to JSON.parse otherwise currentObject[0] will not give the first object, instead it will give the first letter. 
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

      runCurrentFlashCard(localStorage.key(i))

    }else{}
  } 
}

//Takes in the cardset name and uses it to grab the value from local storage associated with it and push to selectedCard array. Then using that to edit the flashcard cotent. 
function runCurrentFlashCard(cardsetName){
  selectedCard.push(JSON.parse(localStorage.getItem(cardsetName)))

  cardNameDiv.innerText = selectedCard[0][j].cardName
  cardDescriptionDiv.innerText = selectedCard[0][j].cardDescription

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

function createQuizCrid(){

}

//library 
const libraryGrid = document.getElementById('library-grid')
const quizGrid = document.getElementById('first-section')
const libraryEdit = document.getElementById('library-edit')
// const editSaveButton = document.getElementById('save-edit-button')


function deleteCardset(key){
  for (let i = 0; i < localStorage.length; i++ ){
    //compares the id of the bin to the keys in the local storage
    if(key == (localStorage.key(i))){
      localStorage.removeItem(localStorage.key(i))
    }else{}
  }

  libraryGrid.innerHTML = ''
  createLibraryGrid(localStorage.length)
}

function editCardset(key) {
  for (let i = 0; i < localStorage.length; i++ ){
  if(key == localStorage.key(i)){
    libraryGrid.style.display = 'none'
    libraryEdit.style.display = 'block'

    //rememeber to parse!! 
    cards.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
    cards = cards[0]
    console.log(cards)
    render()

    //Returns the cardset name
    return (localStorage.key(i))
  }else{}
  }
}

function editCardsetName(key, div){
  console.log(key)
  const newInput = document.createElement('input')
  newInput.value = key
  newInput.style = 'position: absolute; top: 45%; padding: 2px 10px; text-align: center'
  div.appendChild(newInput)
  
  const newSaveButton = document.createElement('button')
  newSaveButton.classList.add('button')
  newSaveButton.style = 'position: absolute; top: 70%;'
  newSaveButton.innerText = 'save'
  div.appendChild(newSaveButton)

  newSaveButton.onclick = () => {
    localStorage[newInput.value] = localStorage.getItem(key)
    if ( key != newInput.value){
      localStorage.removeItem(key)
    }
    createLibraryGrid(localStorage.length)
  }
 
  console.log(localStorage)
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
    const currentArray = JSON.parse(localStorage.getItem(localStorage.key(i)))
    const newDiv = document.createElement('div')
    newDiv.setAttribute('style', 'width: 80%; height: 300px; background-color: white; display: grid; place-items: center; position: relative; border-radius: 10px; box-shadow: 0 0 40px rgba(0, 0, 0, 0.3); position: relative')
    libraryGrid.appendChild(newDiv)
    newDiv.innerText = localStorage.key(i)

    const nameEditIcon = document.createElement('img')
    nameEditIcon.src = "images/name-edit.png"
    nameEditIcon.style = "width: 20px; position: absolute; right: 20px; top 0; cursor: pointer"
    newDiv.appendChild(nameEditIcon)
    nameEditIcon.onclick = function(){editCardsetName(localStorage.key(i), newDiv)}

    const newBinIcon = document.createElement('img')
    newBinIcon.src = "images/bin.png"
    newBinIcon.style = "width: 25px; position: absolute; right: 10px; bottom: 10px; cursor: pointer"

    //Assign the id of the first object in currentArray as the id of its delete and edit button. 
    newDiv.appendChild(newBinIcon)
    newBinIcon.onclick = function(){deleteCardset(localStorage.key(i))}
    
    const newEditIcon = document.createElement('img')
    newEditIcon.src = "images/edit.png"
    newEditIcon.style = "width: 25px; position: absolute; left: 10px; bottom: 10px; cursor: pointer"
    newDiv.appendChild(newEditIcon)
    newEditIcon.onclick = function(){editCardset(localStorage.key(i))}
  }
}





