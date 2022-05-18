const refreshTokenController = require('../controller/RefreshTokenController');

module.exports = (app) => {
    
    app.post('/bienen/user/refreshtoken', refreshTokenController.performRefresh);

}