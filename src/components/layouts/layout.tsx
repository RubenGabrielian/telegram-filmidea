import Header from "./header.tsx";
import Footer from "./footer.tsx";
import {ReactNode} from "react";
import bg from "../../assets/bg.png";

export default function Layout({children}: { children: ReactNode }) {
    return (
        <div style={{backgroundImage: `url(${bg})`, minHeight: "100vh"}}>
            <Header/>
                {children}
            <Footer/>
        </div>
    )
}
