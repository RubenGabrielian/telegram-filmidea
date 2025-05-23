import './footer.css'
import {Link, useLocation, useNavigate} from "react-router-dom";
import LogoIcon from "../svgs/LogoIcon.tsx";
import HomeIcon from "../svgs/HomeIcon.tsx";
import SearchIcon from "../svgs/SearchIcon.tsx";
import useGiveIdea from "../../hooks/useGiveIdea.tsx";
import {useState} from "react";
import SearchModal from "../modals/SearchModal.tsx";
import Loading from '../Loading/index.tsx';

export default function Footer() {
    const {handleGiveIdea, loading} = useGiveIdea();
    const location = useLocation();
    const navigate = useNavigate();
    const [openSearchModal, setOpenSearchModal] = useState(false);

    const giveMeIdeaHandler = () => {
        handleGiveIdea();
    };

    const handleOpenSearch = () => {
        setOpenSearchModal(true);
    }

    const handleHomeClick = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/', { replace: true });
    };

    return (
        <>
            {loading && <div className={'loading'}><Loading /></div>}
            <footer className={'fixed bottom-[0] left-[50%] translate-x-[-50%] container mx-auto px-5'}>
                <ul>
                    <li>
                        <Link to={'/'} onClick={handleHomeClick}>
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
