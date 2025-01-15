export const getRawGamesByName = async (queryName) => {
  if (queryName) {
    const apiKey = process.env.REACT_APP_RAWG_API_KEY;
    return fetch(
      `https://api.rawg.io/api/games?key=${apiKey}&search=${queryName}`
    )
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }
  return [];
};

/**
 * Get all games from the rawg api sorted by popularity
 */
export const getRawGames = async () => {
  const apiKey = process.env.REACT_APP_RAWG_API_KEY;
  return fetch(
    `https://api.rawg.io/api/games?key=${apiKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const getRawGameById = (id) => {
  if (id) {
    return fetch(`https://api.rawg.io/api/games/${id}`)
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }
  return {};
};
