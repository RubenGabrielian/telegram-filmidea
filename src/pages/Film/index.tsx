import Layout from "../../components/layouts/layout.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import FilmView from "../../components/film/Film.tsx";
import axiosInstance from "../../api/axiosInstance.ts";

const Film = () => {

    const {id} = useParams();
    const [film, setFilm] = useState<any>();

    useEffect(() => {
        axiosInstance(`https://devback.filmidea.tv/api/v1/films/${id}`, {
            headers: {
                "X-localization": "ru"
            }
        }).then((response) => {
            console.log(response.data.data);
            setFilm(response.data.data);
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
