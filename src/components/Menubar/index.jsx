import {useContext} from "react";
import {LoginContext} from "../Toolbar/components/LoginContext";

const Menubar = () => {
    const {login} = useContext(LoginContext);

    return (
        <div className="flex justify-center">
            <div className="w-100 font-bold py-1">
                <h1 className="text-2xl">Название диаграммы</h1>
            </div>
            {login != null || login !== ''?<div className="absolute right-5 top-3 font-bold px-2 py-0.5">{login}</div>:null}
        </div>
    );
};

  
export default Menubar;
