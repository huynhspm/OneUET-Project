const bcrypt = require("bcrypt");
const salt = 10;

const hashPassword = (password) => {
	return bcrypt.hashSync(password, salt);
};

const comparePassword = (password, hashedPassword) => {
	return bcrypt.compareSync(password, hashedPassword);
};

module.exports = {
	hashPassword,
	comparePassword,
};
