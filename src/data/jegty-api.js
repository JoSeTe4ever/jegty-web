import {
    db,
    realTimeDb
} from './firebase'
import {
    emailEncoder
} from "./../helpers/idEncoder"

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
 * get the uids of the pending friendship request 
 * of the table pending/userEmail
 * @param {string} userEmail 
 * @returns promise of an array of ids
 */
export const getPendingFriendRequesFromUserEmail = async (userEmail) => {
    const encodedEmail = emailEncoder(userEmail)
    const pendingIds = await db.collection('pendings').doc(encodedEmail).collection('users').get();
    return pendingIds;
}

/**
 * removes a friend request, it can be used when accepting 
 * or rejecting the friend request from the friend view. 
 * 
 * @param {*} userEmail 
 * @param {*} uid 
 */
export const removePendingFriendRequest = async (userEmail, uid) => {
    const encodedEmail = emailEncoder(userEmail);
    return await db.collection("pendings").doc(encodedEmail).collection('users').doc(uid).delete();
}

/**
 * adds a friend request. It will set the realtime database to true in case it is not 
 * set.
 * 
 * @param {*} userEmail 
 * @param {*} uid 
 */
export const addFriendPendingRequest = async (userEmail, uid) => {
    const encodedEmail = emailEncoder(userEmail);
    return await db.collection("pendings").doc(encodedEmail).collection('users').doc(uid).set({
        id: uid
    }).then(ok => {
        var pendingRequestsRef = realTimeDb.ref(`pendingRequests/${encodedEmail}`);
        pendingRequestsRef.set(true);
    });
}


/**
 * Add the pending friend request, it should create the 
 * entry on the friend zone.
 * 
 * @param {*} userEmail 
 * @param {*} uid 
 * @param {*} userEmail current User.
 */
export const acceptPendingFriendRequest = async (userEmail, uid, currentUserId) => {
    const encodedEmail = emailEncoder(userEmail);
    return await removePendingFriendRequest(encodedEmail, uid).then(async (ok) => {
        await db.collection('friendZone').doc(currentUserId).collection("friends").doc(uid).set({
            id: uid
        })
    });
}


/**
 * Returns a promise of the List of participants id of a jegty room
 * @param {id} roomId 
 */
export const getParticipantsIdFromRoomId = async (roomId) => {
    let participantsIdList = [];
    if (roomId) {
        participantsIdList = await db.collection('games').doc(roomId).collection('users').get();
    }
    return participantsIdList;
}

export const addNewFriend = async (friendId) => {
    return friendId;
}

/**
 * Creates a new game. 
 * Since Firebase has limitations, it uses interelated 
 * tables.
 * 
 * @param {*} game 
 * @param {*} userId the creator of the game. Owner of the room. 
 * @param {*} friendList id of the list of friends.
 */
export const createNewGame = async (game, userId, friendList) => {

    const ref = db.collection("users").doc(userId).collection("games").doc();
    const gameId = ref.id;
    game.id = gameId;

    await db.collection("games").doc(gameId).set(game);

    const userGame = db.collection("users").doc(userId).collection("games").doc(gameId);
    const gameUser = db.collection("games").doc(gameId).collection("users").doc(userId);

    let gamesBatchedReferences = [];
    let userBatchedReferences = [];

    if (friendList && friendList.length > 0) {
        userBatchedReferences = friendList.map(friendId => {
            return {
                reference: db.collection("users").doc(friendId).collection("games").doc(gameId),
                id: friendId
            };
        });

        gamesBatchedReferences = friendList.map(friendId => {
            return {
                reference: db.collection("games").doc(gameId).collection("users").doc(friendId),
                id: friendId
            }
        });
    }

    const batch = db.batch();
    userBatchedReferences.forEach(e => {
        batch.set(e.reference, {
            id: e.id
        });
    });

    gamesBatchedReferences.forEach(e => {
        batch.set(e.reference, {
            accepted: false,
            id: e.id
        });
    });

    batch.set(userGame, {
        id: gameId
    });
    batch.set(gameUser, {
        accepted: true,
        id: userId
    });
    return batch.commit().then(() => {
        return gameId;
    }).catch(error => {
        throw new Error(error);
    });
}


/**
 * Get a list of Jegty game id From Firestore by its id 
 * 
 * @param {*} jegtyGameId 
 */
export const getGamesByJegtyUserId = async (jegtyUserId) => {
    let gameIdList = [];

    if (jegtyUserId) {
        gameIdList = await db.collection('users').doc(jegtyUserId).collection("games").get();
    }

    return gameIdList;
}


/**
 * Get a list of Jegty game id From Firestore by its id 
 * Due to the limitations of Firebase, it uses intermediate and nested documents 
 * 
 * @param {*} jegtyGameId 
 */
export const getFriendsByJegtyUserId = async (jegtyUserId) => {
    let gameIdList = [];

    if (jegtyUserId) {
        gameIdList = await db.collection('friendZone').doc(jegtyUserId).collection("friends").get();
    }

    return gameIdList;
}