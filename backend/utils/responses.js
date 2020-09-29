let { ResponseMsg } = require('./locale');
exports.response = (res, success=true,  data={}, languageCode = 'en', message = '', statusCode = 200) => {
	const resData = {
		success: success,
		message: ResponseMsg(message, languageCode),
		statusCode: statusCode,
		data,
		messageCode: message
	};
	return res.status(statusCode).send(resData);
};