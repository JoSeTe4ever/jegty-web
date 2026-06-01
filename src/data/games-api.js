const RAWG_API_URL = "https://api.rawg.io/api";

const getRawgApiKey = () => {
  const apiKey = process.env.REACT_APP_RAWG_API_KEY;
  if (!apiKey) {
    throw new Error("Missing REACT_APP_RAWG_API_KEY environment variable");
  }
  return apiKey;
};

const fetchRawg = (path, params = {}) => {
  const searchParams = new URLSearchParams({
    key: getRawgApiKey(),
  });

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, value);
    }
  });

  return fetch(`${RAWG_API_URL}${path}?${searchParams.toString()}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`RAWG request failed with status ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const getRawGamesByName = async (queryName) => {
  if (queryName) {
    return fetchRawg("/games", { search: queryName, ordering: "-added" });
  }
  return [];
};

/**
 * Get all games from the rawg api sorted by popularity
 */
export const getRawGames = async (params = {}) => {
  return fetchRawg("/games", {
    page: 1,
    page_size: 20,
    ordering: "-added",
    ...params,
  });
};

export const getRawGameById = (id) => {
  if (id) {
    return fetchRawg(`/games/${id}`);
  }
  return {};
};
