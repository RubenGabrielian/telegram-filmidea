
import { useState } from 'react';

const useGiveIdea = () => {
    const [loading, setLoading] = useState(false);
    const [film, setFilm] = useState(null);

    const handleGiveIdea = () => {
        setLoading(true);
        fetch('https://devback.filmidea.tv/api/v1/films/give-me-idea', {
            headers: {
                "X-localization": "ru"
            }
        })
            .then((res) => res.json())
            .then((response) => {
                setFilm(response.data);
                window.location.href =`/film/${response.data.id}`
                // navigate(`/film/${response.data.id}`);
            })
            .finally(() => {
                setLoading(false);  // Set loading to false after completion
            });
    };

    return { handleGiveIdea, loading, film };
};

export default useGiveIdea;
