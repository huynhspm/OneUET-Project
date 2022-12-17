const jwt = require("jsonwebtoken");
const config = require("../config");

const RoleCode = require("../utils/constant/RoleCode");
const ResponseCode = require("../utils/constant/ResponseCode");

const verifyToken = (req, res, next) => {
	const token = req.header("Authorization")?.replace("Bearer ", "");

	if (!token) {
		return res.status(ResponseCode.Unauthorized).json({
			data: null,
			message: "No token provided",
			status: ResponseCode.Unauthorized,
		});
	}

	jwt.verify(token, config.secret_key, (error, decode) => {
		if (error) {
			return res.status(ResponseCode.Unauthorized).json({
				data: error.message,
				message: "Unauthorized",
				status: ResponseCode.Unauthorized,
			});
		}

		req.user = decode;
		next();
	});
};

const verifyAdmin = async (req, res, next) => {
	const token = req.user;
	if (!token || token.roleId !== RoleCode.Admin) {
		return res.status(ResponseCode.Unauthorized).json({
			data: null,
			message: "You are not admin, Not permission",
			status: ResponseCode.Unauthorized,
		});
	}
	next();
};

const verifyUser = async (req, res, next) => {
	const token = req.user;
	if (!token || !token.roleIds.includes(RoleCode.User)) {
		return res.status(ResponseCode.Unauthorized).json({
			data: null,
			message: "You are not user, Not permission",
			status: ResponseCode.Unauthorized,
		});
	}
	next();
};

module.exports = { verifyToken, verifyAdmin, verifyUser };
