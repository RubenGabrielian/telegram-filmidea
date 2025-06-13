import Layout from "../../components/layouts/layout.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import FilmView from "../../components/film/Film.tsx";
import axiosInstance from "../../api/axiosInstance.ts";

const Film = () => {



    const {id} = useParams();
    const [film, setFilm] = useState<any>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axiosInstance(`https://back.filmidea.tv/api/v1/films/${id}`, {
            headers: {
                "X-localization": "ru"
            }
        }).then((response) => {
            if (response) {
                setIsLoading(false);
            }
            setFilm(response.data.data);
        })
    }, [id]);


    return (
        <div>
            <Layout>
                {
                    <FilmView film={film} setFilm={setFilm} isLoading={isLoading}/>
                }
            </Layout>
        </div>
    )
}

export default Film;
