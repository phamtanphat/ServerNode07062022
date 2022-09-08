const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://phatpham0209:cpvTC1WEcaEfsQDE@databasechat.9habqeb.mongodb.net/?retryWrites=true&w=majority');

const User = mongoose.model('User', {
    email: {type: String, required: true},
    password: {type: String, required: true}
});

module.exports = {User}

// Insert
// const teo = new User({ name: 'Nguyễn Văn Tèo', phone: "01233211111", isMale: true});
// teo.save()
//    .then((user) => console.log(user))
//    .catch(error => console.log(error))

// Select
// User.find({})
    // .then((users) => console.log(users))
    // .catch(error => console.log(error))

// Update
// User.findByIdAndUpdate("63175317ebff8205091c10c0", {phone: "9999999999"}, {new: true})
//     .then((users) => console.log(users))
//     .catch(error => console.log(error))

//Delete
// User.findByIdAndDelete("63175317ebff8205091c10c0", {new: true})
//     .then((users) => console.log(users))
//     .catch(error => console.log(error))