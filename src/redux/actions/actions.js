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