const Router = require('express').Router();
const controller = require('./family-members.controller');
const validation = require('./family-members.validations');

Router.post('/create-family-members',validation.createFamilyMembers, controller.createFamilyMembers);
Router.post('/delete-family-members',validation.delete, controller.delete);
module.exports = Router;