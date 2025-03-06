import bg from "../../assets/gradient.png";
import logo from "../../assets/logo.svg"
import CloseIcon from "../svgs/CloseIcon.tsx";
import {useEffect, useState} from "react";
import axiosInstance from "../../api/axiosInstance.ts";
import Loading from "../Loading";

export default function SearchModal({isOpen, setOpen}: { isOpen: boolean, setOpen: (isOpen: boolean) => void }) {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
      if(isOpen)  {
          axiosInstance.get('/genres/search').then((r) => {
              setCategories(r.data.data);
          })
      }
    }, [isOpen]);

    return (
        <div>
            {
                isOpen ? (
                    <div style={{backgroundImage: `url(${bg})`, backgroundColor: 'black'}}
                         className={'w-full h-lvh fixed top-0'}>
                        <img src={logo} className="mt-5 relative left-[50%] translate-x-[-50%] mb-4" alt=""/>
                        <div className="relative w-[80%] max-w-sm top-3 left-[50%] translate-x-[-50%]">
                            <input type="text" placeholder="Search..."
                                   autoFocus={true}
                                   className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl bg-transparent text-sm focus:ring-0 focus:border-[#febb12] focus:outline-none"/>
                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"/>
                            </svg>
                        </div>
                        <div className="absolute top-3 right-3" onClick={() => setOpen(false)}>
                            <CloseIcon/>
                        </div>
                       <div className={'flex flex-wrap justify-center container mx-auto px-5 mt-10 overflow-auto max-h-[80vh]'}>
                           {
                               categories.length ? (
                                   categories.map((item) => (
                                       <div key={item?.id} className="relative mb-5">
                                           <img className="w-full" src={item?.background} alt=""/>
                                           <h4 className="absolute bottom-4 left-3 text-2xl">{item.name}</h4>
                                       </div>
                                   ))
                               ) : <Loading />
                           }
                       </div>
                    </div>
                ) : null
            }
        </div>
    )
}
