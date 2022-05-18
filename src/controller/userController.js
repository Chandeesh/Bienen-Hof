const User = require('../models/user');
const mailer = require('../utils/mailer');
const refreshToken = require('../utils/RefreshToken');

module.exports = {
  //# Register a user
  create: async (request, reply) => {
    try {
      var { emailId, userName, password } = request.body;
      var enabled = false;
      password = await request.fastify.bcrypt.hash(password);
      var activationToken = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 16);
      var timestamp = new Date().toISOString();
      const data = { emailId, userName, password, activationToken, enabled, timestamp };
      if (true) {
        const user = await User.create(data)
        reply.code(201).send(user);
      } else {
        reply.code(400).code("Problem with registration. Please try again later");
      }
    } catch (e) {
      reply.code(500).send(e);
    }
  },

  //#get the list of notes
  login: async (request, reply) => {
    try {
      const user = await User.findOne({ "emailId": request.body.emailId });
      if (user.enabled) {
        if (await request.fastify.bcrypt.compare(request.body.password, user.password)) {
          const token = request.fastify.jwt.sign({ email: user.emailId }, { expiresIn: 20 });
          const decode = request.fastify.jwt.decode(token);
          const accessToken = await refreshToken.create(user)
          reply.code(200).send({token, accessToken, "details": decode});
        } else {
          reply.code(400).send("Invalid Credentials");
        }
      } else {
        reply.code(400).send("Not Activated");
      }
    } catch (e) {
      reply.code(500).send(e);
    }
  },

  //#update a note
  confirmUser: async (request, reply) => {
    try {
      console.log("Inside Update")
      const token = request.query.token;
      var user = await User.findOne({ "activationToken": token });
      if (user == undefined) {
        reply.code(400).send({ "msg": "Invalid Token" });
      } else {
        user.enabled = true;
        await User.findOneAndUpdate({ "activationToken": token }, user)
        reply.code(200).send();
      }
    } catch (e) {
      reply.code(500).send(e);
    }
  },

  //#delete a note
  delete: async (request, reply) => {
    try {
      const noteId = request.params.id;
      const noteToDelete = await Note.findById(noteId);
      await Note.findByIdAndDelete(noteId);
      reply.code(200).send({ data: noteToDelete });
    } catch (e) {
      reply.code(500).send(e);
    }
  },

  verify: async (request, reply) => {
    reply.code(200).send("Success");
  }
};