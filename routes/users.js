
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

});