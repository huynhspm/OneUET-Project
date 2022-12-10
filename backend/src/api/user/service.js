const { User, Class } = require("../../database/models");
const ResponseCode = require("../../utils/constant/ResponseCode");

const verifyUser = async (id) => {
	try {
		let user, message, status;
		user = await User.findByPk(id);

		if (user) {
			message = "User existed";
			status = ResponseCode.OK;
		} else {
			message = "User not existed";
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

const getMyUser = async (req) => {
	try {
		let { user, message, status } = await verifyUser(req.user.id);
		let classes, documents, student, clubs;

		if (user) {
			student = await user.getStudent();
			classes = await student.getClasses();
			documents = await user.getDocuments();
			clubs = await user.getClubs();
			message = "Get my user successfully";
			status = ResponseCode.OK;
		}

		const data = {
			user,
			student,
			classes,
			documents,
			clubs,
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

const updateMyPassword = async (req) => {
	try {
		let { user, message, status } = await verifyUser(req.user.id);

		if (user) {
			const updatedPassword = req.body;

			user = await user.update(updatedPassword, {
				individualHooks: true,
			});

			message = "Update my user successfully";
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

const updateMyUser = async (req) => {
	try {
		let { user, message, status } = await verifyUser(req.user.id);

		if (user) {
			const updatedUser = req.body;
			updatedUser["email"] = user.email;
			updatedUser["password"] = user.password;

			const { clubIds } = req.body;
			await user.setClubs(clubIds);

			user = await user.update(updatedUser);

			message = "Update my user successfully";
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

const getUsers = async (req) => {
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

const getUser = async (req) => {
	try {
		let { user, message, status } = await verifyUser(req.params.id);
		let classes, documents, student, clubs;

		if (user) {
			student = await user.getStudent();
			classes = await student.getClasses();
			documents = await user.getDocuments();
			clubs = await user.getClubs();
			message = "Get user successfully";
			status = ResponseCode.OK;
		}

		const data = {
			user,
			student,
			classes,
			documents,
			clubs,
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

const deleteUser = async (req) => {
	try {
		let { user, message, status } = await verifyUser(req.params.id);

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

module.exports = {
	getUsers,
	verifyUser,
	getMyUser,
	updateMyUser,
	getUser,
	deleteUser,
};
