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