const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://phatpham0209:cpvTC1WEcaEfsQDE@databasechat.9habqeb.mongodb.net/?retryWrites=true&w=majority');

const Message = mongoose.model('Message', {
    userId: {type: String},
    content: {type: String},
    time: {type: String}
});

module.exports = {Message}

// const message = new Message({ user: "631759582ec17b107889511c", content: "hello", time: Date.now()});
// message.save()
//    .then((user) => console.log(user))
//    .catch(error => console.log(error))