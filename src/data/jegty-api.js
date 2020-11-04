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

/**
 * Get a Jegty game From Firestore by its id 
 * 
 * @param {*} jegtyGameId 
 */
export const getGameById = async (jegtyGameId) => {
    let game = {};
    if (jegtyGameId) {
        game = await db.collection('games').doc(jegtyGameId).get();
    } else {
        game = {}
    }
    return game;
}



/**
 * Creates a new game. 
 * Since Firebase has limitations, it uses interelated 
 * tables.
 * 
 * @param {*} game 
 * @param {*} userId 
 */
export const createNewGame = async (game, userId) => {

    const ref = db.collection("users").doc(userId).collection("games").doc();
    const gameId = ref.id;
    game.id= gameId;
    
    await db.collection("games").doc(gameId).set(game);

    const userGame = db.collection("users").doc(userId).collection("games").doc(gameId);
    const gameUser = db.collection("games").doc(gameId).collection("users").doc(userId);

    const batch = db.batch();
    batch.set(userGame, { id: gameId });
    batch.set(gameUser, { accepted: true, id: userId });
    batch.commit();
}