let familyMembersServies = require('./family-members.services')
let {
    responses,
} = require('../../utils')

exports.createFamilyMembers = async (req, res) => {
	try {
        let {body} = req;
		const data = await familyMembersServies.createFamilyMembers(body);
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
		const data = await familyMembersServies.delete(body);
        if(data.success) {
            return responses.response(res, true, data.data, 'en', data.messages, data.status)
        }
        return responses.response(res, false, {}, 'en', data.messages, data.status)
	} catch (error) {
        return responses.response(res, false, {}, 'en', 'INTERNAL_SERVER_ERROR', HTTP_STATUS.INTERNAL_SERVER_ERROR)
	}
};


