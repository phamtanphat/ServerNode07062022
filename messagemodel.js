const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://phatpham0209:cpvTC1WEcaEfsQDE@databasechat.9habqeb.mongodb.net/?retryWrites=true&w=majority');

const Message = mongoose.model('Message', {
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    content: {type: String},
    time: {type: Date}
});

module.exports = Message

// const message = new Message({ user: "631759582ec17b107889511c", content: "hello", time: Date.now()});
// message.save()
//    .then((user) => console.log(user))
//    .catch(error => console.log(error))