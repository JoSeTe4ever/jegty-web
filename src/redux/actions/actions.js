import {
    ActionTypes
} from './action-type';

// actions
export const showDialog = (showDialog) => ({
    type: ActionTypes.SHOW_LOG_IN_DIALOG,
    payload: showDialog
});