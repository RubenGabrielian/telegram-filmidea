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
import MoviePlaceholderIcon from './components/svgs/MoviePlaceholderIcon';

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
    const { handleGiveIdea, loading: giveIdeaLoading } = useGiveIdea();
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<'watchlist' | 'watched'>('watchlist');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [moviesLoading, setMoviesLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);


    useEffect(() => {
        const startParam = WebApp.initDataUnsafe?.start_param;
        const authDate = (WebApp.initDataUnsafe as { auth_date?: number })?.auth_date;
        const lastSession = localStorage.getItem('lastSession');
    
        // New session detected, clear previous startParam
        if (authDate && lastSession !== String(authDate)) {
          localStorage.removeItem('usedStartParam');
          localStorage.setItem('lastSession', String(authDate));
        }
    
        const usedStartParam = localStorage.getItem('usedStartParam');
        console.log('startParam', startParam);
    
        if (startParam && !usedStartParam) {
          navigate(`/film/${startParam}`);
          localStorage.setItem('usedStartParam', startParam);
    
          // Remove param from URL to avoid issues on back navigation
          const newUrl = window.location.pathname;
          window.history.replaceState({}, '', newUrl);
        }
      }, [navigate]);

      
    const handleClose = () => {
        console.log('close');
        localStorage.removeItem('usedStartParam');
    };
    WebApp.onEvent('close', handleClose);

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

        // Clear localStorage when app is closed


        // Handle start param and auth
        // const startParam = WebApp.initDataUnsafe?.start_param;
        // if(startParam) {
        //     console.log('Opening from deep link, start_param:', startParam);
        //     // First navigate to the film
        //     navigate(`/film/${startParam}`, { replace: false });
        //     console.log('Current route after navigation:', `/film/${startParam}`);
            
        //     // After a short delay, clear the start_param
        //     setTimeout(() => {
        //         // Remove start_param from URL without triggering a reload
        //         const newUrl = window.location.pathname + window.location.search.replace(/[?&]startapp=[^&]+/, '');
        //         window.history.replaceState({}, '', newUrl);
        //     }, 1000);
        // }

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
            WebApp.offEvent('close', handleClose);
        };
    }, [location.pathname]);

    useEffect(() => {
        // Reset pagination when tab changes
        setCurrentPage(1);
        setMovies([]);
        setHasMore(true);
        // Reset scroll position to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Trigger immediate fetch for the new tab
        setMoviesLoading(true);
        const endpoint = activeTab === 'watchlist' 
            ? `https://back.filmidea.tv/api/v1/telegram/default/watchlist?page=1`
            : `https://back.filmidea.tv/api/v1/telegram/users/watched?page=1`;
        
        AxiosInstance.get(endpoint).then((response) => {
            const newMovies = response?.data?.data?.data || [];
            setMovies(newMovies);
            setHasMore(newMovies.length > 0);
        }).catch((error) => {
            console.error('Error fetching movies:', error);
            setMovies([]);
            setHasMore(false);
        }).finally(() => {
            setMoviesLoading(false);
        });
    }, [activeTab]);

    useEffect(() => {
        const fetchMovies = async (page: number) => {
            if (!hasMore || moviesLoading || page === 1) return; // Skip if it's page 1 (handled by tab change)
            
            setMoviesLoading(true);
            try {
                const endpoint = activeTab === 'watchlist' 
                    ? `https://back.filmidea.tv/api/v1/telegram/default/watchlist?page=${currentPage}`
                    : `https://back.filmidea.tv/api/v1/telegram/users/watched?page=${currentPage}`;
                
                const response = await AxiosInstance.get(endpoint);
                const newMovies = response?.data?.data?.data || [];
                const lastPage = response?.data?.data?.meta?.last_page || 1;

                // For both tabs, append new movies and check if there are more
                setMovies(prev => [...prev, ...newMovies]);
                setHasMore(page < lastPage);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setHasMore(false);
            } finally {
                setMoviesLoading(false);
            }
        };

        fetchMovies(currentPage);
    }, [activeTab, currentPage]);

    // Update scroll handler to work for both tabs
    useEffect(() => {
        const handleScroll = () => {
            if (!hasMore || moviesLoading) return;

            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const clientHeight = document.documentElement.clientHeight;

            // Load more when user is near the bottom (within 100px)
            if (scrollHeight - scrollTop - clientHeight < 100) {
                setCurrentPage(prev => prev + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore, moviesLoading]);

    const handleClick = async () => {
        setIsTransitioning(true); // Show loading immediately
        const film = await handleGiveIdea();
        if (film?.id) {
            // Hard reload to the new film page
            window.location.href = `/film/${film.id}`;
        } else {
            setIsTransitioning(false); // Reset if no film was found
        }
    }

    return (
        <div className={'main'}>
            <Header/>
            {
                (giveIdeaLoading || isTransitioning) ? (
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
                                {moviesLoading && currentPage === 1 ? (
                                    <Loading />
                                ) : movies.length > 0 ? (
                                    <div className="grid grid-home">
                                        {movies.map((movie) => (
                                            <div 
                                                key={movie.id} 
                                                className="movie-card"
                                                onClick={() => navigate(`/film/${movie.id}`)}
                                            >
                                                {movie.poster?.kp_preview_url ? (
                                                    <img 
                                                        src={movie.poster.kp_preview_url} 
                                                        alt={movie.name}
                                                        className="w-full h-auto rounded-lg"
                                                    />
                                                ) : (
                                                    <div className="w-full aspect-[2/3] rounded-lg bg-[#181818] flex items-center justify-center">
                                                        <MoviePlaceholderIcon className="w-[54px] h-[76px]" />
                                                    </div>
                                                )}
                                                <h3 className="text-[15px] font-medium mt-2 line-clamp-2">
                                                    {movie.name || movie.alternative_name}
                                                </h3>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center p-8 text-gray-500">
                                        {
                                            activeTab === 'watchlist' ? (
                                                'Добавляйте фильмы в закладки, чтобы они появились здесь.'
                                            ) : (
                                                'Здесь появятся просмотренные вами фильмы.'
                                            )
                                        }
                                    </div>
                                )}
                                {moviesLoading && currentPage > 1 && (
                                    <div className="flex justify-center items-center h-[60px]">
                                       <div className="loading-circle">
                                            <div className="loading-circle-inner"></div>
                                        </div>
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
