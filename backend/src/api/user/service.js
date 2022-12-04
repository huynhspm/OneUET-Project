const { User, Class } = require("../../database/models");
const ResponseCode = require("../../utils/constant/ResponseCode");

// ok
const getAllUsers = async (req) => {
	try {
		const users = await User.findAll();

		const message = "Get all users successfully";
		const status = ResponseCode.OK;
		const data = { users };

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
const verifyUser = async (req) => {
	try {
		const { id } = req.params;
		let user, message, status;
		user = await User.findByPk(id);

		if (user) {
			message = "User existed";
			status = ResponseCode.OK;
		} else {
			message = "user not existed";
			status = ResponseCode.OK;
		}

		return {
			user,
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
		let { user, message, status } = await verifyUser(req);

		if (user) {
			const updatedUser = req.body;
			user = await user.update(updatedUser, {
				individualHooks: true,
			});

			message = "Update user successfully";
			status = ResponseCode.OK;
		}

		const data = { user };

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
		let { user, message, status } = await verifyUser(req);

		if (user) {
			user = await user.destroy();
			message = "Delete user successfully";
			status = ResponseCode.OK;
		}

		const data = { user };

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
const getUser = async (req) => {
	try {
		let { user, message, status } = await verifyUser(req);
		let classes, documents;

		if (user) {
			classes = await user.getStudent({
				include: Class,
			});
			documents = await user.getDocuments();
			message = "Get user successfully";
			status = ResponseCode.OK;
		}

		const data = {
			classes,
			documents,
		};

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

module.exports = {
	getAllUsers,
	updateUser,
	deleteUser,
	getUser,
	addUser,
};
