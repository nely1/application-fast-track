import { GmailData } from "./interfaces";

const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');
const {GmailData} = require('@/lib/interfaces');

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
 * Uploads pdf in the user's account that matches the query term.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function getEmails(auth, title: string) {
  let returnGmails: Array<GmailData> = [];
  const queryTerms = `newer_than:1h`;
  const gmail = google.gmail({version: 'v1', auth});
  const res = await gmail.users.messages.list({
    userId: 'me',
    q: queryTerms,
  });
  
  const messages = res.data;
  if (messages.resultSizeEstimate === 0) {
    console.log('No emails found.');
    return;
  } else {

    for (const applicants of res.data.messages){ // things needed: email, resume name, resume encoding
      const applicantEmail = await gmail.users.messages.get({
        userId: 'me',
        id: applicants.id,
      });
      //console.log("this is a new email")
      let applicationData: GmailData = {};
      const [subject, from] = (applicantEmail.data.payload.headers).filter((header) => (header.name === 'From' || header.name === 'Subject'));
      let resumeData = '';
      var resumeName = "";
      var resumeAttachmentID = "";
      for (const attachments of applicantEmail.data.payload.parts) {
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
          messageId: applicants.id
        });
        //console.log("The pdf name uploaded is: " + resumeName);
       
        resumeData =  resume.data.data;
    
        applicationData.email = from.value;
        applicationData.title = subject.value;
        applicationData.fileEncoding = resumeData;
        applicationData.fileName = resumeName;
        
        returnGmails.push(applicationData);
      } else {
        console.log("No resume attached")
       
      }
    }
    return returnGmails;
  }    
}

export async function GetGmails(title: string) {
  return await authorize().then((auth) => getEmails(auth, title)).catch(console.error);
};

export default GetGmails;