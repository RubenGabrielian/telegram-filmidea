export interface Movie {
    id: number;
    name: string;
    alternative_name?: string;
    description: string;
    movie_length: number;
    poster: {
        kp_preview_url: string;
    };
    genres: Array<{
        name: string;
    }>;
    user_is_liked: boolean;
    rating?: string;
}

export const mockMovies: Movie[] = [
    {
        id: 1,
        name: "Inception",
        description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        movie_length: 148,
        poster: {
            kp_preview_url: "https://avatars.mds.yandex.net/get-kinopoisk-image/4779961/7c9c55a6-3b1b-45fd-a8d5-88f8b6fd1d1d/300x450"
        },
        genres: [
            { name: "Sci-Fi" },
            { name: "Action" }
        ],
        user_is_liked: true,
        rating: "excellent"
    },
    {
        id: 2,
        name: "The Shawshank Redemption",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        movie_length: 142,
        poster: {
            kp_preview_url: "https://avatars.mds.yandex.net/get-kinopoisk-image/4779961/7c9c55a6-3b1b-45fd-a8d5-88f8b6fd1d1d/300x450"
        },
        genres: [
            { name: "Drama" }
        ],
        user_is_liked: true,
        rating: "good"
    },
    {
        id: 3,
        name: "The Dark Knight",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        movie_length: 152,
        poster: {
            kp_preview_url: "https://avatars.mds.yandex.net/get-kinopoisk-image/4779961/7c9c55a6-3b1b-45fd-a8d5-88f8b6fd1d1d/300x450"
        },
        genres: [
            { name: "Action" },
            { name: "Crime" },
            { name: "Drama" }
        ],
        user_is_liked: false,
        rating: "normal"
    },
    {
        id: 4,
        name: "Pulp Fiction",
        description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        movie_length: 154,
        poster: {
            kp_preview_url: "https://avatars.mds.yandex.net/get-kinopoisk-image/4779961/7c9c55a6-3b1b-45fd-a8d5-88f8b6fd1d1d/300x450"
        },
        genres: [
            { name: "Crime" },
            { name: "Drama" }
        ],
        user_is_liked: true,
        rating: "excellent"
    },
    {
        id: 5,
        name: "Forrest Gump",
        description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
        movie_length: 142,
        poster: {
            kp_preview_url: "https://avatars.mds.yandex.net/get-kinopoisk-image/4779961/7c9c55a6-3b1b-45fd-a8d5-88f8b6fd1d1d/300x450"
        },
        genres: [
            { name: "Drama" },
            { name: "Romance" }
        ],
        user_is_liked: false,
        rating: "good"
    }
]; 