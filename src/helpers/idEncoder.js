/**
 * We use the mail without points to use it 
 * as a key in Firebase, and subtitute it for ";"
 * jose.92@gmail.com -> jose;92@gmail;com
 * 
 * @returns string 
 */
export const emailEncoder = (email) => {
    return email.replace(/\./g, ';')
}