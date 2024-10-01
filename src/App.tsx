import './App.css'
import Button from "./components/Button"
import {RotatingLines} from "react-loader-spinner";
import Header from "./components/layouts/header.tsx";
import Footer from "./components/layouts/footer.tsx";
import useGiveIdea from "./hooks/useGiveIdea.tsx";


function App() {
    const { handleGiveIdea, loading } = useGiveIdea();

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
                    </>
                )
            }
            <Footer/>

        </div>
    )
}

export default App
