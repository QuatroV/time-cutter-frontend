import {useEffect, useState} from "react";

const Menubar = (props) => {
    //const [title, setTitle] = useState (false);

    return (
        <div className="flex justify-center">
            <div className="w-100 font-bold py-1">
                <h1 className="text-2xl">Название диаграммы</h1>
            </div>
            {props.user != null?<div className="absolute right-5 top-3 font-bold px-2 py-0.5">{props.user.login}</div>:null}
        </div>
    );
};
  
export default Menubar;
  