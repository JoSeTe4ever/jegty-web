import {
    initialState
} from '../store'

import {
    ActionTypes
} from "../actions/action-type"

/**
 * Do not forget to include a default return otherwise 
 * the store will not be persisted between refreshs
 * 
 */
function rootReducer(state = initialState, action) {
    let newState = {};
    if (!state.user) {
        newState = {
            ...initialState
        };
    } else {
        newState = {
            ...state
        };
    }

    if (action.type === ActionTypes.LOG_IN) {
        if (!action.payload) {
            window.localStorage.clear();
            return {
                ...initialState
            };
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

    if (action.type === ActionTypes.CACHE_RAW_GAME) {
        if (!newState.cache.rawGames.some(e => e.id === action.payload.id)) {
            newState.cache.rawGames.push(action.payload);
        }
        return newState;
    }

    if (action.type === ActionTypes.CACHE_ROOM_GAME) {
        if (!newState.cache.roomGames.some(e => e.id === action.payload.id)) {
            newState.cache.roomGames.push(action.payload);
        }
        return newState;
    }

    if (action.type === ActionTypes.ADD_ROOM_GAME_ID) {
        if (!newState.userGames.some(e => e.id === action.payload)) {
            newState.userGames.push(action.payload);
        }
        return newState;
    }

return newState;
};

export default rootReducer;