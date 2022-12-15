const service = require("./service");
const ResponseCode = require("../../utils/constant/ResponseCode");

// POST: /club
const createClub = async (req, res) => {
	try {
		const result = await service.createClub(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't create club",
			status: ResponseCode.Bad_Request,
		});
	}
};

// GET: /club/
const getClubs = async (req, res) => {
	try {
		const result = await service.getClubs(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't get clubs",
			status: ResponseCode.Bad_Request,
		});
	}
};

// GET: /Club/:id
const getClub = async (req, res) => {
	try {
		const result = await service.getClub(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't get club",
			status: ResponseCode.Bad_Request,
		});
	}
};

// PUT: /club/:id
const updateClub = async (req, res) => {
	try {
		console.log(req.user);
		const result = await service.updateClub(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't update club",
			status: ResponseCode.Bad_Request,
		});
	}
};

// DELETE: /club/:id
const deleteClub = async (req, res) => {
	try {
		const result = await service.deleteClub(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't delete club",
			status: ResponseCode.Bad_Request,
		});
	}
};

module.exports = {
	createClub,
	getClubs,
	getClub,
	updateClub,
	deleteClub,
};
