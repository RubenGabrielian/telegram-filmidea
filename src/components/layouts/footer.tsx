import './footer.css'
import { useLocation, useNavigate } from "react-router-dom";
import LogoIcon from "../svgs/LogoIcon.tsx";
import HomeIcon from "../svgs/HomeIcon.tsx";
import SearchIcon from "../svgs/SearchIcon.tsx";
import useGiveIdea from "../../hooks/useGiveIdea.tsx";
import {useState} from "react";
import SearchModal from "../modals/SearchModal.tsx";
import Loading from '../Loading/index.tsx';

export default function Footer() {
    const {handleGiveIdea, loading: giveIdeaLoading} = useGiveIdea();
    const location = useLocation();
    const navigate = useNavigate();
    const [openSearchModal, setOpenSearchModal] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const giveMeIdeaHandler = async () => {
        setIsTransitioning(true);
        await handleGiveIdea();
        // No need to handle navigation here as it's now handled in the hook
    };

    const handleHomeClick = (e: React.MouseEvent) => {
        setOpenSearchModal(false);
        e.preventDefault();
        navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleOpenSearch = () => {
        setOpenSearchModal(true);
    }

    return (
        <>
            {(giveIdeaLoading || isTransitioning) && <div className={'loading'}><Loading /></div>}
            <footer className={'fixed bottom-[0] left-[50%] translate-x-[-50%] container mx-auto px-5'}>
                <div className="flex justify-around items-center">
                    <a href="/" onClick={handleHomeClick}>
                        <HomeIcon active={location.pathname === '/' && !openSearchModal}/>
                    </a>
                    <div className={'logo'} onClick={giveMeIdeaHandler}>
                        <LogoIcon/>
                    </div>
                    <div onClick={handleOpenSearch}>
                        <SearchIcon active={openSearchModal}/>
                    </div>
                </div>
            </footer>
            <SearchModal isOpen={openSearchModal} setOpen={setOpenSearchModal} />
        </>
    )
}
