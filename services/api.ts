export const MOVIES_CONFIGS = {
    BASE_URL: "https://api.themoviedb.org/3",
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    HEADERS: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
    }
}

export const getMovies = async ({ query }: { query: string }) => {
    const endpoint = query
        ? `${MOVIES_CONFIGS.BASE_URL}/search/movie?query=${encodeURI(query)}`
        : `${MOVIES_CONFIGS.BASE_URL}/discover/movie?sort_by=popularity.desc`

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: MOVIES_CONFIGS.HEADERS
    })

    if (!response.ok) {
        throw new Error(response.statusText)
    }

    const data = await response.json()
    return data.results
}