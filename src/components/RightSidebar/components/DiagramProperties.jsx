import React, {useContext, useState} from "react";
import {DiagramContext} from "../../DiagramProperties/DiagramContext";

const DiagramProperties = () => {
    const {diagram, updateDiagram} = useContext(DiagramContext);
    const [diagramName, setDiagramName] = useState(diagram.name);

    const handleDiagramNameChange = (event) => {
        setDiagramName(event.target.value);
    }

    const handleDiagramNameBlur = (event) => {
        if(event.target.value) {
            updateDiagram({
                name: event.target.value
            });
            localStorage.setItem('diagram', JSON.stringify(diagram));
        }
    }

    return (
        <div className={"space-y-5"}>
            <div className={"flex flex-col justify-center items-center space-y-2 border-b border-black pb-5"}>
                <label>Название диаграммы</label>
                <input value={diagramName} onChange={handleDiagramNameChange} onBlur={handleDiagramNameBlur} required className="rounded-md border border-black px-2 w-44 text-center"/>
            </div>

        </div>
    );
}

export default DiagramProperties;