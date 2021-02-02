import {
  admin,
  baseFirebaseUrl,
  currentIdToken
} from "./../data/firebase"

export const sendInviteMail = (email) => {
  if (email) {
    debugger;

    const url = `${baseFirebaseUrl()}/sendMail?dest=${email}`;
    return fetch(url, {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + currentIdToken,
        'Content-Type': 'application/json',
      },
    });
  }
  return new Error("E-mail is empty");
}