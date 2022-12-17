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

const filePath = "/home/epicpants/Downloads/IMG_7532.JPG"; // path.join()

module.exports = {
    uploadFile: async () => {
        try {
            const response = await drive.files.create({
                requestBody: {
                    name: 'aaa.jpg',
                    mimeType: 'image/jpeg'
                },
                media: {
                    mimeType: 'image/jpeg',
                    body: fs.createReadStream(filePath)
                }
            })

            console.log(response.data);

        } catch (error) {
            console.log(error.message)
        }
    }
}
async function uploadFile() {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: 'aaa.jpg',
                mimeType: 'image/jpeg'
            },
            media: {
                mimeType: 'image/jpeg',
                body: fs.createReadStream(filePath)
            }
        })

        console.log(response.data);

    } catch (error) {
        console.log(error.message)
    }
}

async function deleteFile() {
    try {

        const response = await drive.files.delete({
            fileId: '1N_6IMcRMRI_WL_tvCX8DQrFOOMVpw09a',
        });
        console.log(response.data, response.status);
    } catch (error) {
        console.log(error.message);
    }
}

async function generatePublicUrl() {
    try {
        const fileId = '1rJnEYdfhkzmb1I0ij3wYldrjaro0aO6t';
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        })
        const result = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink',
        })
        console.log(result.data);
    } catch (error) {
        console.log(error.message);
    }
}

uploadFile();
// generatePublicUrl();
// deleteFile();
