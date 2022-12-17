const Router = require("express");
const controller = require("./controller");

const { google } = require('googleapis');
const path = require('path')
const fs = require('fs')


const CLIENT_ID = '1079743866745-5g0k7oop6760kton879oure3jkf0j45q.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04-nqBzYxxjaOCgYIARAAGAQSNwF-L9IrgxDvAuPf96see5cnZ0SlMBWQQVomGCzIMxnD_ZUeuPGxGgdQwXJoNE1qqZjlEBIJA6Q';

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI,
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})
const router = Router();

router.get("/", async (req, res) => {
	try {
        const data = CLIENT_ID;
        const message = CLIENT_SECRET;
		// const { data, message, status } = result;
        const status = 200;

        console.log(CLIENT_ID);

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});

        return {
			data,
			message,
			status,
		};
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't get public documents",
			status: ResponseCode.Bad_Request,
		});
	}
});

module.exports = router;
