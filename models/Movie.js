const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: {
        type: String,
        required: [true, '{PATH} is required.'],
        unique: [true, '{PATH} is unique.'],
        max:40
    },
    category: {
        type: String,
        required: [true, '{PATH} is required.'],
        max: [30, 'max length for {PATH} is ({MAXLENGTH})'],
        min: [2, 'min length for {PATH} is {MINLENGTH}'],
    },
    country: {
        type: String,
        required: [true, '{PATH} is required.'],
        max: [20, 'max length for {PATH} is ({MAXLENGTH})'],
        min: [20, 'min length for {PATH} is {MINLENGTH}'],
    },
    year: {
        type: Number,
        required: [true, '{PATH} is required.'],
        min:1950,
        max:2050
    },
    imdb: {
        type: Number,
        min:0,
        max:10
    },
    director_id: Schema.ObjectId, //for futher join app
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('movies', MovieSchema);