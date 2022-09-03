const { Router } = require('express');
const userDel = require('../controller/controllerDelete');
const controllersGet = require('../controller/controllerGet');
const createUser = require('../controller/controllerPost');
const routes = Router();
const updateUser = require('../controller/controllerPut');

routes.get('/usuarios', controllersGet.getUser);
routes.get('/usuario/:id', controllersGet.getUserByID);
routes.post('/usuario', createUser);
routes.put('/usuario/:id', updateUser);
routes.delete('/usuario/:id', userDel);

module.exports = routes