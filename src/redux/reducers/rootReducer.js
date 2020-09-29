import {
    initialState
} from '../store'

function rootReducer(state = initialState, action) {
    let newState = {
        ...state
    };
    return initialState;
};

export default rootReducer;