const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required:true,
        unique: true,
        max:4,
        min:2
    },
    password: {
        type: String,
        required: [true, ' {PATH} is required.'],
        max: [16, 'max length for {PATH} is ({MAXLENGTH})'],
        min: [5, 'min length for {PATH} is {MINLENGTH}'],
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('users', UserSchema);