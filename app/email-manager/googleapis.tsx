const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');


function decodeBase64(str) {
  str = str.replace(/_/g, '/').replace(/-/g, '+');
  return Buffer.from(str, "base64");
}

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function getEmails(auth) {
  const emailNumber = 0;
  const gmail = google.gmail({version: 'v1', auth});
  const res = await gmail.users.messages.list({
    userId: 'me',
  });
  
  const messages = res.data;
  if (!messages || messages.length === 0) {
    console.log('No emails found.');
    return;
  } else {

    const firstEmail = await gmail.users.messages.get({
      userId: 'me',
      id: messages.messages[emailNumber].id,
    });

    var subjectTitle = "";
    for (const header of firstEmail.data.payload.headers) {
        if (header.name === 'Subject') {
          subjectTitle = header.value;
          break;
        }
    }
    if (subjectTitle) {
      console.log("This is the subject title: " + subjectTitle);
    } else {
      console.log("Applicant had no title in their email.");
    }

    var resumeName = "";
    var resumeAttachmentID = "";
    for (const attachments of firstEmail.data.payload.parts) {
      if (attachments.mimeType === 'application/pdf') {
        resumeName = attachments.filename;
        resumeAttachmentID = attachments.body.attachmentId; 
        break;
      }
    }

    if (resumeAttachmentID) {
      const resume = await google.gmail('v1').users.messages.attachments.get({
        auth: auth,
        userId: 'me',
        id: resumeAttachmentID,
        messageId: messages.messages[emailNumber].id
      });
      fs.writeFile(resumeName, decodeBase64(resume.data.data));
    } else {
      console.log("No resume attached")
    }
  }
}

authorize().then(getEmails).catch(console.error);