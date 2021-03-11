export const sortGamesByDateASC = (state) => {
    return state.games;
}

export const sortGamesByDateDESC = (state) => {
    return state.games;
}

/**
 * Curryfied function since the redux selectors 
 * only accept a function with the state as only param 
 * 
 * @param {*} userId 
 * @returns an User object or undefined if not found in cache
 */
export const getCachedUserById = userId => state => {
    return state.cache.jegtyUsers.filter(({ id }) => id === userId)[0];
}