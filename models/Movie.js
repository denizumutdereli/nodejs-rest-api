const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    category: String,
    country: String,
    year: Number,
    imdb: Number,
    director_id: Schema.ObjectId, //for futher join app
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('movies', MovieSchema);