const { User } = require("../../database/models");
const ResponseCode = require("../../utils/constant/ResponseCode");

const getAllUsers = async (req) => {
	try {
		const data = await User.findAll();
		const message = "Get all users successfully";
		const status = ResponseCode.OK;

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};
const getUserById = async (req) => {
	try {
		const { id } = req.params;
		let data, message, status;
		data = await User.findByPk(id);

		if (!data) {
			message = "User not existed";
			status = ResponseCode.Not_Found;
		} else {
			message = "Get user successfully";
			status = ResponseCode.OK;
		}

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const updateUser = async (req) => {
	try {
		const { id } = req.params;
		const updatedUser = req.body;
		const data = await User.update(updatedUser, {
			where: { id },
			individualHooks: true,
		});

		const message = "Update user successfully";
		const status = ResponseCode.OK;

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const deleteUser = async (req) => {
	try {
		const { id } = req.params;
		const data = await User.destroy({ where: { id } });
		const message = "Delete user successfully";
		const status = ResponseCode.OK;

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const getAllClasses = async (req) => {
	try {
		let { data, message, status } = await getUserById(req);

		if (data) {
			data = await data.getClasses();
			message = "Get all classes of user successfully";
			status = ResponseCode.OK;
		}

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const getAllDocuments = async (req) => {
	try {
		let { data, message, status } = await getUserById(req);

		if (data) {
			data = await data.getDocuments();
			message = "Get all documents of user successfully";
			status = ResponseCode.OK;
		}

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
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser,
	getAllClasses,
	getAllDocuments,
};
