
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../api/axiosInstance.ts";

const useGiveIdea = () => {
    const [loading, setLoading] = useState(false);
    const [film, setFilm] = useState(null);
    const navigate = useNavigate();

    const handleGiveIdea = () => {
        setLoading(true);
        axiosInstance.get('https://devback.filmidea.tv/api/v1/films/give-me-idea', {
            headers: {
                "X-localization": "ru",
            }
        })
            .then((res) => res.json())
            .then((response) => {
                setFilm(response.data);
                navigate(`/film/${response.data.id}`);
            })
            .finally(() => {
                setLoading(false);  // Set loading to false after completion
            });
    };

    return { handleGiveIdea, loading, film };
};

export default useGiveIdea;
