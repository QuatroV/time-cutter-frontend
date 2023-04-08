import DiagramProperties from "./DiagramProperties";
import React, {useContext} from "react";
import {DiagramContext} from "../../DiagramProperties/DiagramContext";


const SignalProperties = () => {

    const {diagram,updateSignal} = useContext(DiagramContext);

    return (
        <div className={"space-y-4"}>
            <div className={"flex flex-col justify-center items-center gap-2 border-b border-black pb-5"}>
                <label>Название диаграммы</label>
                <input value={diagramName} onChange={handleDiagramNameChange} onBlur={handleDiagramNameBlur} required className="rounded-md border border-black px-2 w-44 text-center"/>
            </div>


        </div>
    );
}

export default SignalProperties