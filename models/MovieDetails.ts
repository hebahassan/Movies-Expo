export interface MovieDetails {
    title: string;
    poster_path: string;
    overview: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    genres: Genre[];
    budget: number;
}

interface Genre {
    id: number;
    name: string;
}