import './film.css'
import PlayIcon from "../svgs/PlayIcon.tsx";

export default function FilmView({film}: { film: any }) {
    return (
        <div className={'film'}>
            <h1>{film?.name || film?.alternative_name}</h1>
            <div className="poster">
                <img src={film?.poster?.kp_preview_url} width={'100%'} alt=""/>
                <div className="play">
                    <PlayIcon/>
                </div>
            </div>
            <div className="info-blocks">
                <div className="info-block">
                    <span className={'rating'}>{film?.partner_ratings[0].rating}</span><span className={'partner'}>Kino Poisk</span>
                </div>
                <div className="info-block">
                    <span className={'rating'}>{film?.partner_ratings[1].rating}</span><span
                    className={'partner'}>IMDB</span>
                </div>
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
