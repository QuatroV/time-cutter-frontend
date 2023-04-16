import React, {useContext, useState} from "react";
import {DiagramContext} from "../../DiagramProperties/DiagramContext";

const DiagramProperties = () => {
    const {diagram, updateDiagram} = useContext(DiagramContext);
    const [diagramName, setDiagramName] = useState(diagram.name);
    const [totalTime, setTotalTime] = useState(diagram.totalTime);
    const [unit, setUnit] = useState(diagram.unit);
    const [stepTime, setStepTime] = useState(diagram.stepTime);
    const [showGrid, setShowGrid] = useState(diagram.showGrid);
    const [showAxes, setShowAxes] = useState(diagram.showAxes);

    const handleDiagramNameChange = (event) => {
        setDiagramName(event.target.value);
    }

    const handleDiagramNameBlur = (event) => {
        if(event.target.value) {
            updateDiagram({
                name: event.target.value
            });
        }
    }

    const handleTotalTimeChange = (event) => {
        setTotalTime(event.target.value);
        if (event.target.value) {
            updateDiagram({
                totalTime: event.target.value
            });
        }
    }

    const handleUnitChange = (event) => {
        setUnit(event.target.value);
        if (event.target.value) {
            updateDiagram({
                unit: event.target.value
            });
        }
    }

    const handleStepTimeChange = (event) => {
        setStepTime(event.target.value);
        if(event.target.value) {
            updateDiagram({
                stepTime: event.target.value
            });
        }
    }

    const handleShowGrid = (event) => {
        setShowGrid(event.target.checked);
        updateDiagram({
            showGrid: event.target.checked
        });
    }

    const handleShowAxes = (event) => {
        setShowAxes(event.target.checked);
        updateDiagram({
            showAxes: event.target.checked
        });
    }


    function handleKeyDown(event) {
        const allowedKeys = [
            "Backspace", "ArrowLeft", "ArrowRight", "Delete",
            "Tab", "End", "Home", "Enter", "Escape",
        ];

        if (allowedKeys.includes(event.key)) {
            return;
        }
        if (!/\d/.test(event.key) || event.target.value.length >= 3) {
            event.preventDefault();
        }
    }

    function handlePaste(event) {
        const pastedText = event.clipboardData.getData("text/plain");

        if (!/^\d*$/.test(pastedText) || pastedText.size >= 3) {
            event.preventDefault();
        }
    }



    return (
        <div className={"space-y-4"}>
            <div className={"flex flex-col justify-center items-center gap-2 border-b border-black pb-5"}>
                <label>Название диаграммы</label>
                <input value={diagramName} onChange={handleDiagramNameChange} onBlur={handleDiagramNameBlur} required className="rounded-md border border-black px-2 w-44 text-center"/>
            </div>
            <div className={"flex flex-col justify-center items-center gap-2"}>
                <label>Общий интервал диаграммы</label>
                <div className={"flex space-x-5"}>
                    <input value={totalTime}
                           type={'number'}
                           maxLength="3"
                           min={1}
                           max={999}
                           onKeyDown={handleKeyDown}
                           onPaste={handlePaste}
                           required
                           onChange={handleTotalTimeChange}
                           className={"rounded-md border border-black px-2 w-20 text-center"}/>
                    <select value={unit} className={"rounded-md border border-black text-center w-14 bg-white"}
                            onChange={handleUnitChange}>
                        <option value={"ue"}>у.е.</option>
                        <option value="ms">мс</option>
                        <option value="us">мкс</option>
                        <option value="ns">нс</option>
                    </select>
                </div>
            </div>
            <div className={"flex space-x-5"}>
                <label>Интервал шага</label>
                <input value={stepTime}
                       type={'number'}
                       maxLength="3"
                       min={1}
                       max={999}
                       onKeyDown={handleKeyDown}
                       onPaste={handlePaste}
                       required
                       onChange={handleStepTimeChange}
                       className={"rounded-md border border-black px-2 w-20 text-center"}/>
            </div>

            <div className={"flex flex-col justify-center gap-2 pl-5"}>
                <div className={"flex space-x-5"}>
                    <input type={"checkbox"}
                           checked={showGrid}
                           onChange={handleShowGrid}
                    />
                    <label>Отображение сетки</label>
                </div>
                <div className={"flex space-x-5"}>
                    <input type={"checkbox"}
                           checked={showAxes}
                           onChange={handleShowAxes}
                    />
                    <label>Отображение осей</label>
                </div>
            </div>

        </div>
    );
}

export default DiagramProperties;