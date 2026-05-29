import { pb } from './pocketbase';

export const sendInviteMail = (email) => {
  if (email) {
    return pb.send('/api/jegty/send-mail', {
      method: 'GET',
      query: { dest: email },
    }).then(() => true);
  }
  return Promise.reject(new Error("E-mail is empty"));
}
