const express = require('express');
const Users = require('../models/User');
const router = express.Router();
const UserModal = require('../models/User');
 

/* register new users
* method POST
*
* return status / data
*/
router.post('/register', (req, res, next)=> {
   
  const { username, password } = req.body;

  const User = new UserModal({
    username: username,
    password: password

  });

  const promise = User.save();
 
  promise.then((data) => {
    !data ? next({ message: 'Not added!', code: 0 }) : res.json({status:true, data:data});
  }).catch( (e)=>{res.json({status:false, error:e.message})} );;
 
});

router.all('/', (req, res, next) => {
  res.json({status:true, server:'Up', data:'welcome to the test api'});
});


module.exports = router;
