const { User, Class } = require("../../database/models");
const ResponseCode = require("../../utils/constant/ResponseCode");

// ok
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

// ok
const getUserById = async (req) => {
	try {
		const { id } = req.params;
		let data, message, status;
		data = await User.findByPk(id);

		if (data) {
			message = "Get user successfully";
			status = ResponseCode.OK;
		} else {
			message = "User not existed";
			status = ResponseCode.Not_Found;
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

// ok
const updateUser = async (req) => {
	try {
		let { data, message, status } = await getUserById(req);

		if (data) {
			const updatedUser = req.body;
			data = await data.update(updatedUser, {
				individualHooks: true,
			});

			message = "Update user successfully";
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

// ok
const deleteUser = async (req) => {
	try {
		let { data, message, status } = await getUserById(req);

		if (data) {
			data = await data.destroy();
			message = "Delete user successfully";
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

const addUser = async (req) => {};

// ok
const getAllClasses = async (req) => {
	try {
		let { data, message, status } = await getUserById(req);

		if (data) {
			data = await data.getStudent({
				include: Class,
			});
			message = "Get all classes successfully";
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

// ok
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
	addUser,
	getAllClasses,
	getAllDocuments,
};
