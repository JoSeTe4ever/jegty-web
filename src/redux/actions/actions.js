import {
    ActionTypes
} from './action-type';

export const logValidUser = (logged) => ({
    type: ActionTypes.LOG_IN,
    payload: logged
});

export const addLogedUser = (loggedUser) => ({
    type: ActionTypes.ADD_LOGGED_USER,
    payload: loggedUser
});

export const addJegtyUser = (user) => ({
    type: ActionTypes.ADD_JEGTY_USER,
    payload: user
});

export const cacheRawGame = (rawGame) => ({
    type: ActionTypes.CACHE_RAW_GAME,
    payload: rawGame
});

export const cacheRoomGame = (rawGame) => ({
    type: ActionTypes.CACHE_ROOM_GAME,
    payload: rawGame
});

export const addGameidToUserList = (roomGameId) => ({
    type: ActionTypes.ADD_ROOM_GAME_ID,
    payload: roomGameId
});

export const addFriendidToFriendList = (friendId)  => ({
    type: ActionTypes.ADD_FRIEND_ID,
    payload: friendId
});

export const cacheJegtyUser = (jegtyUser) => ({
    type: ActionTypes.CACHE_JEGTY_USER,
    payload: jegtyUser
});

export const setHasPending = (hasPending) => ({
    type: ActionTypes.SET_PENDING,
    payload: hasPending
});
