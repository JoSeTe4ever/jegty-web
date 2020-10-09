import {
    initialState
} from '../store'

import {
    ActionTypes
} from "../actions/action-type"

function rootReducer(state = initialState, action) {
    let newState = {
        ...state
    };

    if (action.type === ActionTypes.SHOW_LOG_IN_DIALOG) {
        newState.showLoginModal = action.payload;
        return newState;
    }

    if (action.type === ActionTypes.LOG_IN) {
        if (!action.payload) {
            window.localStorage.clear();
            return {...initialState};
        }
        newState.isLogged = action.payload;
        return newState;
    }

    if (action.type === ActionTypes.ADD_LOGGED_USER) {
        newState.user = action.payload;
        return newState;
    }


    if (action.type === ActionTypes.ADD_JEGTY_USER) {
        newState.jegtyUser = action.payload;
        return newState;
    }

    return newState;
};

export default rootReducer;