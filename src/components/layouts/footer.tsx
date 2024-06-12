import './footer.css'
import {Link} from "react-router-dom";
export default function Footer () {
    return (
        <footer>
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
