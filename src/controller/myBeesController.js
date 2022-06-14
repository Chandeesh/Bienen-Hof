const MyBees = require('../models/mybees');

module.exports = {

    create: async (request, reply) => {
        try {
            var { name, location, postcode, emailId } = request.body;
            const data = { name, emailId, location, postcode }
            await MyBees.create(data)
            reply.code(201).send();
        } catch (e) {
            reply.code(500).send(e);
        }
    },

    getBeehive: async (request, reply) => {
        try {
            const name = request.params.name;
            reply.code(200).send(await MyBees.findOne({ "name": name }));
        } catch (e) {
            reply.code(500).send(e);
        }
    },

    getAll: async (request, reply) => {
        try {
            const emailId = request.params.emailId;
            reply.code(200).send(await MyBees.find({ "emailId": emailId }));
        } catch (e) {
            reply.code(500).send(e);
        }
    },

    //#delete a note
    delete: async (request, reply) => {
        try {
            const id = request.params.id;
            await MyBees.findOneAndDelete({ "_id": id });
            reply.code(200).send({ "message": "Success!" });
        } catch (e) {
            reply.code(500).send(e);
        }
    },

    //#update a note
    updateBeehive: async (request, reply) => {
        try {
            const id = request.body.id;
            var beehive = await MyBees.findOne({ "_id": id });
            beehive.name = request.body.name;
            beehive.location = request.body.location;
            beehive.postcode = request.body.postcode;
            await MyBees.findOneAndUpdate({ "_id": id }, beehive)
            reply.code(200).send();
        }
        catch (e) {
            reply.code(500).send(e);
        }
    },
}