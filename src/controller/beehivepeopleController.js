const BeehivePeople = require('../models/people');

module.exports = {

    create: async (request, reply) => {
        try {
            var { designation, location, beehiveId } = request.body;
            const data = { designation, beehiveId, location }
            await BeehivePeople.create(data)
            reply.code(201).send();
        } catch (e) {
            reply.code(500).send(e);
        }
    },

    getBeehive: async (request, reply) => {
        try {
            const designation = request.params.designation;
            const beehiveId = request.params.beehiveId;
            reply.code(200).send(await BeehivePeople.findOne({ "designation": designation , "beehiveId": beehiveId}));
        } catch (e) {
            reply.code(500).send(e);
        }
    },

    getAll: async (request, reply) => {
        try {
            const beehiveId = request.params.beehive;
            reply.code(200).send(await BeehivePeople.find({ "beehiveId": beehiveId }));
        } catch (e) {
            reply.code(500).send(e);
        }
    },

    //#delete a note
    delete: async (request, reply) => {
        try {
            const id = request.params.id;
            await BeehivePeople.findOneAndDelete({ "_id": id });
            reply.code(200).send({ "message": "Success!" });
        } catch (e) {
            reply.code(500).send(e);
        }
    },

    //#update a note
    update: async (request, reply) => {
        try {
            const id = request.body.id;
            var people = await BeehivePeople.findOne({ "_id": id });
            people.designation = request.body.designation;
            people.location = request.body.location;
            await BeehivePeople.findOneAndUpdate({ "_id": id }, people)
            reply.code(200).send();
        }
        catch (e) {
            reply.code(500).send(e);
        }
    },
}