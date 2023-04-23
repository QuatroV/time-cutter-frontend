import React, {useContext, useEffect, useState} from "react";
import {DiagramContext} from "../../DiagramProperties/DiagramContext";
import {CurrentItemContext} from "../../DiagramProperties/CurrentItemContext";

const SelectedBusAreasProperties = () => {
    const {diagram,updateSignal} = useContext(DiagramContext);
    const {currentItem, updateCurrentItem} = useContext(CurrentItemContext);
    const getArea = (index) => {
        const areaIndex = currentItem.areas[index];
        return diagram.signals[currentItem.index].areas[areaIndex];
    }
    const [genValue, setGenValue] = useState(currentItem.areas.length === 1? getArea(0).value : '');
    const [padding, setPadding] = useState(currentItem.areas.length === 1? getArea(0).padding : '');
    const [steps, setSteps] = useState(currentItem.areas.length === 1? getArea(0).steps : '')

    useEffect(() => {
        setGenValue(currentItem.areas.length === 1? getArea(0).value : '');
        setPadding(currentItem.areas.length === 1? getArea(0).padding : '');
        setSteps(currentItem.areas.length === 1? getArea(0).steps : '');
    }, [currentItem, updateCurrentItem]);

    const handleValueChanged = (event) => {
        setGenValue(event.target.value);
        const indexes = currentItem.areas;
        const tempAreas = diagram.signals[currentItem.index].areas;
        for(let i = 0; i < indexes.length; i++) {
            tempAreas[indexes[i]].value = event.target.value;
        }
        updateSignal(currentItem.index, {
            areas: tempAreas
        })
    }

    function handleKeyDown(event) {
        const allowedKeys = [
            "Backspace", "ArrowLeft", "ArrowRight", "Delete",
            "Tab", "End", "Home", "Enter", "Escape",
        ];

        if (allowedKeys.includes(event.key)) {
            return;
        }
        if (!/\d/.test(event.key) || event.target.value > 30) {
            event.preventDefault();
        }
    }

    function handlePaste(event) {
        const pastedText = event.clipboardData.getData("text/plain");

        if (!/^\d*$/.test(pastedText) || pastedText > 40) {
            event.preventDefault();
        }
    }

    const handlePaddingChange = (event) => {
        if(event.target.value <= 40) {
            setPadding(event.target.value);
            const indexes = currentItem.areas;
            const tempAreas = diagram.signals[currentItem.index].areas;
            for(let i = 0; i < indexes.length; i++) {
                tempAreas[indexes[i]].padding = Number(event.target.value);
            }
            updateSignal(currentItem.index, {
                areas: tempAreas
            })
        }
    }

    const handleStepsChange = (event) => {
        if(event.target.value <= 40) {
            setSteps(event.target.value);
            const indexes = currentItem.areas;
            const tempAreas = diagram.signals[currentItem.index].areas;
            for(let i = 0; i < indexes.length; i++) {
                tempAreas[indexes[i]].steps = event.target.value;
            }
            updateSignal(currentItem.index, {
                areas: tempAreas
            })
        }
    }



    return (
        <div className={"space-y-4"}>
            <div className={"flex flex-col justify-center items-center gap-2 border-b border-black"}>
                <label>Выбранные области</label>
            </div>
            {currentItem.areas.length === 1?
                <div className={"flex flex-col justify-center items-center gap-2"}>
                <label>Задать значение</label>
                    <input value={genValue}
                           className={"rounded-md border border-black px-2 w-20 text-center"}
                           onChange={handleValueChanged}/>
            </div>
            : null}
            <div className={"flex flex-col justify-center items-center gap-2"}>
                <label>Задать задержку</label>
                <input onChange={handlePaddingChange}
                       type={'number'}
                       maxLength="2"
                       min={0}
                       max={40}
                       onKeyDown={handleKeyDown}
                       onPaste={handlePaste}
                       value={padding}
                       className="rounded-md border border-black px-2 w-16 text-center"/>
            </div>
            <div className={"flex flex-col justify-center items-center gap-2"}>
                <label>Шаги</label>
                <input value={steps}
                       type={"number"}
                       min={1}
                       className={"rounded-md border border-black px-2 w-20 text-center"}
                       onChange={handleStepsChange}
                       pattern="[0123456789]+"
                       onKeyDown={handleKeyDown}
                />
            </div>

        </div>
    );
}

export default SelectedBusAreasProperties