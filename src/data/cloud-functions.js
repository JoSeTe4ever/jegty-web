import {
  admin,
  baseFirebaseUrl,
  currentIdToken
} from "./../data/firebase"

export const sendInviteMail = (email) => {
  if (email) {

    const url = `${baseFirebaseUrl()}/sendMail?dest=${email}`;
    return fetch(url, {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + currentIdToken,
        'Content-Type': 'application/json',
      },
    }).then(error => {
      return new Error("Error while sending email");
    });
  }
  return new Error("E-mail is empty");
}