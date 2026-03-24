import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "starredMovies";

interface StarredMovie {
    id: number;
    title: string;
    release_date: string;
    vote_average: number;
    poster_path: string;
}

export const getStarredMovies = async (): Promise<StarredMovie[]> => {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

export const toggleMovie = async (movie: StarredMovie): Promise<boolean> => {
    const movies = await getStarredMovies();
    const isStarred = movies.some((m) => m.id === movie.id);
    const updated = isStarred
        ? movies.filter((m) => m.id !== movie.id)
        : [...movies, movie];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return !isStarred;
}

export const isStarredMovie = async (movieId: number): Promise<boolean> => {
    const movies = await getStarredMovies();
    return movies.some((m) => m.id === movieId);
}