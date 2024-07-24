import './footer.css'
import {Link} from "react-router-dom";
export default function Footer () {
    return (
        <footer className={'absolute bottom-[2%] left-[50%] translate-x-[-50%]'}>
            <ul>
                <li>
                    <Link to={'/'}>Home</Link>
                </li>
                <li>
                    <Link to={'/'}>Search</Link>
                </li>
                <li>
                    <Link to={'/'}>Me</Link>
                </li>
            </ul>
        </footer>
    )
}
