const refreshToken = require('../models/refreshToken');
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    //#Create a refresh token with an expiry date
    create: async (user) => {
        let expiredAt = new Date();
        expiredAt.setSeconds(expiredAt.getSeconds() + 86400);
        let token = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        console.log(token);
        const userLocal = await User.findOne({ "emailId" :user.emailId });
        const data = { token, "emailId":userLocal.emailId, "expiryDate": expiredAt.getTime()};
        try {
            const tokenData = await refreshToken.find({"emailId" : user.emailId})
            if(tokenData != 0) {
                await refreshToken.updateOne(data);
            } else {
                await refreshToken.create(data);
            }
            return token;
        } catch(err) {
            console.log(err);
        }
    },

    verifyExpiration: async (token) => {
        console.log(token.expiryDate.getTime());
        console.log(new Date().getTime());
        return token.expiryDate.getTime() < new Date().getTime();
      }
};