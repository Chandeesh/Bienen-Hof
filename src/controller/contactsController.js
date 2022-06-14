const Contact = require('../models/contacts');

module.exports = {

    create: async (request, reply) => {
        try {
            var { type, website, name, tel, fax, address, email } = request.body;
            const data = { type, website, name, tel, fax, address, email }
            await Contact.create(data)
            reply.code(201).send();
        } catch (e) {
            reply.code(500).send(e);
        }
    },

    getAllContacts: async (request, reply) => {
        try {
            reply.code(200).send(await Contact.find());
        } catch (e) {
            reply.code(500).send(e);
        }
    }
}