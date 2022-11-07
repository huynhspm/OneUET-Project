const { User } = require("../../database/models");

const getUsers = async (Users) => {
	const data = await User.findAll();

	const message = "Get users successfully";
	const status = 200;

	return {
		data,
		message,
		status,
	};
};

const updateUser = async (updatedUser) => {
	await User.update(updatedUser, {
		where: {
			id: updatedUser.id,
		},
		individualHooks: true,
	});

	const message = "Update user successfully";
	const status = 200;

	return {
		message,
		status,
	};
};

const deleteUser = async (deletedUser) => {
	await User.destroy({
		where: {
			id: deletedUser.id,
		},
	});

	const message = "Delete user successfully";
	const status = 200;

	return {
		message,
		status,
	};
};

module.exports = { getUsers, updateUser, deleteUser };
