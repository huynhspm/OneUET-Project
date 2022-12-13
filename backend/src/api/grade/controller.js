const service = require("./service");

// GET: /grade
const getGrade = async (req, res) => {
	try {
		const result = await service.getGrade(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't get grade",
			status: ResponseCode.Bad_Request,
		});
	}
};

module.exports = {
	getGrade
};
