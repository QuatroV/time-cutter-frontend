import {useContext} from "react";
import {LoginContext} from "../Toolbar/components/LoginContext";
import {DiagramContext} from "../DiagramProperties/DiagramContext";

const Menubar = () => {
    const {login} = useContext(LoginContext);
    const {diagram} = useContext(DiagramContext);

    return (
        <div className="flex justify-center">
            <div className="absolute left-2">
                <img src={"ico.png"} alt="Logo" width={40} height={40}/>
            </div>
            <div className="w-100 font-bold py-1">
                <h1 className="text-2xl">{diagram.name}</h1>
            </div>
            {login != null || login !== ''?<div className="absolute right-5 top-3 font-bold px-2 py-0.5">{login}</div>:null}
        </div>
    );
};

  
export default Menubar;
