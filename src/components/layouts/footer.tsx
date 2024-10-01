import './footer.css'
import {Link} from "react-router-dom";
import LogoIcon from "../svgs/LogoIcon.tsx";
import HomeIcon from "../svgs/HomeIcon.tsx";
import SearchIcon from "../svgs/SearchIcon.tsx";

export default function Footer () {
    return (
        <footer className={'absolute bottom-[0] left-[50%] translate-x-[-50%] container mx-auto px-5'}>
            <ul>
                <li>
                    <Link to={'/'}>
                       <HomeIcon />
                    </Link>
                </li>
                <li>
                  <div className={'logo'}>
                      <LogoIcon />
                  </div>
                </li>
                <li>
                    <Link to={'/'}>
                        <SearchIcon/>
                    </Link>
                </li>
            </ul>
        </footer>
    )
}
