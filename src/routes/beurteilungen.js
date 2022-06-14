const evaluationController = require('../controller/evaluationController');

module.exports = (app) => {
    //# create a note
    app.post('/bienen/people/data', evaluationController.create);

    //#get a single note
    app.get('/bienen/people/data/:peopleId', evaluationController.getDataForPeople);

    //#delete a beehive
    app.delete('/bienen/people/data/:id', evaluationController.delete);

    //#update a evaluationController
    app.put('/bienen/people/data', evaluationController.update);
};