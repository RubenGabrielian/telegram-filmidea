import './footer.css'
import {Link, useParams} from "react-router-dom";
import LogoIcon from "../svgs/LogoIcon.tsx";
import HomeIcon from "../svgs/HomeIcon.tsx";
import SearchIcon from "../svgs/SearchIcon.tsx";
import useGiveIdea from "../../hooks/useGiveIdea.tsx";
import {useState} from "react";
import SearchModal from "../modals/SearchModal.tsx";
import Loading from '../Loading/index.tsx';

export default function Footer() {
    const {handleGiveIdea, loading} = useGiveIdea();
    const params = useParams()
    const [openSearchModal, setOpenSearchModal] = useState(false);

    const giveMeIdeaHandler = () => {
        handleGiveIdea();
    };

    const handleOpenSearch = () => {
        setOpenSearchModal(true);
    }

    return (
        <>
            {loading && <div className={'loading'}><Loading /></div>}
            <footer className={'fixed bottom-[0] left-[50%] translate-x-[-50%] container mx-auto px-5'}>
                        <ul>
                            
                            <li>
                                <Link to={'/'}>
                                    <HomeIcon active={!params?.id}/>
                                </Link>
                            </li>
                            <li>
                                <div className={'logo'} onClick={giveMeIdeaHandler}>
                                    <LogoIcon/>
                                </div>
                            </li>
                            <li>
                                <div onClick={handleOpenSearch}>
                                    <SearchIcon/>
                                </div>
                            </li>
                        </ul>
            </footer>
            <SearchModal isOpen={openSearchModal} setOpen={setOpenSearchModal} />
        </>

    )
}
