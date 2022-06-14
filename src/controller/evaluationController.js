const EvaluationData = require('../models/evaluation');

module.exports = {

    create: async (request, reply) => {
        try {
            var { values, peopleId } = request.body;
            const date = new Date();
            date.toISOString().split('T')[0]
            const data = { date, peopleId, values }
            await EvaluationData.create(data)
            reply.code(201).send();
        } catch (e) {
            reply.code(500).send(e);
        }
    },

    getDataForPeople: async (request, reply) => {
        try {
            const peopleId = request.params.peopleId;
            reply.code(200).send(await EvaluationData.find({ "peopleId": peopleId}));
        } catch (e) {
            reply.code(500).send(e);
        }
    },

    getAll: async (request, reply) => {
        try {
            const beehiveId = request.params.beehive;
            reply.code(200).send(await EvaluationData.find({ "beehiveId": beehiveId }));
        } catch (e) {
            reply.code(500).send(e);
        }
    },

    //#delete a note
    delete: async (request, reply) => {
        try {
            const id = request.params.id;
            await EvaluationData.findOneAndDelete({ "_id": id });
            reply.code(200).send("Success");
        } catch (e) {
            reply.code(500).send(e);
        }
    },

    //#update a note
    update: async (request, reply) => {
        try {
            const id = request.body.id;
            var people = await EvaluationData.findOne({ "_id": id });
            people.designation = request.body.designation;
            people.location = request.body.location;
            await EvaluationData.findOneAndUpdate({ "_id": id }, people)
            reply.code(200).send();
        }
        catch (e) {
            reply.code(500).send(e);
        }
    },
}