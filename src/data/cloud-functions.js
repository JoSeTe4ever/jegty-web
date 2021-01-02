import {
  baseFirebaseUrl
} from "./../data/firebase"

export const sendInviteMail = (email) => {
  if (email) {
    const url = `${baseFirebaseUrl()}/sendMail?dest=${email}`;
    return fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'aa36b9082b39bb660b747d1e076e23751f7c465a7a9be06862',
        }
      }
    );
  }
  return new Error("E-mail is empty");
}