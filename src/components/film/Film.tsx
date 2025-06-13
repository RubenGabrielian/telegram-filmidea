import './film.css'
import PlayIcon from "../svgs/PlayIcon.tsx";
import BookmarkIcon from "../svgs/BookmarkIcon.tsx";
import ShareIcon from "../svgs/ShareIcon.tsx";
import Emoji1 from "../../assets/emoji1.svg";
import Emoji2 from "../../assets/emoji2.svg";
import Emoji3 from "../../assets/emoji3.svg";
import Emoji4 from "../../assets/emoji4.svg";
import axiosInstance from "../../api/axiosInstance.ts";
import {useEffect, useState} from "react";
import CloseIcon from "../svgs/CloseIcon.tsx";
import Loading from "../Loading";
import MoviePlaceholderIcon from '../svgs/MoviePlaceholderIcon';

export default function FilmView({film, setFilm, isLoading}: { film: any, setFilm: any, isLoading: boolean }) {
    const [iframe, setIframe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentFilm, setCurrentFilm] = useState<any>(null);

    const miniAppURL = `https://t.me/filmidea_bot?startapp=${film?.id}`

    useEffect(() => {
        if (!film) {
            setLoading(true);
            setCurrentFilm(null);
            return;
        }

        // Only show loading if the film ID changed (new film loaded)
        // Not when just the bookmark status changes
        if (!currentFilm || currentFilm.id !== film.id) {
            setLoading(true);
            setCurrentFilm(null);

            const timer = setTimeout(() => {
                setCurrentFilm(film);
                setLoading(false);
            }, 1000);

            return () => clearTimeout(timer);
        } else {
            // Just update the current film without loading for bookmark changes
            setCurrentFilm(film);
        }
    }, [film]);

    const handlePlay = () => {
        setLoading(true);
        axiosInstance.get(`/films/${film.id}/iframe`).then((r)=>{
            console.log(r.data.data.url)
            setIframe(r.data.data.url);
        }).finally(() => {
            setLoading(false);
        })
    }

    const handleBookmark = () => {
        // Update UI immediately
        const updatedFilm = {
            ...film,
            is_default_watchlist: !film?.is_default_watchlist
        };
        setFilm(updatedFilm);

        // Make API call in background
        axiosInstance.post(`/telegram/films/${film.id}/default/watchlist`).then((res) => {
            if(!res.data.success) {
                // Revert if request failed
                setFilm(film);
            }
        }).catch(() => {
            // Revert if request failed
            setFilm(film);
        });
    }

    const handleRate = (type: string) => {
        const updatedFilm = {
            ...film,
            rating: type
        };
        setFilm(updatedFilm);

        axiosInstance.post(`/telegram/films/${film.id}/rate`, {
            type
        }).then((res) => {
            if(!res.data.success) {
                setFilm(film);
            }
        }).catch(() => {
            setFilm(film);
        });
    }

    const getEmojiClass = (type: string) => {
        return `emoji ${film?.rating === type ? 'active' : ''}`;
    }

    return (
        <div className={'film container px-6 pb-[120px] relative font-sans'}>
            {(isLoading || loading) && (
                <div className="fixed inset-0 bg-black h-full z-50 flex items-center justify-center">
                    <Loading />
                </div>
            )}
            {iframe && (
                <div className={'iframe-modal'}>
                    <div className="close" onClick={()=>setIframe(null)}>
                        <CloseIcon />
                    </div>
                    <iframe src={iframe} frameBorder="0"></iframe>
                </div>
            )}
            {currentFilm && !loading && (
                <>
                    <h1 className={'text-xl font-bold mb-1 pb-0'}>{currentFilm?.name || currentFilm?.alternative_name}</h1>
                    <div className="genres flex  mb-3 flex-wrap">
                        {
                            currentFilm?.genres?.map((genre: any, index: number) => (
                                <div key={index} className={'genre text-[#B3BBC4]'}>{genre.name}</div>
                            ))
                        }
                        <div className={'genre text-[#B3BBC4]'}>{currentFilm?.movie_length} мин.</div>
                    </div>
                    <div className="poster">
                        {currentFilm?.poster?.kp_preview_url ? (
                            <img 
                                src={currentFilm.poster.kp_preview_url} 
                                alt={currentFilm.name || currentFilm.alternative_name}
                            />
                        ) : (
                            <div className="w-full h-full bg-[#181818] flex items-center justify-center">
                                <MoviePlaceholderIcon className="w-[54px] h-[76px]" />
                            </div>
                        )}
                        <div className="play" onClick={handlePlay}>
                            <PlayIcon/>
                        </div>
                    </div>

 
                    <div className="actions">
                        <div className="action-btn" onClick={handleBookmark}>
                            <BookmarkIcon active={!!currentFilm?.is_default_watchlist} className="w-8 h-8" />
                        </div>
                        <div className="action-btn">
                            <a
                                href={`https://t.me/share/url?url=${encodeURIComponent(miniAppURL)}&text=${encodeURIComponent(
                                    `🎬 Рекомендую посмотреть этот фильм!\n\n Выбери, где смотреть ⬇️ \n\n` +
                                    `📌 Открыть в Telegram:\n ${miniAppURL}\n` +
                                    `🌐 Смотреть в браузере: \n https://filmidea.tv/ru/movie/${currentFilm?.id}\n\n` +
                                    `Приятного просмотра! 🍿`
                                )}`}
                            >
                                <ShareIcon />
                            </a>
                        </div>
                    </div>
                    <div className="emojies mb-4 flex items-center justify-between">
                        <div className={getEmojiClass('bad')} onClick={() => handleRate('bad')}>
                            <img src={Emoji1} alt=""/>
                        </div>
                        <div className={getEmojiClass('normal')} onClick={() => handleRate('normal')}>
                            <img src={Emoji2} alt=""/>
                        </div>
                        <div className={getEmojiClass('good')} onClick={() => handleRate('good')}>
                            <img src={Emoji3} alt=""/>
                        </div>
                        <div className={getEmojiClass('excellent')} onClick={() => handleRate('excellent')}>
                            <img src={Emoji4} alt=""/>
                        </div>
                    </div>
                    {currentFilm?.partner_ratings && currentFilm.partner_ratings.length > 0 && (
                        <div className="info-blocks mt-3">
                            {currentFilm.partner_ratings[0] && (
                                <div className="info-block">
                                    <div className="rating text-white text-xl">
                                        {currentFilm.partner_ratings[0].rating}
                                        <span className="partner text-[#8E9BA7] ml-1">/10</span>
                                    </div>
                                    <div className="text-[#8E9BA7] text-sm mt-1">Кинопоиск</div>
                                </div>
                            )}
                            {currentFilm.partner_ratings[1] && (
                                <div className="info-block">
                                    <div className="rating text-white text-xl">
                                        {currentFilm.partner_ratings[1].rating}
                                        <span className="partner text-[#8E9BA7] ml-1">/10</span>
                                    </div>
                                    <div className="text-[#8E9BA7] text-sm mt-1">IMDb</div>
                                </div>
                            )}
                        </div>
                    )}

                    {
                        currentFilm?.description && (
                            <div className="description bg-[#0F1017] p-4  rounded-md">
                                <p className={'mb-3'}>
                                    <b className='text-white'>Описание</b>
                                </p>
                                <p className={'text-[#8E9BA7]'}>{currentFilm?.description}</p>
                            </div>
                        )
                    }
                </>
            )}
        </div>
    )
}
