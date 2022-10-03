const cardContainer = document.getElementById('card-container')
const cardName = document.getElementById('card-name')
const cardDescription = document.getElementById('card-description')
const practiceButton = document.getElementById('practice-button')
const createPage = document.getElementById('create-page')

let cards = []

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

function delete_card(binId){
  for (let i = 0; i < cards.length; i++ ){
    console.log(cards[i].id, binId)
    if(binId == cards[i].id){
      cards.splice(i, 1)
    }else{}
  }
  render()
}

function render(){
  cardContainer.innerHTML = ''
  cards.forEach(function (card){
    const divName = document.createElement('div')
    divName.setAttribute('style', '10px; display: grid; place-items: center; padding: 30px; background-color: white;')
    cardContainer.appendChild(divName)
    divName.innerText = card.cardName

    const divDescription = document.createElement('div')
    divDescription.setAttribute('style', 'display: grid; place-items: center; padding: 30px; background-color: white; position: relative')
    cardContainer.appendChild(divDescription)
    divDescription.innerText = card.cardDescription

    const binIcon = document.createElement('img')
    binIcon.src = "images/bin.png"
    binIcon.style = "width: 25px; position: absolute; right: -60px"
    binIcon.id = card.id
    divDescription.appendChild(binIcon)
    binIcon.onclick = function(){delete_card(binIcon.id)}
  })

  if (cards.length > 0) {
    practiceButton.style.display = 'inline-block'
  } else{practiceButton.style.display = 'none'}
}

function flashcard(){
  createPage.style.display = 'none'
}



  





