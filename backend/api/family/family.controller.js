let familyServies = require('./family.services')
let {
    responses,
} = require('../../utils')

exports.list = async(req, res) => {

    try{
        let params = {
			page: req.query.page ? parseInt(req.query.page) : 1,
			limit: req.query.limit ? parseInt(req.query.limit) : 10,
			sortField: req.query.sortField ? req.query.sortField : 'created_at',
			sortOrder: req.query.sortOrder ? req.query.sortOrder : 'desc',
		};
        let data = await familyServies.list(params)
        if(data.success) {
            return responses.response(res, true, data.data, 'en', data.messages, data.status)
        }
        return responses.response(res, false, {}, 'en', data.messages, data.status)
    }catch(errors) {
        console.log(errors)
        return responses.response(res, false, {}, 'en', 'INTERNAL_SERVER_ERROR', HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
}
exports.createFamily = async (req, res) => {
	try {
        let {body} = req;
		const data = await familyServies.createFamily(body);
        if(data.success) {
            return responses.response(res, true, data.data, 'en', data.messages, data.status)
        }
        return responses.response(res, false, {}, 'en', data.messages, data.status)
	} catch (error) {
        return responses.response(res, false, {}, 'en', 'INTERNAL_SERVER_ERROR', HTTP_STATUS.INTERNAL_SERVER_ERROR)
	}
};


exports.delete = async (req, res) => {
	try {
        let {body} = req;

		const data = await familyServies.delete(body);
        if(data.success) {
            return responses.response(res, true, data.data, 'en', data.messages, data.status)
        }
        return responses.response(res, false, {}, 'en', data.messages, data.status)
	} catch (error) {
        return responses.response(res, false, {}, 'en', 'INTERNAL_SERVER_ERROR', HTTP_STATUS.INTERNAL_SERVER_ERROR)
	}
};
