import './footer.css'
import {Link, useLocation} from "react-router-dom";
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
    const [openSearchModal, setOpenSearchModal] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const giveMeIdeaHandler = async () => {
        setIsTransitioning(true); // Show loading immediately
        const film = await handleGiveIdea();
        if (film?.id) {
            // Hard reload to the new film page
            window.location.href = `/film/${film.id}`;
        } else {
            setIsTransitioning(false); // Reset if no film was found
        }
    };

    const handleOpenSearch = () => {
        setOpenSearchModal(true);
    }


    return (
        <>
            {(giveIdeaLoading || isTransitioning) && <div className={'loading'}><Loading /></div>}
            <footer className={'fixed bottom-[0] left-[50%] translate-x-[-50%] container mx-auto px-5'}>
                <ul>
                    <li>
                        <Link to={'/'} >
                            <HomeIcon active={location.pathname === '/'}/>
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
