import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import WebApp from '@twa-dev/sdk'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Film from "./pages/Film";

WebApp.ready();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path={'/'} index element={<App/>} />
                <Route path={`/film/:id`} index element={<Film/>} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)
