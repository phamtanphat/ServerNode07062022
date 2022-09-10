const server = require('http').createServer()
const io = require('socket.io')(server)
const { Message } = require('./messagemodel');
const {User} = require("./usermodel")

io.on("connection", socket => {

    socket.on("sign-up",async (userClient) => {
        var email = userClient['email'].toLowerCase()
        var password = userClient['password']
        try {
            var users = await User.find({email, password})
            if (users.length == 0) {
                var newUser = new User({email, password})
                await newUser.save()
                socket.emit("alert", {"alert": "Đăng ký thành công", "code": 200})
            } else {
                socket.emit("alert", {"alert": "Tài khoản đã tồn tại", "code": 500})
            }
        } catch (error) {
            console.log(error)
            socket.emit("alert", {"alert": error, "code": 500})
        }
    })

    socket.on("disconnect", async (userClient) => {
        try {
            var user = await User.findOne({socketId: socket.id})
            if (user) {
                User.findOneAndUpdate({socketId: socket.id},  {$set: {isOnline: false}}, {new: true}, (err, dbUser) => {
                    if (!err) return socket.emit("alert", {"alert": "Bạn đã offline", "code": 200})
                })
            } else {
                socket.emit("alert", {"alert": "Lỗi", "code": 500})
            }
        } catch (error) {
            console.log(error)
            socket.emit("alert", {"alert": error, "code": 500})
        }
    })

    socket.on("sign-in", async (userClient) => {
        var email = userClient['email'].toLowerCase()
        var password = userClient['password']
        try {
            var user = await User.findOne({email, password})
            if (user) {
                let token = user["token"] ? user["token"] : randomToken()
                User.findOneAndUpdate({_id: user._id},  {$set: {isOnline: true, token, socketId: socket.id}}, {new: true}, (err, dbUser) => {
                    if (!err) return socket.emit("sign-in-success", {"alert": "Đăng nhập thành công", "token": user["token"], "code": 200})
                })
            } else {
                socket.emit("alert", {"alert": "Đăng nhập thất bại", "code": 500})
            }
        } catch (error) {
            console.log(error)
            socket.emit("alert", {"alert": error, "code": 500})
        }
    })

    socket.on("join-chat-rom", async (userClient) => {
        var token = userClient["token"]
        try {
            var user = await User.findOne({token})
            if (user) {
                User.findOneAndUpdate({_id: user._id},  {$set: {isOnline: true, socketId: socket.id}}, {new: true}, (err, dbUser) => {
                    if (!err) return socket.emit("join-chat-rom-success", {"alert": "Tham gia phòng chat", "code": 200})
                })
            } else {
                socket.emit("alert", {"alert": "Đăng nhập thất bại", "code": 500})
            }
        } catch (error) {
            console.log(error)
            socket.emit("alert", {"alert": error, "code": 500})
        }
    })

    socket.on("chat", async (userClient) => {
        let token = userClient["token"]
        let message = userClient["message"]
        try {
            let user = await User.findOne({token})
            if (user) {
                let messageClient = new Message({userId: user["_id"], content: message, time: Date.now()})
                await messageClient.save()
                io.sockets.emit("chat-success", {"alert": "Nhận thành công", "code": 200, "message": {content: messageClient["content"], time: messageClient["time"]}})
            } else {
                socket.emit("alert", {"alert": "Đăng nhập thất bại", "code": 500})
            }
        } catch (error) {
            console.log(error)
            socket.emit("alert", {"alert": error, "code": 500})
        }
    })
});

function randomToken() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 15; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
  
server.listen(3000, () => {
    console.log('listening on *:3000');
});



