const beePeopleController = require('../controller/beehivepeopleController');

module.exports = (app) => {
    //# create a note
    app.post('/bienen/beehive/people', beePeopleController.create);

    //#get a single note
    app.get('/bienen/beehive/people/:beehiveId/:designation', beePeopleController.getBeehive);

    app.get('/bienen/beehive/people/:beehive', beePeopleController.getAll);

    //#delete a beehive
    app.delete('/bienen/beehive/people/:id', beePeopleController.delete);

    //#update a note
    app.put('/bienen/beehive/people', beePeopleController.update);
};