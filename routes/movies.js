const express = require('express');
const Movie = require('../models/Movie');
const router = express.Router();

const MovieModal = require('../models/Movie');

/* Movie add endpoint 
* $method:POST
*
* return json status / data
*/
router.post('/new', (req, res, next) => {
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
  promise.then((data) => res.json({status:true, data:data})).catch((e) => res.json(e));
 
});

/* Movies get all endpoint 
* $method:GET
*
* return json status / data
*/
router.get(['/', '/all', '/full'], (req, res, next) => {

  const promise = Movie.find({});
  promise.then((data) => res.json({status:true,data:data})).catch((e) => res.json(e));

});

/* Movie get detail endpoint 
* $method:GET
*
* return json status / data
*/
router.get('/detail/:movie_id', (req, res, next) => {

  if (req.params.movie_id.match(/^[0-9a-fA-F]{24}$/)) {

    const promise = Movie.findById(req.params.movie_id);

    promise.then((data) => {
      !data ? next({ message: 'Not found!', code: 0 }) : res.json({status:true, data:data});
    });

  } else res.json('invalid id');

});

/* Movie put update endpoint 
* $method:PUT
*
* return json status / data
*
*/
router.put('/update/:movie_id', (req, res, next) => {

  if (req.params.movie_id.match(/^[0-9a-fA-F]{24}$/) || !req.body) {

    const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body, {new:true});

    promise.then((data) => {
      !data ? next({ message: 'Not found!', code: 0 }) : res.json({status:true, data:data});
    });

  } else res.json('invalid id or empty data');

});

/* Movie delete endpoint 
* $method:DELETE
*
* return json status
*
*/
router.delete('/delete/:movie_id', (req, res, next) => {

  if (req.params.movie_id.match(/^[0-9a-fA-F]{24}$/) || !req.body) {

    const promise = Movie.findOneAndRemove(req.params.movie_id);

    promise.then((data) => {
      !data ? next({ message: 'Not found!', code: 0 }) : res.json({status:true});
    });

  } else res.json('invalid id or empty data');

});


/* Movie top10 endpoint 
* $method:GET
*
* return json status / data
*
*/
router.get('/top10', (req, res, next) => {

  const promise = Movie.find().limit(10).sort({imdb:-1});

  promise.then((data) => {
    !data ? next({ message: 'Not found!', code: 0 }) : res.json({status:true, data:data});
  });
  
});



router.all('/', (req, res, next) => {
  res.json('Unkown method');
});

module.exports = router;
