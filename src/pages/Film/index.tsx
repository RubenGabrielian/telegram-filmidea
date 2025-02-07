import Layout from "../../components/layouts/layout.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import FilmView from "../../components/film/Film.tsx";

const Film = () => {

    const {id} = useParams();
    const [film, setFilm] = useState<any>();

    useEffect(() => {
        fetch(`https://devback.filmidea.tv/api/v1/films/${id}`, {
            headers: {
                "X-localization": "ru"
            }
        }).then((res) => {
            return res.json()
        }).then((response) => {
            console.log(response.data);
            setFilm(response.data);
        })
    }, [id]);

    return (
        <div>
            <Layout>
                {
                    film ? <FilmView film={film} setFilm={setFilm} /> : null
                }
            </Layout>
        </div>
    )
}

export default Film;
