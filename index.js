const server = require('http').createServer()
const io = require('socket.io')(server)
const {User} = require("./usermodel")

io.on("connection", socket => {
    socket.on("sign-up",async (userClient) => {
        var email = userClient['email']
        var password = userClient['password']
        try {
            var users = await User.find({email, password})
            if (users.length == 0) {
                var newUser = new User({email, password})
                await newUser.save()
                socket.emit("alert", {"alert": "Đăng ký thành công"})
            } else {
                socket.emit("alert", {"alert": "Tài khoản đã tồn tại"})
            }
        } catch (error) {
            console.log(error)
            socket.emit("alert", {"alert": error})
        }
    })
});
  
server.listen(3000, () => {
    console.log('listening on *:3000');
});



