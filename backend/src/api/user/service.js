const { User } = require("../../database/models");
const ResponseCode = require("../../utils/constant/ResponseCode");
const { hashPassword, comparePassword } = require("../../utils/password");

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
		let profile, classes, documents;

		if (user) {
			let student = await user.getStudent();
			let clubs = await user.getClubs();

			profile = { user, student, clubs };

			console.log(student);
			console.log("...................");
			let studiedClasses = await student.getClasses({
				where: { finish: true },
			});
			console.log("...................");

			let studyingClasses = await student.getClasses({
				where: { finish: false },
			});

			classes = { studiedClasses, studyingClasses };

			documents = await user.getDocuments();

			message = "Get my user successfully";
			status = ResponseCode.OK;
		}

		const data = {
			profile,
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

const updateMyPassword = async (req) => {
	try {
		let { user, message, status } = await verifyUser(req.user.id);

		if (user) {
			const { oldPassword, newPassword } = req.body;

			const verifyPassword = comparePassword(oldPassword, user.password);
			if (verifyPassword) {
				user = await user.update({ password: hashPassword(password) });

				message = "Update my password successfully";
				status = ResponseCode.OK;
			} else {
				message = "Invalid oldPassword";
				status = ResponseCode.Unauthorized;
			}
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
			updatedUser["password"] = undefined;

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
		let profile, classes, documents;

		if (user) {
			let student = await user.getStudent();
			let clubs = await user.getClubs();

			profile = { user, student, clubs };

			let studiedClasses = await student.getClasses({
				where: { finish: true },
			});

			let studyingClasses = await student.getClasses({
				where: { finish: false },
			});

			classes = { studiedClasses, studyingClasses };

			documents = await user.getDocuments();

			message = "Get user successfully";
			status = ResponseCode.OK;
		}

		const data = {
			profile,
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
	updateMyPassword,
	updateMyUser,
	getUser,
	deleteUser,
};
