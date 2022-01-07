const express = require('express');
const router = express.Router();

const MovieModal = require('../models/Movie');

/* Movie add endpoint 
* $method:POST
*
* return json added data
*/
router.post('/', (req, res, next) => {
  const { title, imdb, category, country, year } = req.body;

  const Movie = new MovieModal({
    title: title,
    imdb: imdb,
    category: category,
    country: country,
    year: year

  });

  //oldFashion
  //Movie.save((err, data) => { if (err) res.json(err.message); else res.json(data); })

  const promise = Movie.save();
  promise.then( (data)=>res.json(data) ).catch( (e)=>res.json(e) );

});

router.all('/', (req, res, next) => {
  res.json('Unkown method');
});

module.exports = router;
