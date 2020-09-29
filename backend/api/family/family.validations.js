// eslint-disable-next-line import/no-unresolved
const Joi = require('@hapi/joi');
let {
    responses,
} = require('../../utils')
exports.createFamily = (req, res, next) => {
	const schema = Joi.object().keys({
		family_name: Joi.string().max(200).required(),
		name: Joi.string().max(200).required(),
		gender: Joi.string().max(200).required()
	});
	let data = schema.validate(req.body);

	if (data.hasOwnProperty('error')) {
        return responses.response(res, false, {}, 'en', 'REQUIRED_FIELD_VALIDATION', HTTP_STATUS.INTERNAL_SERVER_ERROR)
	} else {
		next();
	}
};
exports.delete = (req, res, next) => {
	const schema = Joi.object().keys({
		family_id: Joi.string().max(200).required(),
	});
	let data = schema.validate(req.body);
	if (data.hasOwnProperty('error')) {
        return responses.response(res, false, {}, 'en', 'REQUIRED_FIELD_VALIDATION', HTTP_STATUS.INTERNAL_SERVER_ERROR)
	} else {
		next();
	}
};


