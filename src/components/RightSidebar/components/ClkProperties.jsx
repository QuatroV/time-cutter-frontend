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
        const areasBefore = signal.areas;
        const areasAfter = event.target.value.split('');
        for(let i = 0; i < areasAfter.length; i++) {
            if(i >= areasBefore.length) {
                areasBefore.push({
                    value: areasAfter[i],
                    padding: 0
                })
            } else {
                areasBefore[i].value = areasAfter[i];
            }
        }
        if(areasAfter.length < areasBefore.length) {
            let counter = areasBefore.length - areasAfter.length;
            while(counter > 0) {
                areasBefore.pop();
                counter--;
            }
        }
        setSignal((prevSignal) => ({...prevSignal, areas: areasBefore}));
        updateSignal(currentItem.index, {
            areas: areasBefore
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
                   value={signal.areas.map((obj) => obj.value).join('')}
                   className="rounded-md border border-black px-2 w-44 text-center"
                   onKeyDown={handleKeyPress}
                   pattern="[01~/]+"/>
        </div>

    );
}

export default ClkProperties