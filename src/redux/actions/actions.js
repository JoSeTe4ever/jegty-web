import {
    ActionTypes
} from './action-type';

// actions
export const showDialog = (showDialog) => ({
    type: ActionTypes.SHOW_LOG_IN_DIALOG,
    payload: showDialog
});

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