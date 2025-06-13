import {useState} from 'react';
import axiosInstance from "../api/axiosInstance.ts";

const useGiveIdea = () => {
    const [loading, setLoading] = useState(false);
    const [film, setFilm] = useState(null);

    const handleGiveIdea = async (id?: number) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`https://back.filmidea.tv/api/v1/films/give-me-idea?${id ?  `genre_id=${id}` : null}`, {
                headers: {
                    "X-localization": "ru",
                }
            });
            setFilm(response.data.data);
            return response.data.data;
        } finally {
            setLoading(false);
        }
    };

    return {handleGiveIdea, loading, film};
};

export default useGiveIdea;
