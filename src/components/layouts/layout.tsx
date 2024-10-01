import Header from "./header.tsx";
import Footer from "./footer.tsx";
import {ReactNode} from "react";

export default function Layout({children}: { children: ReactNode }) {
    return (
        <div style={{backgroundColor:'black', minHeight: "100vh"}}>
            <Header/>
                {children}
            <Footer/>
        </div>
    )
}
