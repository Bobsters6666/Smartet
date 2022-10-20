// index 
const cardContainer = document.getElementById('card-container')
const cardName = document.getElementById('card-name')
const cardDescription = document.getElementById('card-description')
const saveButton = document.getElementById('save-button')
const createPage = document.getElementById('create-page')

//Array used for creating new cardset
let cards = []

//Array used for practice page, so other functions can also access content within local functions. 
let selectedCard = []

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
const firstSection = document.getElementById('first-section')
const secondSection = document.getElementById('second-section')
const currentCardNumber = document.getElementById('current-card-number')
const quizLeftSection = document.getElementById('left-section')
const quizLeftSection2 = document.getElementById('left-section-2')

//stores cards array in local storage so doesn't get reset when swapping html files / pages


//card number
let j = 0

//Key states
let leftArrowPressed = false
let rightArrowPressed = false
let enterPressed = false
let spacePressed = false

//Card name state: true - display name, false display description
let isCardName = true;

//function states 
let isPractice = false;
let isTest = false;
let isCardsetEdit = false;


//Creates grid in quiz page. 
function createQuizGrid(num){
 for (let i = 0; i < num; i++){

    //type array
    const currentArray = JSON.parse(localStorage.getItem(localStorage.key(i)))

    //content container
    const newDiv = document.createElement('div')
    newDiv.classList.add('cards-grid')
    firstSection.appendChild(newDiv)

    //cardset name
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


//takes a 'key' as parameter. Practice function
function runFlashCard(key) {

  //full reset
  containerDiv.innerText = ''

  //practice state true, enables certain if statements
  isPractice = true

  //Save the initial key into an empty array so the key can be used without requiring the function caller to have access to the initial key. e.g. when running this function is keysPressed(). 
  selectedCard.push(key)

  //show wanted, hide unwanted
  firstSection.style.display = 'none'
  secondSection.style.display = 'grid'
  quizLeftSection.style.display = 'none'
  quizLeftSection2.style.display = 'grid'
  

  //front of card - name
  const cardNameDiv = document.createElement('div')
  cardNameDiv.classList.add('card-front')
  containerDiv.appendChild(cardNameDiv)


  //back of card - description
  const cardDescriptionDiv = document.createElement('div')
  cardDescriptionDiv.classList.add('card-back')
  containerDiv.appendChild(cardDescriptionDiv)

  //Only use the first array in selectedArray, following arrays are useless. J is a arbitary value that determines which card is being displayed. 
  cardNameDiv.innerText = selectedCard[0][j].cardName
  cardDescriptionDiv.innerText = selectedCard[0][j].cardDescription

  //Display current card number out of total card number on left section
  currentCardNumber.innerHTML = (j + 1) + '/' + selectedCard[0].length

}

//input box used to type answers in 'test'
const newInput2 = document.createElement('input')
newInput2.rows = 1
newInput2.classList.add('textbox')


//takes a 'key' as parameter. Test function
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

  //automatically moves the cursor inside the input box. 
  newInput2.focus()

  currentCardNumber.innerHTML = (j + 1) + '/' + selectedCard[0].length

}



function showCorrectAnswer() {

  isTest = false

  containerDiv.innerText = 'Correct Answer: \n\n' + selectedCard[0][j].cardDescription

  const newButton = document.createElement('button')
  newButton.classList.add('button')
  newButton.innerText = 'continue'
  containerDiv.appendChild(newButton)
  
  newButton.onclick = function(){
   
    //If end reached and answer is wrong. 
    if((j+1) >= selectedCard[0].length){
      alert(`You scored ${Math.round(correctIncrement / 2, 2)} percent! Better luck next time`)
      returnToPrevious()
    }
    else{

      //Increment j by 1 and rerun test function to show the next card. 
      j++
      runFlashCardTest(1)
    }
  }
}




//library 
const libraryGrid = document.getElementById('library-grid')
const quizGrid = document.getElementById('first-section')
const libraryEdit = document.getElementById('library-edit')
// const editSaveButton = document.getElementById('save-edit-button')


//Deletes cardset in library
function deleteCardset(key){

  localStorage.removeItem(key)
  createLibraryGrid(localStorage.length)

}


//Edits cardset in library
function editCardset(key) {

  isCardsetEdit = true 

  libraryGrid.style.display = 'none'
  libraryEdit.style.display = 'block'

  //rememeber to parse!! 
  cards.push(JSON.parse(localStorage.getItem(key)))
  cards = cards[0]

  //runs render function using the selected cardset 
  render()

}


//Edits cardset name in library, takes a key, container, and name as parameteres. 
function editCardsetName(key, div, nameDiv){

  //creates a new textarea
  const newInput = document.createElement('textarea')

  //set its value as the cardset's name, for convenience sake
  newInput.value = key

  // reduce its rows to 1
  newInput.rows = 1
  newInput.style = 'position: absolute; top: 45%; padding: 10px 10px; text-align: center; height 20px;'
  div.appendChild(newInput)
  

  //Creates a new save button, when clicked, saves the value of the textarea as cardset's new name
  const newSaveButton = document.createElement('button')
  newSaveButton.classList.add('button')
  newSaveButton.style = 'position: absolute; top: 70%;'
  newSaveButton.innerText = 'save'
  div.appendChild(newSaveButton)

  //sets the current cardset name to '' to prevent overflow. Asthetic reasons. 
  nameDiv.innerText = ''

  newSaveButton.onclick = () => {
    //creates a new cardset with the same content using new name
    localStorage[newInput.value] = localStorage.getItem(key)

    //only delete old way, if new inputed name is different. If its same, computer will automatically replace old one because two cardset can't have same name. 
    if (key != newInput.value){
      localStorage.removeItem(key)
    }

    //rebuilds library grid 
    createLibraryGrid(localStorage.length)
  }
 
}



//save as saving cardset in 'create' page, but have to additionally reset library. 
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





