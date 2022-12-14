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

const getPDF = async (req) => {
	try {
		const linkPDFs = await Grade.findAll({
			attributes: ["linkPDF"],
			group: ["linkPDF"],
		});

		const message = "Get pdf successfully";
		const status = ResponseCode.OK;
		const data = { linkPDFs };

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
	getPDF,
};
