let socket = io()

let messages = document.querySelector('#messages')
let form = document.querySelector('#form')
let nameForm = document.querySelector('form#name')
let input = document.getElementById('input')
let newMessageSound = document.querySelector('#newMessageSound')
let userName = 'Anonymus'

function generateRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

for (var i = 0; i <= 4; i++) {
    userName = userName + generateRandom(0, 10)
    console.log(i)
    console.clear()
}

nameForm.querySelector('input').value = userName
nameForm.addEventListener('submit', e => {
    e.preventDefault()

    if (!nameForm.querySelector('input').value == '') {
        userName = nameForm.querySelector('input').value
    } else {
        nameForm.querySelector('input').value = userName
    }
})

function addUrls(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url) => {
        return `<a href="${url}" target="_blank">${url}</a>`
    })
}

form.addEventListener('submit', e => {
    e.preventDefault()
    if (input.value.trim()) {
        socket.emit('chat message', input.value, userName)


        var cont = document.createElement('div');
        var message = document.createElement('div')
        var nameDiv = document.createElement('div')

        nameDiv.classList.add('name')
        cont.classList.add('cont-msg')
        message.classList.add('msg')

        message.innerHTML = addUrls(input.value)
        nameDiv.textContent = 'Me'

        cont.appendChild(nameDiv)
        cont.appendChild(message)
        messages.appendChild(cont)

        window.scrollTo(0, document.body.scrollHeight)

        input.value = ''
    }else {
        input.value = ''
    }
})

document.addEventListener('mousemove', () => {

})

socket.on('chat message', (msg, name) => {
    var cont = document.createElement('div')
    var message = document.createElement('div')
    var nameDiv = document.createElement('div')

    nameDiv.classList.add('name')
    cont.classList.add('cont-msg')
    cont.classList.add('cont-msg-other')
    message.classList.add('msg')

    message.innerHTML = addUrls(msg)
    nameDiv.textContent = name

    cont.appendChild(nameDiv)
    cont.appendChild(message)
    messages.appendChild(cont)

    newMessageSound.currentTime = ''
    newMessageSound.play()

    window.scrollTo(0, document.body.scrollHeight)
})
socket.on('someone disconnected', () => {
    var disconnected = document.createElement('div')

    disconnected.classList.add('disconnected')

    disconnected.textContent = 'Someone disconnected'

    messages.appendChild(disconnected)

    newMessageSound.currentTime = ''
    newMessageSound.play()

    window.scrollTo(0, document.body.scrollHeight)
})
socket.on('someone connected', () => {
    var connected = document.createElement('div')

    connected.classList.add('connected')

    connected.textContent = 'Someone connected'

    messages.appendChild(connected)

    newMessageSound.currentTime = ''
    newMessageSound.play()

    window.scrollTo(0, document.body.scrollHeight)
})