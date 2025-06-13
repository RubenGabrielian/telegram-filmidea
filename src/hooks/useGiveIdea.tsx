import {useState} from 'react';
import axiosInstance from "../api/axiosInstance.ts";
import vercelSound from '../assets/vercel.mp3';

const useGiveIdea = () => {
    const [loading, setLoading] = useState(false);

    const playSound = () => {
        const audio = new Audio(vercelSound);
        audio.play().catch(console.error);
    };

    const handleGiveIdea = async (genreId?: number) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`https://back.filmidea.tv/api/v1/films/give-me-idea?${genreId ?  `genre_id=${genreId}` : ''}`, {
                headers: {
                    "X-localization": "ru",
                }
            });
            const film = response?.data?.data;
            if (film?.id) {
                playSound();
                window.location.href = `/film/${film.id}`;
            }
            return film;
        } catch (error) {
            console.error('Error giving idea:', error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { handleGiveIdea, loading };
};

export default useGiveIdea;
