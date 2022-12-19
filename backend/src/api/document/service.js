const { Document } = require("../../database/models");
const ResponseCode = require("../../utils/constant/ResponseCode");
const { google } = require('googleapis');
const fs = require('fs');
const { client_id, client_secret, redirect_uri, refresh_token } = require("../../config");

// const CLIENT_ID = '1079743866745-5g0k7oop6760kton879oure3jkf0j45q.apps.googleusercontent.com';
const CLIENT_ID = client_id;
const CLIENT_SECRET = client_secret;
const REDIRECT_URI = redirect_uri;
const REFRESH_TOKEN = refresh_token;
const t1 = "https://docs.google.com/viewer?srcid=";
const t2 = "&pid=explorer&efh=false&a=v&chrome=false&embedded=true";

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

async function uploadFile(name) {
	try {
		const response = await drive.files.create({
                requestBody: {
                    name: name + '.pdf',
                    mimeType: 'application/pdf'
                },
                media: {
                    mimeType: 'application/pdf',
				body: fs.createReadStream("tmp.pdf")
			}
		})

		console.log(response.data);
		// return response.data.id;
		return generatePublicUrl(response.data.id);
	} catch (error) {
		console.log(error.message)
	}
}

async function generatePublicUrl(id) {
    try {
        // const fileId = '1rJnEYdfhkzmb1I0ij3wYldrjaro0aO6t';
        await drive.permissions.create({
            fileId: id,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        })
        const result = await drive.files.get({
            fileId: id,
            fields: 'webViewLink, webContentLink',
        })
		// result.push({
		// 	customViewLink: t1.concat(id, t2)
		// });
		// console.log(result)
		const res = {
			linkDownload: result.data.webContentLink,
			linkView: t1.concat(id, t2)
		};
		return res;
        // console.log(result.data);
    } catch (error) {
        console.log(error.message);
    }
}

const verifyDocument = async (req) => {
	try {
		const { id } = req.params;
		let document, message, status;
		document = await Document.findByPk(id);

		if (document) {
			message = "Get document successfully";
			status = ResponseCode.OK;
		} else {
			message = "Document not existed";
			status = ResponseCode.Not_Found;
		}

		return {
			document,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const createDocument = async (req) => {
	try {
		const newDocument = req.body;
		let dataPDF = newDocument.dataUri.dataUri; 
		dataPDF = dataPDF.replace('data:application/pdf;base64,', '');
		fs.writeFile('tmp.pdf', dataPDF, 'base64', (error) => {
			if (error) throw error;
			console.log("Doc saved!");
		  });
		uploadFile(String(newDocument.name))
		.then((link) => {
			console.log(link);
			newDocument.linkDownload = link.linkDownload;
			newDocument.linkView = link.linkView;
		})
		.then(async () => {		
			const document = await Document.create(newDocument);
			// console.log(newDocument);
			const message = "Create document successfully!";
			const status = ResponseCode.Created;
			const data = { document };
			
			return {
				data,
				message,
				status,
			};
		});
	
	} catch (e) {
		throw e;
	}
};

const getPublicDocuments = async (req) => {
	try {
		const query = req.query;
		query["status"] = "public";
		const documents = await Document.findAll({ where: query });

		const message = "Get public documents successfully";
		const status = ResponseCode.OK;
		const data = { documents };

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const getPublicDocument = async (req) => {
	try {
		let { document, message, status } = await verifyDocument(req);
		let course, teacher, comments;

		console.log("getPublicDocument()");

		if (document) {
			if (document.status === "public") {
				course = await document.getCourse();
				teacher = await document.getTeacher();
				comments = await document.getComments({
					include: "user"
				});

				message = "Get public document successfully";
				status = ResponseCode.OK;
			} else {
				document = null;
				message = "Document not public";
				status = ResponseCode.Unauthorized;
			}
		}

		const data = {
			document,
			course,
			teacher,
			comments,
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

const getMyDocument = async (req) => {
	try {
		let { document, message, status } = await verifyDocument(req);
		let course, teacher, comments;

		if (document) {
			if (document.userId === req.user.id) {
				course = await document.getCourse();
				teacher = await document.getTeacher();
				comments = await document.getComments();

				message = "Get my document successfully";
				status = ResponseCode.OK;
			} else {
				document = null;
				message = "Document not belongs to you";
				status = ResponseCode.Unauthorized;
			}
		}

		const data = {
			document,
			course,
			teacher,
			comments,
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

const updateMyDocument = async (req) => {
	try {
		let { document, message, status } = await verifyDocument(req);

		if (document) {
			if (document.userId === req.user.id) {
				const updatedDocument = req.body;
				await document.update(updatedDocument);
				// course = await document.getCourse();
				// teacher = await document.getTeacher();
				// comments = await document.getComments();

				message = "Update my document successfully";
				status = ResponseCode.OK;
			} else {
				document = null;
				message = "Document not belongs to you";
				status = ResponseCode.Unauthorized;
			}
		}

		const data = { document };

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const deleteMyDocument = async (req) => {
	try {
		let { document, message, status } = await verifyDocument(req);

		if (document) {
			if (document.userId === req.user.id) {
				document = await document.destroy();
				message = "Delete my document successfully";
				status = ResponseCode.OK;
			} else {
				document = null;
				message = "Document not belongs to you";
				status = ResponseCode.Unauthorized;
			}
		}

		const data = { document };

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const getDocuments = async (req) => {
	try {
		const query = req.query;
		const documents = await Document.findAll({ where: query });

		const message = "Get documents successfully";
		const status = ResponseCode.OK;
		const data = { documents };

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const getDocument = async (req) => {
	try {
		let { document, message, status } = await verifyDocument(req);
		let course, teacher, comments;

		console.log("HEREEE");


		if (document) {
			course = await document.getCourse();
			teacher = await document.getTeacher();
			comments = await document.getComments();

			message = "Get document successfully";
			status = ResponseCode.OK;
		}

		const data = {
			document,
			course,
			teacher,
			comments,
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

const deleteDocument = async (req) => {
	try {
		let { document, message, status } = await verifyDocument(req);

		if (document) {
			document = await document.destroy();
			message = "Delete document successfully";
			status = ResponseCode.OK;
		}

		const data = { document };

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
	createDocument,
	getPublicDocuments,
	getPublicDocument,
	getMyDocument,
	updateMyDocument,
	deleteMyDocument,
	getDocuments,
	getDocument,
	deleteDocument,
};
