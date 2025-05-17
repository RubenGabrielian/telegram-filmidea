import './App.css'
import './styles/theme.css'
import Button from "./components/Button"
import Header from "./components/layouts/header.tsx";
import Footer from "./components/layouts/footer.tsx";
import useGiveIdea from "./hooks/useGiveIdea.tsx";
import AvatarsImg from "./assets/home-avatars.png"
import {useEffect, useState} from "react";
import AxiosInstance from "./api/axiosInstance.ts";
import WebApp from "@twa-dev/sdk";
import {SECRET} from "./consts.ts";
import {sha512} from "js-sha512";
import {useNavigate, useLocation} from "react-router-dom";
import Loading from './components/Loading/index.tsx';
import MovieTabs from './components/tabs/MovieTabs';

interface Movie {
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

function App() {
    const { handleGiveIdea, loading } = useGiveIdea();
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<'liked' | 'watched'>('liked');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [moviesLoading, setMoviesLoading] = useState(false);

    useEffect(() => {
        // Handle theme
        const setTheme = () => {
            const theme = WebApp.colorScheme;
            document.documentElement.setAttribute('data-theme', theme);
        };

        // Set initial theme
        setTheme();

        // Listen for theme changes
        WebApp.onEvent('themeChanged', setTheme);

        // Handle start param and auth
        const startParam = WebApp.initDataUnsafe?.start_param;
        if(startParam && location.pathname === '/') {
            navigate(`/film/${startParam}`, { replace: true });
        }

        const user = WebApp?.initDataUnsafe?.user || {id: 1, first_name: 'Gago', last_name: 'Gagikyan'};
        const connectedString = user?.id + user?.first_name + user?.last_name + SECRET;
        const hash = sha512(connectedString);
        AxiosInstance.post('auth/telegram',{
            id: user?.id,
            first_name: user?.first_name,
            last_name: user?.last_name,
            username: user?.username,
            hash
        }).then((res) => {
            localStorage.setItem('authToken', res.data?.data?.token);
        });

        // Set up Telegram WebApp
        WebApp.ready();
        WebApp.expand();
        WebApp.enableClosingConfirmation();

        // Cleanup
        return () => {
            WebApp.offEvent('themeChanged', setTheme);
        };
    }, [location.pathname]);

    useEffect(() => {
        const fetchMovies = async () => {
            setMoviesLoading(true);
            try {
                const endpoint = activeTab === 'liked' 
                    ? 'https://devback.filmidea.tv/api/v1/telegram/users/favorites'
                    : 'https://devback.filmidea.tv/api/v1/telegram/users/watched';
                const response = await AxiosInstance.get(endpoint);
                setMovies(activeTab === 'liked' 
                    ? response?.data?.data || []
                    : response?.data?.data?.data || []
                );
            } catch (error) {
                console.error('Error fetching movies:', error);
                setMovies([]);
            } finally {
                setMoviesLoading(false);
            }
        };

        fetchMovies();
    }, [activeTab]);

    const handleClick = () => {
        handleGiveIdea()
    }

    return (
        <div className={'main'}>
            <Header/>
            {
                loading ? (
                    <Loading />
                ) : (
                    <>
                        <div className="content-wrapper">
                            <div className="welcome">
                                <div className={'flex flex-wrap justify-center'}>
                                    <h1 className={'font-bold mb-2'}>Ищете что</h1>
                                    <div>
                                        <img src={AvatarsImg} alt=""/>
                                    </div>
                                    <h1 className={'font-bold mb-5'}>посмотреть? </h1>
                                </div>
                                <Button text={'Дайте мне идею'} onclick={handleClick}/>
                            </div>
                            <div className='movies-tabs-wrapper'>
                                <MovieTabs activeTab={activeTab} onTabChange={setActiveTab} />
                            </div>

                            <div className="movies-list">
                                {moviesLoading ? (
                                    <Loading />
                                ) : movies.length > 0 ? (
                                    <div className="grid">
                                        {movies.map((movie) => (
                                            <div 
                                                key={movie.id} 
                                                className="movie-card"
                                                onClick={() => navigate(`/film/${movie.id}`)}
                                            >
                                                <img 
                                                    src={movie.poster?.kp_preview_url} 
                                                    alt={movie.name}
                                                    className="w-full h-auto rounded-lg"
                                                />
                                                <h3 className="text-sm font-medium mt-2 line-clamp-2">
                                                    {movie.name || movie.alternative_name}
                                                </h3>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center p-8 text-gray-500">
                                        No {activeTab} movies yet
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )
            }
            <Footer/>
        </div>
    )
}

export default App
