const socket = io();

//for the total clients online
const totalClients = document.getElementById('client-total')
socket.on('clients-total', (data) => {
    console.log("total clients", data);
    totalClients.innerHTML = `Total Mems: ${data}`

})


//for messages
const messageContainer = document.getElementById('message-container');
const nameInput = document.getElementById('name-input');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input')

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage();
})

function sendMessage() {
    // console.log(messageInput.value)
    if(messageInput.value==='') return
    const data = {
        name: nameInput.value,
        message: messageInput.value,
        dataTime: new Date()
    }
    socket.emit('message', data);
    addMessageToUi(true, data)
    messageInput.value = "";
}
socket.on('chat-message', (data) => {
    // console.log(data);
    // messageTone.play();
    addMessageToUi(false, data)
})


function addMessageToUi(isOwnMessage, data) {
    // clearFeedback();
    const element = `<li class="${isOwnMessage? "message-right": "message-left"}">
                        <p class="message">
                            ${data.message}
                            <span>${data.name} ● ${moment(data.dataTime).fromNow()}</span>
                        </p>
                    </li>`

    messageContainer.innerHTML+=element
    scrollDown();
}


//automactice scroll down

function scrollDown(){
    messageContainer.scrollTo(0, messageContainer.scrollHeight)
}


//typing function

// messageInput.addEventListener('focus', (e)=>{
//     socket.emit('feedback', {
//         feedback: `${nameInput.value} is typing...`
//     })
// })
// messageInput.addEventListener('kepress', (e)=>{
//     socket.emit('feedback', {
//         feedback: `${nameInput.value} is typing...`
//     })
// })
// messageInput.addEventListener('blur', (e)=>{
//     socket.emit('feedback', {
//         feedback: ''
//     })
// })

// socket.on('feedback', (data)=>{
//     clearFeedback();
//     const element = `
//         <li class="message-feedback">
//           <p class="feedback" id="feedback">✍️ ${data.feedback}</p>
//         </li>
//     `
//     messageContainer.innerHTML+=element;

// })

// function clearFeedback(){
//     document.querySelectorAll('li.message-feedback').forEach(element=>{
//         element.parentNode.removeChild(element)
//     })
// }



//for message tone
const messageTone = new Audio('/message-tone.mp3')