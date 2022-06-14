const userController = require('../controller/userController');

module.exports = (app) => {
  //# Register a user
  app.post('/bienen/user/register', userController.create);

  //# Login and authorize
  app.post('/bienen/user/login', userController.login);

  //#update a user profile
  app.put('/bienen/user/confirm', userController.confirmUser);

  //#delete a user
  app.delete('/bienen/user/:id', userController.delete);

  app.get('/bienen/user/verifyToken', userController.verify);

  app.get('/bienen/user/home', userController.home);

  app.put('/bienen/user/initiateresetpassword', userController.initiateResetPassword);

  app.get('/bienen/user/confirmresetpassword', userController.confirmResetPassword);

  app.put('/bienen/user/updatepassword', userController.updatePassword);

};