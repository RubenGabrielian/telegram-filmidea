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
import {SECRET} from "./consts.ts";
import {sha512} from "js-sha512";
import {useNavigate} from "react-router-dom";

function App() {
    const { handleGiveIdea, loading } = useGiveIdea();
    const navigate = useNavigate();

    useEffect(() => {
        if(WebApp.initDataUnsafe?.start_param) {
            navigate(`/film/${WebApp.initDataUnsafe?.start_param}`);
        }
        const user = WebApp?.initDataUnsafe?.user || {id: 1, first_name: 'Gago', last_name: 'Gagikyan'};
        const connectedString = user?.id + user?.first_name + user?.last_name + SECRET;
        const hash = sha512(connectedString);
        AxiosInstance.post('auth/telegram',{
            id: user?.id,
            first_name: user?.first_name,
            last_name: user?.last_name,
            username: user?.username,
            hash
        }).then((res) => {
            localStorage.setItem('authToken', res.data?.data?.token);

        })
    }, []);

    const handleShowAd = () => {
        // @ts-ignore
        if (typeof show_9073777 === "function") {
            // @ts-ignore
            show_9073777("pop")
                .then(() => {
                    console.log("User watched the ad till the end");
                    // Reward the user here
                })
                // @ts-ignore
                .catch((e:any) => {
                    console.error("Error showing ad:", e);
                    // Handle ad error
                });
        } else {
            console.error("Ad function not found");
        }
    }



    return (
        <div className={'main'} style={{backgroundColor: `black`}}>
            <Header/>
            <button onClick={handleShowAd}>Watch Ad</button>
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
