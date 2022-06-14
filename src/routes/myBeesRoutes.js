const myBeesController = require('../controller/myBeesController');

module.exports = (app) => {
    //# create a note
    app.post('/bienen/beehive', myBeesController.create);

    //#get a single note
    app.get('/bienen/beehive/:emailId/:name', myBeesController.getBeehive);

    app.get('/bienen/beehive/:emailId', myBeesController.getAll);

    //#delete a beehive
    app.delete('/bienen/beehive/:id', myBeesController.delete);

    //#update a note
    app.put('/bienen/beehive', myBeesController.updateBeehive);
};