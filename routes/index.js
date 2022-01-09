const express = require('express');
const Users = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const UserModal = require('../models/User');
const { hash } = require('bcryptjs');
const User = require('../models/User');
const app = require('../app');


/* register new users
* method POST
*
* return status / data
*/
router.post('/register', (req, res, next) => {

  const { username, password } = req.body;

  let saltRounds = 16;
  bcrypt.hash(password, saltRounds).then((hash) => {

    const User = new UserModal({
      username,
      password: hash

    });

    const promise = User.save();

    promise.then((data) => {
      !data ? next({ message: 'Not added!', code: 0 }) : data.password = '*******'; res.json({ status: true, data: data });
    }).catch((e) => { res.json({ status: false, error: e.message }) });


  });

});


/* auth users JWT
* method GET
*
* return status / token data
*/

router.post('/auth', (req, res, next) => {

  const { username, password } = req.body;

  console.log(username);

  User.findOne({
    username
  }, (err, user) => {

    if (err) throw err;

    if (!user) { res.json({ status: false, error: 'Auth failed' }) }
    else {
      //user exist
      bcrypt.compare(password, user.password).then((result) => {

        if (!result) { res.json({ status: false, error: 'Auth failed' }) }
        else {
          //loginSuccess
          const payload = { username };
          const token = jwt.sign(payload, req.app.get('api_secret_key'), { expiresIn: 720 });
          res.json({ status: true, token });

        }

      });

    }

  });

});



/* all other request
* method ALL
*
* return status / data : welcome
*/

router.all('/', (req, res, next) => {
  res.json({ status: true, server: 'Up', data: 'welcome to the test api' });
});




module.exports = router;
