import './film.css'
import PlayIcon from "../svgs/PlayIcon.tsx";
import LikeIcon from "../Loading/LikeIcon.tsx";
import ShareIcon from "../svgs/ShareIcon.tsx";
import Emoji1 from "../../assets/emoji1.svg";
import Emoji2 from "../../assets/emoji2.svg";
import Emoji3 from "../../assets/emoji3.svg";
import Emoji4 from "../../assets/emoji4.svg";

export default function FilmView({film}: { film: any }) {
    return (
        <div className={'film container px-6'}>
            <h1 className={'text-xl font-bold mb-1 pb-0'}>{film?.name || film?.alternative_name}</h1>
           <div className="genres flex gap-3 mb-3 flex-wrap">
               {
                   film?.genres?.map((genre, index) => (
                       <div className={'genre text-[#B3BBC4]'}>{genre.name}</div>
                   ))
               }
               <div className={'genre text-[#B3BBC4]'}>{film?.movie_length} min</div>
           </div>
            <div className="poster">
                <img src={film?.poster?.kp_preview_url} width={'100%'} alt=""/>
                <a href={`https://www.filmidea.tv/ru/movie/${film.id}`}>
                    <div className="play">
                        <PlayIcon/>
                    </div>
                </a>
            </div>
            <div className="actions">
                <div className="like action-btn">
                    <LikeIcon/>
                </div>
                <div className="share action-btn">
                    <ShareIcon />
                </div>
            </div>
            <div className="emojies flex items-center justify-between">
                <div className={'emoji'}>
                    <img src={Emoji1} alt=""/>
                </div>
                <div className={'emoji'}>
                    <img src={Emoji2} alt=""/>
                </div>
                <div className={'emoji'}>
                    <img src={Emoji3} alt=""/>
                </div>
                <div className={'emoji'}>
                    <img src={Emoji4} alt=""/>
                </div>
            </div>
            <div className="info-blocks my-3">
                {/*<div className="info-block">*/}
                {/*    <span className={'rating'}>{film?.partner_ratings[0].rating}</span><span className={'partner'}>Kino Poisk</span>*/}
                {/*</div>*/}
                {/*<div className="info-block">*/}
                {/*    <span className={'rating'}>{film?.partner_ratings[1].rating}</span><span*/}
                {/*    className={'partner'}>IMDB</span>*/}
                {/*</div>*/}
            </div>
            <div className="description">
                <p>
                    <b>Description:</b>
                </p>
                <p>{film?.description}</p>
            </div>

        </div>
    )
}
