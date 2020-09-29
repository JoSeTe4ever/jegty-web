import {
    initialState
} from '../store'

import {ActionTypes} from "../actions/action-type"

function rootReducer(state = initialState, action) {
    let newState = {
        ...state
    };

    if (action.type === ActionTypes.SHOW_LOG_IN_DIALOG) {
        debugger;
        newState.showLoginModal = action.payload;
        return newState;
    }

    return newState;
};

export default rootReducer;