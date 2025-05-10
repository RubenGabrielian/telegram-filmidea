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
import Film from './pages/Film';
import { Movie, mockMovies } from './mocks/movies';

function App() {
    const { handleGiveIdea, loading } = useGiveIdea();
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<'liked' | 'watched'>('liked');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [moviesLoading, setMoviesLoading] = useState(false);
    const [useMockData, setUseMockData] = useState(false);

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
        }).catch(() => {
            setUseMockData(true);
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
                if (useMockData) {
                    // Filter mock movies based on the active tab
                    const filteredMovies = mockMovies.filter(movie => 
                        activeTab === 'liked' ? movie.user_is_liked : movie.rating
                    );
                    setMovies(filteredMovies);
                } else {
                    const endpoint = activeTab === 'liked' 
                        ? 'https://devback.filmidea.tv/api/v1/telegram/users/favorites'
                        : 'https://devback.filmidea.tv/api/v1/telegram/users/watched';
                    const response = await AxiosInstance.get(endpoint);
                    if (response.data?.data) {
                        setMovies(response.data.data);
                    } else {
                        setMovies([]);
                    }
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
                setUseMockData(true);
                // Use mock data as fallback
                const filteredMovies = mockMovies.filter(movie => 
                    activeTab === 'liked' ? movie.user_is_liked : movie.rating
                );
                setMovies(filteredMovies);
            } finally {
                setMoviesLoading(false);
            }
        };

        fetchMovies();
    }, [activeTab, useMockData]);

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
                            <MovieTabs activeTab={activeTab} onTabChange={setActiveTab} />
                            
                            <div className="welcome">
                                <div className={'flex flex-wrap justify-center'}>
                                    <h1 className={'font-bold mb-2'}>Ищете что</h1>
                                    <div>
                                        <img src={AvatarsImg} alt=""/>
                                    </div>
                                    <h1 className={'font-bold mb-2'}>посмотреть? </h1>
                                </div>
                                <Button text={'Дайте мне идею'} onclick={handleClick}/>
                            </div>

                            <div className="movies-list">
                                {moviesLoading ? (
                                    <Loading />
                                ) : movies.length > 0 ? (
                                    <div className="grid grid-cols-2 gap-4 p-4">
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
