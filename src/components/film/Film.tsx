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
    const [loading, setLoading] = useState(false);
    const [isChanging, setIsChanging] = useState(false);
    const [prevFilmId, setPrevFilmId] = useState<number | null>(null);

    const miniAppURL = `https://t.me/filmidea_bot?startapp=${film?.id}`

    useEffect(() => {
        if(!film) {
            setLoading(true);
        } else {
            setLoading(false);
            // Check if film ID has changed
            if (prevFilmId !== film.id) {
                setIsChanging(true);
                setPrevFilmId(film.id);
                // Short timeout to ensure smooth transition
                setTimeout(() => {
                    setIsChanging(false);
                }, 150);
            }
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
        axiosInstance.post(`/telegram/films/${film.id}/default/watchlist`).then((res) => {
            if(res.data.success) {
                const updatedFilm = {
                    ...film,
                    is_default_watchlist: !film?.is_default_watchlist
                };

                setFilm(updatedFilm);
            }
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
            {
                (isLoading || (isChanging && !film)) ? (
                    <div className="fixed inset-0 bg-black h-full z-50 flex items-center justify-center">
                        <Loading />
                    </div>
                ) : null
            }
            {
                iframe ? (
                    <div className={'iframe-modal'}>
                        <div className="close" onClick={()=>setIframe(null)}>
                            <CloseIcon />
                        </div>
                        <iframe src={iframe} frameBorder="0"></iframe>
                    </div>
                ) : null
            }
            {
                loading && (
                    <div className="fixed inset-0 bg-black z-50 flex h-full items-center justify-center">
                        <Loading />
                    </div>
                )
            }
            {film && (
                <>
                    <h1 className={'text-xl font-bold mb-1 pb-0'}>{film?.name || film?.alternative_name}</h1>
                    <div className="genres flex gap-3 mb-3 flex-wrap">
                        {
                            // @ts-ignore
                            film?.genres?.map((genre, index) => (
                                <div key={index} className={'genre text-[#B3BBC4]'}>{genre.name}</div>
                            ))
                        }
                        <div className={'genre text-[#B3BBC4]'}>{film?.movie_length} мин.</div>
                    </div>
                    <div className="poster">
                        {film?.poster?.kp_preview_url ? (
                            <img 
                                src={film.poster.kp_preview_url} 
                                alt={film.name || film.alternative_name}
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
                        <div className="like action-btn" onClick={handleBookmark}>
                            <BookmarkIcon active={!!film?.is_default_watchlist}/>
                        </div>
                        <div className="share action-btn">
                            <a
                                className="decoration-0"
                                href={`https://t.me/share/url?url=${encodeURIComponent(miniAppURL)}&text=${encodeURIComponent('Check out this Film!')}`}
                            >
                                <ShareIcon/>
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
                    {
                        film?.description && (
                            <div className="description bg-[#0F1017] p-4 mt-9 rounded-md">
                            <p className={'mb-3'}>
                                <b className='text-white'>Описание</b>
                            </p>
                            <p className={'text-[#8E9BA7]'}>{film?.description}</p>
                        </div>
                        )
                    }
                </>
            )}
        </div>
    )
}
