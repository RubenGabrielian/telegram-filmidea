import './App.css'
import Button from "./components/Button"
import {useState} from "react";
import {RotatingLines} from "react-loader-spinner";
import FilmView from "./components/film/Film.tsx";
import bg from "./assets/bg.png"
import Header from "./components/layouts/header.tsx";
import Footer from "./components/layouts/footer.tsx";

interface Film {
    name: string;
    alternative_name: string;
    poster: any;
}

function App() {
    const [film, setFilm] = useState<Film>();
    const [loading, setLoading] = useState(false);

    const handleGiveIdea = () => {
        setLoading(true);
        fetch('https://devback.filmidea.tv/api/v1/films/give-me-idea', {
            headers: {
                "X-localization": "ru"
            }
        }).then((res) => {
            return res.json()
        }).then((response) => {
            console.log(response.data)
            setFilm(response.data)
        }).finally(() => setLoading(false));
    }


    return (
        <div className={'main'} style={{backgroundImage: `url(${bg})`}}>
            <Header/>
            {
                loading ? (
                    <div className="loading">
                        <RotatingLines
                            visible={true}
                            width="96"
                            strokeWidth="5"
                            animationDuration="0.75"
                            ariaLabel="rotating-lines-loading"
                        />
                    </div>
                ) : (
                    !film ? (
                        <div className={'welcome'}>
                            <h1>Welcome to Filmidea</h1>
                            <p>We can help you find your film</p>
                            <Button text={'Give me an idea'} onclick={handleGiveIdea}/>
                        </div>
                    ) : (
                        <div className={'welcome'}>
                            <FilmView film={film} />
                            <Button text={'Give me an idea'} onclick={handleGiveIdea}/>
                        </div>
                    )
                )
            }
            <Footer/>

        </div>
    )
}

export default App
