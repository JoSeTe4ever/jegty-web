import { pb, normalizeGame, normalizeUser, toDoc, toQuery } from './pocketbase';

export const getJegtyUserById = async (jegtUserId) => {
    if (!jegtUserId) {
        return toDoc({}, normalizeUser);
    }

    const user = await pb.collection('users').getOne(jegtUserId);
    return toDoc(user, normalizeUser);
}

export const getGameById = async (jegtyGameId) => {
    if (!jegtyGameId) {
        return toDoc({}, normalizeGame);
    }

    const game = await pb.collection('games').getOne(jegtyGameId);
    return toDoc(game, normalizeGame);
}

export const getPendingFriendRequesFromUserEmail = async (userEmail) => {
    const currentUserId = pb.authStore.model && pb.authStore.model.id;
    const filter = currentUserId
        ? `status = "pending" && (toEmail = "${userEmail}" || toUser = "${currentUserId}")`
        : `status = "pending" && toEmail = "${userEmail}"`;

    const pendingIds = await pb.collection('pending_requests').getFullList({ filter });
    return toQuery(pendingIds, (record) => ({ id: record.fromUser, requestId: record.id, ...record }));
}

export const removePendingWarning = async () => true;

export const removePendingFriendRequest = async (userEmail, uid) => {
    const currentUserId = pb.authStore.model && pb.authStore.model.id;
    const filter = currentUserId
        ? `(fromUser = "${uid}" || fromUser = "${currentUserId}") && (toEmail = "${userEmail}" || toUser = "${currentUserId}")`
        : `fromUser = "${uid}" && toEmail = "${userEmail}"`;
    const requests = await pb.collection('pending_requests').getFullList({ filter });
    await Promise.all(requests.map((request) => pb.collection('pending_requests').delete(request.id)));
}

export const removeFriend = async (currentUserUid, friendUid) => {
    const friendships = await pb.collection('friendships').getFullList({
        filter: `user = "${currentUserUid}" && friend = "${friendUid}"`,
    });

    await Promise.all(friendships.map((friendship) => pb.collection('friendships').delete(friendship.id)));
}

export const addFriendPendingRequest = async (userEmail, uid) => {
    let toUser = '';
    try {
        const users = await pb.collection('users').getFullList({ filter: `email = "${userEmail}"` });
        toUser = users && users[0] ? users[0].id : '';
    } catch (_) {
        toUser = '';
    }

    return await pb.collection('pending_requests').create({
        fromUser: uid,
        toEmail: userEmail,
        toUser,
        status: 'pending',
    });
}

export const acceptPendingFriendRequest = async (userEmail, uid, currentUserId) => {
    await pb.collection('friendships').create({
        user: currentUserId,
        friend: uid,
    });
    await removePendingFriendRequest(userEmail, uid);
    return uid;
}

export const getParticipantsIdFromRoomId = async (roomId) => {
    if (!roomId) {
        return toQuery([]);
    }

    const participants = await pb.collection('game_participants').getFullList({ filter: `game = "${roomId}"` });
    return toQuery(participants, (record) => ({ id: record.user, accepted: record.accepted }));
}

export const addNewFriend = async (friendId) => friendId;

export const createNewGame = async (game, userId, friendList) => {
    const newGame = await pb.collection('games').create({
        roomName: game.roomName,
        owner: userId,
        rawgGameId: `${game.rawgGameId}`,
        startAt: game.startAt instanceof Date ? game.startAt.toISOString() : game.startAt,
    });

    const participantIds = [userId, ...(friendList || [])];
    await Promise.all(participantIds.map((participantId) => pb.collection('game_participants').create({
        game: newGame.id,
        user: participantId,
        accepted: participantId === userId,
    })));

    return newGame.id;
}

export const getGamesByJegtyUserId = async (jegtyUserId) => {
    if (!jegtyUserId) {
        return toQuery([]);
    }

    const gameIdList = await pb.collection('game_participants').getFullList({ filter: `user = "${jegtyUserId}"` });
    return toQuery(gameIdList, (record) => ({ id: record.game, accepted: record.accepted }));
}

export const getFriendsByJegtyUserId = async (jegtyUserId) => {
    if (!jegtyUserId) {
        return toQuery([]);
    }

    const friendIdList = await pb.collection('friendships').getFullList({ filter: `user = "${jegtyUserId}"` });
    return toQuery(friendIdList, (record) => ({ id: record.friend }));
}
