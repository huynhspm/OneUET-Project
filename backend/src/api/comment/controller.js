const service = require("./service");
const ResponseCode = require("../../utils/constant/ResponseCode");

// POST: /comment
const createComment = async (req, res) => {
	try {
		const result = await service.createComment(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't create comment",
			status: ResponseCode.Bad_Request,
		});
	}
};

// GET: /comment/me
const getMyComments = async (req, res) => {
	try {
		const result = await service.getMyComments(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't get my comments",
			status: ResponseCode.Bad_Request,
		});
	}
};

// PUT: /comment/me/:id
const updateMyComment = async (req, res) => {
	try {
		console.log(req.user);
		const result = await service.updateMyComment(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't update my comment",
			status: ResponseCode.Bad_Request,
		});
	}
};

// DELETE: /comment/me/:id
const deleteMyComment = async (req, res) => {
	try {
		const result = await service.deleteMyComment(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't delete my comment",
			status: ResponseCode.Bad_Request,
		});
	}
};

// GET: /Comment/me/:id
const getMyComment = async (req, res) => {
	try {
		const result = await service.getMyComment(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't get my comment",
			status: ResponseCode.Bad_Request,
		});
	}
};

// GET: /comment
const getAllComments = async (req, res) => {
	try {
		const result = await service.getPublicComments(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't get all comments",
			status: ResponseCode.Bad_Request,
		});
	}
};

// GET: /comment/:id
const getComment = async (req, res) => {
	try {
		const result = await service.getComment(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't get comment",
			status: ResponseCode.Bad_Request,
		});
	}
};

// DELETE: /comment/:id
const deleteComment = async (req, res) => {
	try {
		const result = await service.deleteComment(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't delete comment",
			status: ResponseCode.Bad_Request,
		});
	}
};

module.exports = {
	createComment,
	getMyComments,
	getMyComment,
	updateMyComment,
	deleteMyComment,
	getAllComments,
	getComment,
	deleteComment,
};
