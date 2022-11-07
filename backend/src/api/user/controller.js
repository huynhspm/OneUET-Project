const service = require("./service");

const getUsers = async (req, res) => {
	const result = await service.getUsers(req.body);
	const { data, message, status } = result;
	res.status(status).json({
		data: data,
		message: message,
		status: status,
	});
};

const updateUser = async (req, res) => {
	const result = await service.updateUser(req.body);
	const { message, status } = result;
	res.status(status).json({
		message: message,
		status: status,
	});
};

const deleteUser = async (req, res) => {
	const result = await service.deleteUser(req.body);
	const { message, status } = result;
	res.status(status).json({
		message: message,
		status: status,
	});
};

module.exports = { getUsers, updateUser, deleteUser };
