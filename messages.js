/* gera um piu */
function createPiu(user, message, imgUrl) {
  const piu = document.createElement('div')
  const name = document.createElement('div')
  const image = document.createElement('img')
  const username = document.createElement('h1')
  const piuCard = document.createElement('div')
  const piuText = document.createElement('p')
  const piuInteractions = document.createElement('div')
  const like = document.createElement('button')
  const imageLike = document.createElement('img')
  const likeNumber = document.createElement('h3')
  const favorite = document.createElement('button')
  const imageFavorite = document.createElement('img')
  const trash = document.createElement('button')
  const imageTrash = document.createElement('img')

  image.src = imgUrl
  piuText.innerText = message
  username.innerText = user
  likeNumber.innerText = 0
  imageLike.src = 'images/Heart.svg'
  imageFavorite.src = 'images/Star.svg'
  imageTrash.src = 'images/Trash.svg'

  piu.classList.add('piu')
  name.classList.add('name')
  image.classList.add('image')
  username.classList.add('user-name')
  piuCard.classList.add('piu-card')
  piuText.classList.add('piu-text')
  piuInteractions.classList.add('piu-interactions')
  like.classList.add('like')
  imageLike.classList.add('image-heart')
  likeNumber.classList.add('like-number')
  favorite.classList.add('favorite')
  imageFavorite.classList.add('image-favorite')
  trash.classList.add('delete')
  imageTrash.classList.add('image-delete')

  const feed = document.querySelector('#feed')

  feed.prepend(piu)

  piu.appendChild(name)
  piu.appendChild(piuCard)

  name.appendChild(image)
  name.appendChild(username)

  piuCard.appendChild(piuText)
  piuCard.appendChild(piuInteractions)

  piuInteractions.appendChild(like)
  piuInteractions.appendChild(favorite)
  piuInteractions.appendChild(trash)

  like.appendChild(imageLike)
  like.appendChild(likeNumber)

  favorite.appendChild(imageFavorite)

  trash.appendChild(imageTrash)

  imageLike.addEventListener('click', function () {
    if (likeNumber.innerText == 0) {
      imageLike.src = 'images/Heart-chosen.svg'
      likeNumber.innerText++
    } else {
      imageLike.src = 'images/Heart.svg'
      likeNumber.innerText--
    }
  })
  imageFavorite.addEventListener('click', function () {
    imageFavorite.src = 'images/Star-chosen.svg'
  })
  imageTrash.addEventListener('click', function () {
    imageTrash.src = 'images/Trash-chosen.svg'
    piu.classList.toggle('piu-none')
  })
}

/* obtém as informações dos pius pela API */
async function getData() {
  const response = await fetch(
    'https://api.json-generator.com/templates/BQZ3wDrI6ts0/data?access_token=n7lhzp6uj5oi5goj0h2qify7mi2o8wrmebe3n5ad'
  )
  let pius = await response.json()
  pius.reverse()

  pius.forEach(piu => {
    createPiu(piu.user.username, piu.text, piu.user.photo)
  })
}

getData()

const text = document.getElementById('piar-text')
const numChar = document.getElementById('piar-characters')
const send = document.getElementById('enviar')
const search = document.getElementById('pesquisar')
const searchText = document.getElementById('pesquisar-text')
const error = document.getElementById('erro')

text.addEventListener('input', checkLength)
send.addEventListener('click', checkPiu)
search.addEventListener('click', userSearch)

function checkLength() {
  numChar.textContent = this.value.length
  if (this.value.length > 140) {
    this.classList.add('piar-text-red')
    numChar.classList.add('piar-characters-red')
  } else {
    this.classList.remove('piar-text-red')
    numChar.classList.remove('piar-characters-red')
  }
}

function checkPiu() {
  if (numChar.textContent == 0 || numChar.textContent > 140)
    erro.innerText = 'O piu não pôde ser enviado'
  else {
    createPiu('Ian_Drades', text.value, 'images/User.svg')
    text.value = ''
    numChar.textContent = 0
    erro.innerText = ''
  }
}

function userSearch() {
  const pius = document.querySelectorAll('.piu')
  pius.forEach(piu => {
    piu.classList.remove('piu-none')
    if (!piu.querySelector('.user-name').innerText.includes(searchText.value))
      piu.classList.add('piu-none')
  })
}
