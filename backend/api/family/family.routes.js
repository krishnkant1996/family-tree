const Router = require('express').Router();
const controller = require('./family.controller');
const validation = require('./family.validations');

Router.post('/create-family',validation.createFamily, controller.createFamily);
Router.get('/list',   controller.list);
Router.post('/delete-family',validation.delete, controller.delete);

module.exports = Router;