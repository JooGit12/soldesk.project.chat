const express = require("express")
const http = require("http")
const app = express();
const path = require("path") // 주소가져오는 라이브러리 사용
const server = http.createServer(app);
const socketIO = require("socket.io")
const moment = require("moment")

const io = socketIO(server);

// console.log(__dirname)
app.use(express.static(path.join(__dirname, "src"))) // path.join / 역 \ 구분하기 위해서
const PORT = process.env.PORT || 7000;

io.on("connection",(socket)=>{
    // console.log('연결성공')
    socket.on("chatting",(data)=>{
        // console.log(data)
        // io.emit("chatting", `안녕 ${msg}`)
        const{name, msg} = data;
        io.emit("chatting", {
            name,
            msg,
            time: moment(new Date()).format("h:ss A")
        })
    })
})

server.listen(PORT, () => console.log(`${PORT}번 포트번호 사용중`));

// ngrok사용
// npm install -g ngrok
// ngrok authtoken YOUR_AUTH_TOKEN // 이미 함
// ngrok http 포트번호