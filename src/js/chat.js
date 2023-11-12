// console.log('hello js');
"use strict" //자바스크립트 오류 줄이기
const socket = io();

const nickname = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container")

chatInput.addEventListener("keypress", (event)=>{   // enter
    if(event.keyCode === 13){
        send()
        chatInput.value = ""
    }
})

function send(){
    const param = {
        name: nickname.value,
        msg: chatInput.value
    }
    socket.emit("chatting", param)
}


sendButton.addEventListener("click", send)

socket.emit("chatting", "프론트작동");

socket.on("chatting", (data) => {
    console.log(data)
    // li.innerText = `${msg.name}님이 - ${msg.msg}`;
    // chatList.appendChild(li)
    const {name, msg, time} = data;
    const item = new LiModel(name, msg, time); // LiModel 초기화
    item.makeLi()
    displayContainer.scrollTo(0, displayContainer.scrollHeight)
})

function LiModel(name, msg, time){
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = ()=>{
        const li = document.createElement("li");
        li.classList.add(nickname.value === this.name ? "user1" : "user2")
        const dom = `<span class="profile">
        <span class="user">${this.name}</span>
        <img src="https://picsum.photos/50/50" class="image" alt="any">
    </span>
    <span class="message">${this.msg}</span>
    <span class="time">${this.time}</span>`;
    li.innerHTML = dom;
    chatList.appendChild(li)
    }
}

console.log(socket)