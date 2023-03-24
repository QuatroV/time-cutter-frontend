import {useEffect, useState} from "react";

const Menubar = (props) => {
    const [login, setLogin] = useState (localStorage.getItem("login"));
    useEffect(() => {
        const handleStorageChange = () => {
           setLogin(localStorage.getItem("login"));
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <div className="flex justify-center">
            <div className="w-100 font-bold py-1">
                <h1 className="text-2xl">Название диаграммы</h1>
            </div>
            {login != null?<div className="absolute right-5 top-3 font-bold px-2 py-0.5">{login}</div>:null}
        </div>
    );
};

  
export default Menubar;
  