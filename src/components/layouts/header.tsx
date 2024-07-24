import logo from "../../assets/logo.svg";
import {Link} from "react-router-dom";
export default function Header () {
    return (
        <header className={'pt-5 justify-center flex items-center'}>
            <Link to={'/'}>
                <img src={logo} alt=""/>
            </Link>
        </header>
    )
}
