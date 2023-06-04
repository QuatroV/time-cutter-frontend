import React, {useContext, useEffect, useState} from "react";
import {DiagramContext} from "../../DiagramProperties/DiagramContext";
import BusArea from "./BusArea";
import Tracer from "./Tracer";

const DiagramProperties = () => {
    const {diagram, updateDiagram} = useContext(DiagramContext);
    const [diagramName, setDiagramName] = useState(diagram.name);
    const [stepCount, setStepCount] = useState(diagram.stepCount);
    const [stepTime, setStepTime] = useState(diagram.stepTime);
    const [showGrid, setShowGrid] = useState(diagram.showGrid);
    const [showAxes, setShowAxes] = useState(diagram.showAxes);
    const [tracers, setTracers] = useState(diagram.tracers);

    useEffect(() => {
        setDiagramName(diagram.name);
        setStepCount(diagram.stepCount);
        setStepTime(diagram.stepTime);
        setShowGrid(diagram.showGrid);
        setShowAxes(diagram.showAxes);
        setTracers(diagram.tracers);
    }, [diagram]);




    const defaultTracer = {
        x: 5
    }

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
        setStepCount(event.target.value);
        if (event.target.value) {
            updateDiagram({
                stepCount: event.target.value
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

    function handleAddTracer(event) {
        const newTracers = [...diagram.tracers, defaultTracer];
        setTracers(newTracers);
        updateDiagram({
            tracers: newTracers
        })
    }



    return (
        <div className={"space-y-4"}>
            <div className={"flex flex-col justify-center items-center gap-2 border-b border-black pb-5"}>
                <label>Название диаграммы</label>
                <input value={diagramName} onChange={handleDiagramNameChange} onBlur={handleDiagramNameBlur} required className="rounded-md border border-black px-2 w-44 text-center"/>
            </div>
            <div className={"flex flex-col justify-center items-center gap-2"}>
                <label>Количество шагов</label>
                <div className={"flex space-x-5"}>
                    <input value={stepCount}
                           type={'number'}
                           maxLength="3"
                           min={1}
                           max={999}
                           onKeyDown={handleKeyDown}
                           onPaste={handlePaste}
                           required
                           onChange={handleTotalTimeChange}
                           className={"rounded-md border border-black px-2 w-20 text-center"}/>
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
            <div className={"flex flex-col justify-center items-center gap-2 border-t border-black pb-5 w-full"}>
                <label className={""}>Трасеры</label>
                <button className={"rounded-md border border-black mt-2 w-full"} onClick={handleAddTracer}>Добавить</button>
                <div className="flex flex-col overflow-auto w-full">
                    {diagram.tracers.map((item, index) =>
                        <Tracer classname={"w-full"} tracer={item} index={index}/>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DiagramProperties;