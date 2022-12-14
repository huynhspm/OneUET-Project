const { Grade } = require("../../database/models");
const ResponseCode = require("../../utils/constant/ResponseCode");

const getGrade = async (req) => {
	try {
		const query = req.query;
		const grade = await Grade.findAll({ where: query });

		const message = "Get grade successfully";
		const status = ResponseCode.OK;
		const data = { grade };

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

module.exports = {
	getGrade,
};
