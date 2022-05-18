const tokenUtils = require('../utils/RefreshToken');
const token = require('../models/refreshToken');

module.exports = {

    performRefresh: async (request, reply) => {
        const tok = request.body.token;
        console.log(tok);
        if (tok == null) {
            reply.code(403).send({ message: "Refresh Token is required!" });
        }
        try {
            let refreshToken = await token.findOne({ token: tok });
            if (!refreshToken) {
                reply.code(403).send({ message: "Refresh token is not in database!" });
                return;
            }
            if (await tokenUtils.verifyExpiration(refreshToken)) {
                token.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();
                reply.code(403).send({
                    message: "Refresh token was expired. Please make a new signin request",
                });
                return;
            }
            let newAccessToken = request.fastify.jwt.sign({ id: refreshToken.emailId }, { expiresIn: 86400 });
            return reply.code(200).send({
                accessToken: newAccessToken,
                refreshToken: refreshToken.token,
            });
        } catch (err) {
            reply.code(500).send(err);
        }
    }
}