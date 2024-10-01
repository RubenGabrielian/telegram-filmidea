import './App.css'
import Button from "./components/Button"
import {useState} from "react";
import {RotatingLines} from "react-loader-spinner";
import Header from "./components/layouts/header.tsx";
import Footer from "./components/layouts/footer.tsx";
import {useNavigate} from "react-router-dom";

interface Film {
    name: string;
    alternative_name: string;
    poster: any;
}

function App() {
    const [film, setFilm] = useState<Film>();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
            navigate(`/film/${response.data.id}`)
        });
    }


    return (
        <div className={'main'} style={{backgroundColor: `black`}}>
            <Header/>
            {
                loading ? (
                    <div className="loading">
                        <RotatingLines
                            visible={true}
                            width="96"
                            strokeWidth="2"
                            animationDuration="0.75"
                            ariaLabel="rotating-lines-loading"
                            strokeColor={'white'}
                        />
                    </div>
                ) : (
                    <>
                        <div className={'welcome'}>
                            <h1 className={'font-bold mb-2'}>Welcome to Filmidea</h1>
                            <p className={'mb-2'}>We can help you find your film</p>
                            <Button text={'Give me an idea'} onclick={handleGiveIdea}/>
                        </div>
                        {
                            film ? <p></p> : ''
                        }
                    </>
                )
            }
            <Footer/>

        </div>
    )
}

export default App
