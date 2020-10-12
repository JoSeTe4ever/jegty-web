// with babel
import Rawger from 'rawger';

export const getGamesByName = async (queryName) => {
    if (queryName) {
        const {
            games
        } = await Rawger({});

        const results = (await games.search(`${queryName}`));
        return results;
    }
    return [];
}