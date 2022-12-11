const { Comment } = require("../../database/models");
const { verifyUser } = require("../user/service");
const ResponseCode = require("../../utils/constant/ResponseCode");

const verifyComment = async (req) => {
	try {
		const { id } = req.params;
		let comment, message, status;
		comment = await Comment.findByPk(id);

		if (comment) {
			message = "Get comment successfully";
			status = ResponseCode.OK;
		} else {
			message = "Comment not existed";
			status = ResponseCode.Not_Found;
		}

		return {
			comment,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const createComment = async (req) => {
	try {
		const newComment = req.body;
		const Comment = await Comment.create(newComment);

		const message = "Create comment successfully!";
		const status = ResponseCode.Created;
		const data = { Comment };

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const getMyComments = async (req) => {
	try {
		const userId = req.user.id;
		const comments = await Comment.findAll({ where: { userId } });

		const message = "Get my comments successfully";
		const status = ResponseCode.OK;
		const data = { comments };

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const updateMyComment = async (req) => {
	try {
		let { comment, message, status } = await verifyComment(req);

		if (comment) {
			if (comment.userId === req.user.id) {
				const updatedComment = req.body;
				comment = await comment.update(updatedComment);
				message = "Update Comment successfully";
				status = ResponseCode.OK;
			} else {
				comment = null;
				message = "Comment not belongs to you, Not permission";
				status = ResponseCode.Unauthorized;
			}
		}

		const data = { comment };

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const deleteMyComment = async (req) => {
	try {
		let { comment, message, status } = await verifyComment(req);

		if (comment) {
			if (comment.userId === req.user.id) {
				comment = await comment.destroy();
				message = "Delete Comment successfully";
				status = ResponseCode.OK;
			} else {
				comment = null;
				message = "Comment not belongs to you, Not permission";
				status = ResponseCode.Unauthorized;
			}
		}

		const data = { comment };

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const getMyComment = async (req) => {
	try {
		let { comment, message, status } = await verifyComment(req);
		let document;

		if (comment) {
			if (comment.userId === req.user.id) {
				document = await comment.getDocument();
				message = "Get my comment successfully";
				status = ResponseCode.OK;
			} else {
				comment = null;
				message = "Comment not belongs to you, Not permission";
				status = ResponseCode.Unauthorized;
			}
		}

		const data = { comment, document };

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const getAllComments = async (req) => {
	try {
		const Comments = await Comment.findAll();

		const message = "Get comments successfully";
		const status = ResponseCode.OK;
		const data = { Comments };

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const getComment = async (req) => {
	try {
		let { comment, message, status } = await verifyComment(req);
		let document;

		if (comment) {
			document = await comment.getDocument();
			message = "Get comment successfully";
			status = ResponseCode.OK;
		}

		const data = { comment, document };

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const deleteComment = async (req) => {
	try {
		let { Comment, message, status } = await verifyComment(req);

		if (Comment) {
			Comment = await Comment.destroy();
			message = "Delete Comment successfully";
			status = ResponseCode.OK;
		}

		const data = { Comment };

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
	createComment,
	getMyComments,
	getMyComment,
	updateMyComment,
	deleteMyComment,
	getAllComments,
	getComment,
	deleteComment,
};
