const mongoose = require('mongoose');

const mongoOptions = {
    autoIndex: true, //this is the code I added that solved it all
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    //useFindAndModify: false, 
  }

module.exports = () => {
    mongoose.connect('mongodb+srv://movie_user:SHgK04KnbZkZJjoQ@mcluster.yuskm.mongodb.net/movie_database?retryWrites=true&w=majority', mongoOptions)

    console.log('function trigger');

    mongoose.connection.on('open', ()=> {

        console.log('MongoDB:Connected');

    })
    mongoose.connection.on('error', (err)=> {

        console.log('MongoDB: Not Connected ' + err);

    })

    mongoose.Promise = global.Promise;
}