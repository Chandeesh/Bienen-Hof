const contactsController = require('../controller/contactsController');

module.exports = (app) => {

    app.post('/bienen/contacts', contactsController.create);

    //app.delete('/bienen/contacts/:id', userController.delete);

    app.get('/bienen/contacts', contactsController.getAllContacts);

};