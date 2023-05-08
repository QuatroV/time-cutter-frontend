import React, {useContext, useEffect, useState} from "react";
import {DiagramContext} from "../../DiagramProperties/DiagramContext";
import {CurrentItemContext} from "../../DiagramProperties/CurrentItemContext";

const SelectedAreasProperties = () => {
    const {diagram,updateSignal} = useContext(DiagramContext);
    const {currentItem, updateCurrentItem} = useContext(CurrentItemContext);
    const getArea = (index) => {
        const areaIndex = currentItem.areas[index];
        return diagram.signals[currentItem.index].areas[areaIndex];
    }
    const [genValue, setGenValue] = useState(currentItem.areas.length === 1? getArea(0).value : '');
    const [padding, setPadding] = useState(currentItem.areas.length === 1? getArea(0).padding : '');

    useEffect(() => {
        setGenValue(currentItem.areas.length === 1? getArea(0).value : '');
        setPadding(currentItem.areas.length === 1? getArea(0).padding : '');
    }, [currentItem, updateCurrentItem]);

    const handleValueChanged = (event) => {
        setGenValue(event.target.value);
        if(event.target.value !== '') {
            const indexes = currentItem.areas;
            const tempAreas = diagram.signals[currentItem.index].areas;
            for(let i = 0; i < indexes.length; i++) {
                tempAreas[indexes[i]].value = event.target.value;
            }
            updateSignal(currentItem.index, {
                areas: tempAreas
            })
        }
    }

    function handleKeyDown(event) {
        const allowedKeys = [
            "Backspace", "ArrowLeft", "ArrowRight", "Delete",
            "Tab", "End", "Home", "Enter", "Escape",
        ];

        if (allowedKeys.includes(event.key)) {
            return;
        }
        if (!/\d/.test(event.key) || event.target.value > 40) {
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



    return (
        <div className={"space-y-4"}>
            <div className={"flex flex-col justify-center items-center gap-2 border-b border-black"}>
                <label>Выбранные области</label>
            </div>
            <div className={"flex flex-col justify-center items-center gap-2"}>
                <label>Задать значение</label>
                <select value={genValue} className={"rounded-md border border-black text-center align-middle h-7 w-14 bg-white text-center"}
                        onChange={handleValueChanged}>
                    <option value="" selected></option>
                    <option className={"text-center align-middle"} value='1'>1</option>
                    <option className={"text-center align-middle"} value='0'>0</option>
                    <option className={"text-center align-middle"} value='z'>z</option>
                </select>
            </div>
            <div className={"flex flex-col justify-center items-center gap-2"}>
                <label>Задать задержку</label>
                <input onChange={handlePaddingChange}
                       type={'number'}
                       maxLength="2"
                       min={0}
                       max={49}
                       onKeyDown={handleKeyDown}
                       onPaste={handlePaste}
                       value={padding}
                       className="rounded-md border border-black px-2 w-16 text-center"/>
            </div>
        </div>
    );
}

export default SelectedAreasProperties