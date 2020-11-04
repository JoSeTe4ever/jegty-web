import {
    db
} from './firebase'

export const getJegtyUserById = async (jegtUserId) => {
    let user = {};
    if (jegtUserId) {
        user = await db.collection('users').doc(jegtUserId).get();
    } else {
        user = {}
    }
    return user;
}

export const createNewGame = async (game) => {
    await db.collection('games').add({
        game
    });
}