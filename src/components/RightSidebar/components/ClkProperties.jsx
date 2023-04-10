import React, {useContext, useEffect, useState} from "react";
import {CurrentItemContext} from "../../DiagramProperties/CurrentItemContext";
import {DiagramContext} from "../../DiagramProperties/DiagramContext";


const ClkProperties = () => {
    const {diagram,updateSignal} = useContext(DiagramContext);
    const {currentItem} = useContext(CurrentItemContext);
    const [signal, setSignal] = useState(diagram.signals[currentItem.index]);

    useEffect(() => {
        setSignal(diagram.signals[currentItem.index]);
    }, [currentItem, diagram]);

    const handleValuesChange = (event) => {
        setSignal((prevSignal) => ({...prevSignal, areas: event.target.value.split('')}));
        updateSignal(currentItem.index, {
            areas: event.target.value.split('')
        })
    }


    function handleKeyPress(event) {
        const allowedChars = ['0', '1', '~', '/','Delete','Backspace', 'ArrowLeft', 'ArrowRight'];
        const pressedKey = event.key;
        if (!allowedChars.includes(pressedKey)) {
            event.preventDefault();
        }
    }

    return (
        <div className={"flex flex-col justify-center items-center gap-2"}>
            <label>Значения сигналов</label>
            <input onChange={handleValuesChange}
                   value={signal.areas.join('')}
                   className="rounded-md border border-black px-2 w-44 text-center"
                   onKeyDown={handleKeyPress}
                   pattern="[01~/]+"/>
        </div>
    );
}

export default ClkProperties