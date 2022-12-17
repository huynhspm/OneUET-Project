const { Club } = require("../../database/models");
const ResponseCode = require("../../utils/constant/ResponseCode");

const verifyClub = async (req) => {
	try {
		const { id } = req.params;
		let club, message, status;
		club = await Club.findByPk(id);

		if (club) {
			message = "Get club successfully";
			status = ResponseCode.OK;
		} else {
			message = "Club not existed";
			status = ResponseCode.Not_Found;
		}

		return {
			club,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const createClub = async (req) => {
	try {
		const newClub = req.body;
		const club = await Club.create(newClub);

		const message = "Create club successfully!";
		const status = ResponseCode.Created;
		const data = { club };

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const getClubs = async (req) => {
	try {
		const clubs = await Club.findAll();

		const message = "Get clubs successfully";
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

const getClub = async (req) => {
	try {
		let { club, message, status } = await verifyClub(req);

		let users;
		if (club) {
			users = await club.getUsers();
			message = "Get club successfully";
			status = ResponseCode.OK;
		}

		const data = { comment, users };

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const updateClub = async (req) => {
	try {
		let { club, message, status } = await verifyClub(req);

		if (club) {
			const updatedClub = req.body;
			club = await club.update(updatedClub);
			message = "Update club successfully";
			status = ResponseCode.OK;
		}

		const data = { club };

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const deleteClub = async (req) => {
	try {
		let { club, message, status } = await verifyComment(req);

		if (club) {
			club = await club.destroy();
			message = "Delete club successfully";
			status = ResponseCode.OK;
		}

		const data = { club };

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
	createClub,
	getClubs,
	getClub,
	updateClub,
	deleteClub,
};
