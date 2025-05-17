import bg from "../../assets/gradient.png";
import logo from "../../assets/logo.svg"
import CloseIcon from "../svgs/CloseIcon.tsx";
import {useEffect, useState} from "react";
import axiosInstance from "../../api/axiosInstance.ts";
import Loading from "../Loading";
import useGiveIdea from "../../hooks/useGiveIdea.tsx";
import GiveMeIdeaIcon from "../svgs/GiveMeIdeaIcon.tsx";
import useDebounce from "../../hooks/useDebounce.tsx";
import MoviePlaceholderIcon from '../svgs/MoviePlaceholderIcon';

interface Category {
    id: number,
    background: string,
    name: string
}

interface Movie {
    id: number,
    alternative_name: string
    poster: string
}

export default function SearchModal({isOpen, setOpen}: { isOpen: boolean, setOpen: (isOpen: boolean) => void }) {

    const [categories, setCategories] = useState([]);
    const {handleGiveIdea, loading} = useGiveIdea();
    const [query, setQuery] = useState<string>();
    const debouncedSearchTerm = useDebounce(query, 400);
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        if (debouncedSearchTerm) {
            axiosInstance.get(`/films/search?query=${query}`).then((r) => {
                setSearchResult(r.data.data);
            })
        }
    }, [debouncedSearchTerm]);


    useEffect(() => {
        if (isOpen) {
            axiosInstance.get('/genres/search').then((r) => {
                setCategories(r.data.data);
            })
        }
    }, [isOpen]);

    const handleGiveMeIdeaByGenre = (id?: number) => {
        handleGiveIdea(id);
    }

    useEffect(() => {
        if (loading) {
            setOpen(false)
        }
    }, [loading]);

    // @ts-ignore
    return (
        <div>
            {
                isOpen ? (
                    <div style={{backgroundImage: `url(${bg})`, backgroundColor: 'black'}}
                         className={'w-full h-lvh fixed top-0'}>
                        <img src={logo} className="mt-5 relative left-[50%] translate-x-[-50%] mb-4" alt=""/>
                        <div className="relative w-[80%] max-w-sm top-3 left-[50%] translate-x-[-50%]">
                            <input type="text" placeholder="Поиск..."
                                   className="w-full pl-10 pr-3 py-2
                                   border border-gray-300 rounded-xl bg-transparent text-sm
                                   focus:ring-0 focus:border-[#febb12] focus:outline-none"
                                   onChange={(e) => setQuery(e.target.value)}
                            />
                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"/>
                            </svg>
                        </div>
                        <div className="absolute top-3 right-3" onClick={() => setOpen(false)}>
                            <CloseIcon/>
                        </div>

                        <div
                            className={'flex flex-wrap justify-center container mx-auto px-10 mt-10 overflow-auto max-h-[80vh]'}>
                            {
                                !searchResult.length ? (
                                    <div
                                        className="relative mb-5 h-[200px] w-full flex items-center justify-center rounded-2xl"
                                        onClick={() => handleGiveMeIdeaByGenre()}>
                                        <GiveMeIdeaIcon/>
                                    </div>
                                ) : null
                            }
                            {
                                searchResult.length ? (
                                    <div className="grid grid-cols-2 gap-4 w-full">
                                        {
                                            searchResult?.map((movie: Movie) => (
                                                <div key={movie.id} className="search-result-item">
                                                    <a href={`/film/${movie?.id}`}>
                                                        {movie.poster ? (
                                                            <img 
                                                                src={movie.poster} 
                                                                alt={movie.alternative_name} 
                                                                className='w-full h-[200px] rounded-2xl object-cover'
                                                            />
                                                        ) : (
                                                            <div className="w-full aspect-[2/3] rounded-2xl bg-[#181818] flex items-center justify-center">
                                                                <MoviePlaceholderIcon className="w-[54px] h-[76px]" />
                                                            </div>
                                                        )}
                                                    </a>
                                                </div>
                                            ))
                                        }
                                    </div>
                                ) : categories.length ? (
                                    categories.map((item: Category) => (
                                        <div key={item?.id} className="relative mb-5 w-full"
                                             onClick={() => handleGiveMeIdeaByGenre(item.id)}>
                                            <div 
                                                className="w-full h-[200px] rounded-lg bg-cover bg-center bg-no-repeat"
                                                style={{
                                                    backgroundImage: `url(${item.background})`,
                                                    backgroundColor: '#181818'
                                                }}
                                            />
                                            <h4 className="absolute bottom-4 left-3 text-2xl">{item.name}</h4>
                                        </div>
                                    ))
                                ) : <Loading/>
                            }
                        </div>
                    </div>
                ) : null
            }
            {
                loading ? <div className={'loading'}>
                    <Loading/>
                </div> : null
            }
        </div>
    )
}
