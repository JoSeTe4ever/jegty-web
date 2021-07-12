// with babel
import Rawger from 'rawger';

export const getRawGamesByName = async (queryName) => {
  if (queryName) {
    const {
      games
    } = await Rawger({});

    const results = (await games.search(`${queryName}`));
    return results;
  }
  return [];
};

export const getRawGameById = (id) => {
  if (id) {
    return fetch(`https://api.rawg.io/api/games/${id}`).then(
      response => response.json()
    ).then(
      json => {
        return json;
      }
    ).catch(error => {
        console.log(error);
        throw error;
      }

    );
  }
  return {};
}