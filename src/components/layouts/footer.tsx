import './footer.css'
import {Link} from "react-router-dom";
import SearchIcon from "../svgs/SearchIcon.tsx";
import HomeIcon from "../svgs/HomeIcon.tsx";
import UserIcon from "../svgs/UserIcon.tsx";

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
                  <div>
                      <SearchIcon />
                  </div>
                </li>
                <li>
                    <Link to={'/'}>
                        <UserIcon />
                    </Link>
                </li>
            </ul>
        </footer>
    )
}
