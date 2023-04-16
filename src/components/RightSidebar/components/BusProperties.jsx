import React, {useContext, useEffect, useState} from "react";
import {CurrentItemContext} from "../../DiagramProperties/CurrentItemContext";
import {DiagramContext} from "../../DiagramProperties/DiagramContext";


const BusProperties = () => {
    const {diagram,updateSignal} = useContext(DiagramContext);
    const {currentItem} = useContext(CurrentItemContext);
    const [signal, setSignal] = useState(diagram.signals[currentItem.index]);

    useEffect(() => {
        setSignal(diagram.signals[currentItem.index]);
    }, [currentItem, diagram]);

    const handleDepthChange = (event) => {
        setSignal((prevSignal) => ({...prevSignal, depth: event.target.value}));
        updateSignal(currentItem.index, {
            depth: event.target.value
        })
    }


    function handleKeyPress(event) {
        const allowedChars = ['0', '1', '~', '/','Delete','Backspace', 'ArrowLeft', 'ArrowRight'];
        const pressedKey = event.key;
        if (!allowedChars.includes(pressedKey)) {
            event.preventDefault();
        }
    }

    function handleDepthKeyDown(e) {
        // Prevent manual input
        e.preventDefault();
    }

    const handleValuesChange = (event) => {
        setSignal((prevSignal) => ({...prevSignal, areas: event.target.value.split(',')}));
        updateSignal(currentItem.index, {
            areas: event.target.value.split(',')
        })
    }

    return (
        <div className={"flex flex-col justify-center items-center"}>
            <div className={"flex flex-col justify-center items-center gap-2"}>
                <label>Разрядность</label>
                <input type={"number"}
                       min={2}
                       max={8}
                       onChange={handleDepthChange}
                       onKeyDown={handleDepthKeyDown}
                       value={signal.depth}
                       className="rounded-md border border-black px-2 w-14 text-center"
                       pattern="[0123456789]+"/>
            </div>
            <div className={"flex flex-col justify-center items-center gap-2"}>
                <label>Значения</label>
                <textarea value={signal.areas.join(',')}
                          placeholder={"Перечислите значения через запятую..."}
                          className="rounded-md border border-black px-2 w-44 h-20"
                          onChange={handleValuesChange}
                />
            </div>

        </div>


    );
}

export default BusProperties