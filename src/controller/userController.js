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
      if (mailer.sendMail(emailId, activationToken, "confirm?")) {
        await User.create(data)
        reply.code(201).send({"message": "An email has been sent with an activation link. Please use the link to activate your account and enjoy using our services"});
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
          const token = request.fastify.jwt.sign({ email: user.emailId }, { expiresIn: 3600 });
          const decode = request.fastify.jwt.decode(token);
          const accessToken = await refreshToken.create(user);
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
    reply.code(200).send("Succeess");
  },

  home: async (request, reply) => {
    reply.code(200).send({ "message":"Please Add Content to Your Home Page"});
  },

  initiateResetPassword: async (request, reply) => {
    console.log("inside initiate password");
    try {
      const emailId = request.body.emailId;
      var user = await User.findOne({ "emailId": emailId });
      var resetPasswordToken = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 32);
      if (user == undefined) {
        reply.code(400).send({ "msg": "User record does not exist" });
      } else {
        user.resetPasswordToken = resetPasswordToken;
        if(mailer.sendMail(emailId, resetPasswordToken, "resetpassword?emailId="+user.emailId+"&")) {
          await User.findOneAndUpdate({ "emailId": emailId }, user);
          reply.code(200).send();
        }
      }
    } catch (e) {
      reply.code(500).send(e);
    }
  },

  confirmResetPassword: async (request, reply) => {
    try {
      const token = request.query.token;
      var user = await User.findOne({ "resetPasswordToken": token });
      console.log(user);
      console.log(token);
      if (user == undefined) {
        reply.code(400).send("Invalid Token");
      } else {
        reply.code(200).send();
      }
    } catch (e) {
      console.log(e);
      reply.code(500).send(e);
    }
  },

  updatePassword: async (request, reply) => {
    try {
      const emailId = request.body.emailId;
      var password = request.body.password;
      password = await request.fastify.bcrypt.hash(password);
      var user = await User.findOne({ "emailId": emailId });
      if (user == undefined) {
        reply.code(400).send("Failed. Please try again");
      } else {
        user.password = password;
        await User.findOneAndUpdate({ "emailId": emailId }, user);
        reply.code(200).send("Success");
      }
    } catch (e) {
      reply.code(500).send(e);
    }
  }

};