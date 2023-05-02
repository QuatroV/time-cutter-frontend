import React, {useContext, useEffect, useState} from "react";
import { BsTrash3 } from 'react-icons/bs';
import {IoIosArrowUp, IoIosArrowDown} from 'react-icons/io'
import {DiagramContext} from "../../DiagramProperties/DiagramContext";
import {CurrentItemContext} from "../../DiagramProperties/CurrentItemContext";

const BusArea = ({area, index, signal, signalIndex}) => {
    const {diagram, updateSignal} = useContext(DiagramContext);
    const [currentArea, setCurrentArea] = useState(area);
    const {currentItem} = useContext(CurrentItemContext);

    useEffect(() => {
        setCurrentArea(signal.areas[index]);
    }, [currentItem, diagram, signal, area]);

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

    const removeButtonAction = () => {
        const newAreas = [...signal.areas];
        newAreas.splice(index, 1);
        updateSignal(currentItem.index, {
            areas: newAreas
        })
    }

    function handlePaste(event) {
        const pastedText = event.clipboardData.getData("text/plain");

        if (!/^\d*$/.test(pastedText) || pastedText.size >= 3) {
            event.preventDefault();
        }
    }

    const handleValueChange = (event) => {
        setCurrentArea((prevArea) => ({...prevArea, value: event.target.value}));
        const newAreas = [...signal.areas];
        newAreas[index].value = event.target.value;
        updateSignal(currentItem.index, {
            areas: newAreas
        })
    }

    const handleStepsChange = (event) => {
        setCurrentArea((prevArea) => ({...prevArea, steps: event.target.value}));
        const newAreas = [...signal.areas];
        newAreas[index].steps = event.target.value;
        updateSignal(currentItem.index, {
            areas: newAreas
        })
    }

    const handleColorChange = (event) => {
        setCurrentArea((prevArea) => ({...prevArea, color: event.target.value}));
        const newAreas = [...signal.areas];
        newAreas[index].color = event.target.value;
        updateSignal(currentItem.index, {
            areas: newAreas
        })
    }

    const handleIsHatchingNeedChange = (event) => {
        setCurrentArea((prevArea) => ({...prevArea, isHatchingNeed: event.target.checked}));
        const newAreas = [...signal.areas];
        newAreas[index].isHatchingNeed = event.target.checked;
        updateSignal(currentItem.index, {
            areas: newAreas
        })
    }

    return (
        <div className="flex-row relative border-b items-center border-black gap-5 self-center pb-2 w-full">
            <div className={"flex gap-5 w-full"}>
                <div className={"flex flex-col"}>
                    <label className={""}>Значение</label>
                    <input value={currentArea.value}
                           className={"rounded-md border border-black px-2 w-20 text-center"}
                           onChange={handleValueChange}/>
                </div>
                <div className={"flex flex-col"}>
                    <label>Шаги</label>
                    <input value={currentArea.steps}
                           type={"number"}
                           min={1}
                           className={"rounded-md border border-black px-2 w-20 text-center"}
                           onChange={handleStepsChange}
                           pattern="[0123456789]+"
                           onKeyDown={handleKeyDown}
                    />
                </div>
                <div className={"absolute left-48 top-12"}>
                    <button onClick={removeButtonAction} className="bg-gray-200 rounded-full p-1 hover:border hover:border-black hover:full-rounded">
                        <BsTrash3 className="text-xs" />
                    </button>
                </div>
            </div>
            <div className={"w-full self-center flex flex-col items-center"}>
                <label>Заливка</label>
                <div className={"flex w-full"}>
                    <input
                        className={"w-7 h-7 ml-5 mr-5 cursor-pointer"}
                        type={"color"}
                        onChange={handleColorChange}
                        value={currentArea.color}
                        defaultValue={"#ff"}
                    />
                    <label className={"mr-2 "}>Штриховка</label>
                    <input
                    type={"checkbox"}
                    className={"cursor-pointer"}
                    checked={currentArea.isHatchingNeed}
                    onChange={handleIsHatchingNeedChange}
                    />
                </div>

            </div>
        </div>

    );
}

export default BusArea