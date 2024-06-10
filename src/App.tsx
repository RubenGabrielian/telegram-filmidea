import './App.css'
import Button from "./components/Button"
import {useState} from "react";
import {RotatingLines} from "react-loader-spinner";

function App() {
    const [film, setFilm] = useState();
    const [loading, setLoading] = useState(false);

    const handleGiveIdea = () => {
        setLoading(true);
        fetch('https://devback.filmidea.tv/api/v1/films/give-me-idea').then((res)=> {
            return res.json()
        }).then((response) => {
            console.log(response.data)
            setFilm(response.data)
        }).finally(()=>setLoading(false));
    }


    // @ts-ignore
    return (
        <>
            {
                loading ? (
                        <RotatingLines
                            visible={true}
                            height="96"
                            width="96"
                            color="grey"
                            strokeWidth="5"
                            animationDuration="0.75"
                            ariaLabel="rotating-lines-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                    ) : (
                    !film ? (
                        <div>
                            <h1>Welcome to Filmidea</h1>
                            <p>We can help you find your film</p>
                            <Button text={'Give me an idea'} onclick={handleGiveIdea}/>
                        </div>
                    ) : (
                        <div>
                            <h1>{film?.name || film?.alternative_name}</h1>
                            <img src={film?.poster?.kp_preview_url} width={'100%'} style={{marginBottom: 20}} alt=""/>
                            <Button text={'Give me an idea'} onclick={handleGiveIdea}/>
                        </div>
                    )
                )
            }

        </>
    )
}

export default App
