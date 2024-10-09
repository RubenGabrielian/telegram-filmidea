import './App.css'
import Button from "./components/Button"
import {RotatingLines} from "react-loader-spinner";
import Header from "./components/layouts/header.tsx";
import Footer from "./components/layouts/footer.tsx";
import useGiveIdea from "./hooks/useGiveIdea.tsx";
import AvatarsImg from "./assets/home-avatars.png"
import {useEffect} from "react";
import AxiosInstance from "./api/axiosInstance.ts";
import WebApp from "@twa-dev/sdk";

function App() {
    const { handleGiveIdea, loading } = useGiveIdea();

    useEffect(() => {
        console.log(WebApp?.initDataUnsafe?.user);
        AxiosInstance.post('auth/telegram').then((res) => {
            console.log(res)
        })
    }, []);

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
                            <div className={'flex flex-wrap justify-center'}>
                                <h1 className={'font-bold mb-2'}>Ищете что</h1>
                                <div>
                                    <img src={AvatarsImg} alt=""/>
                                </div>
                                <h1 className={'font-bold mb-2'}>посмотреть? </h1>
                            </div>
                            <Button text={'Дайте мне идею'} onclick={handleGiveIdea}/>
                        </div>
                    </>
                )
            }
            <Footer/>

        </div>
    )
}

export default App
