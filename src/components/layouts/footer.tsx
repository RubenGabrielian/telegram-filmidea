import './footer.css'
import {Link} from "react-router-dom";
import HomeIcon from "../../assets/home.png";
import SearchIcon from "../svgs/SearchIcon.tsx";
import UserIcon from "../../assets/user.png"

export default function Footer () {
    return (
        <footer className={'absolute bottom-[0] left-[50%] translate-x-[-50%] container mx-auto px-5'}>
            <ul>
                <li>
                    <Link to={'/'}>
                        <img src={HomeIcon} />
                    </Link>
                </li>
                <li>
                  <div>
                      <SearchIcon />
                  </div>
                </li>
                <li>
                    <Link to={'/'}>
                        <img src={UserIcon} alt=""/>
                    </Link>
                </li>
            </ul>
        </footer>
    )
}
