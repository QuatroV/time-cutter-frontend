import React, {useContext, useEffect, useState} from "react";
import {DiagramContext} from "../../DiagramProperties/DiagramContext";
import {CurrentItemContext} from "../../DiagramProperties/CurrentItemContext";
import BitProperties from "./BitProperties";
import BusProperties from "./BusProperties";

const SignalProperties = () => {
    const {diagram,updateSignal} = useContext(DiagramContext);
    const {currentItem} = useContext(CurrentItemContext);
    const [signal, setSignal] = useState(diagram.signals[currentItem.index]);

    useEffect(() => {
        setSignal(diagram.signals[currentItem.index]);
    }, [currentItem, diagram]);

    const handleNameChange = (event) => {
        setSignal((prevSignal) => ({...prevSignal, name: event.target.value}));
    }

    const handleNameOnBlur = (event) => {
        if(signal.name) {
            updateSignal(currentItem.index, {
                name: event.target.value
            })
        }
    }

    const handleTypeChange = (event) => {
        if(event.target.value === 'bus') {
            setSignal((prevSignal) => ({...prevSignal, type: event.target.value, areas: []}));
            updateSignal(currentItem.index, {
                type: event.target.value,
                areas: []
            })
        } else {
            setSignal((prevSignal) => ({...prevSignal, type: event.target.value}));
            updateSignal(currentItem.index, {
                type: event.target.value
            })
        }
    }

    const handleDividerChange = (event) => {
        setSignal((prevSignal) => ({...prevSignal, divider: event.target.value}));
        updateSignal(currentItem.index, {
            divider: event.target.value
        });
    }


    return (
        <div className={"space-y-4"}>
            <div className={"flex flex-col justify-center items-center gap-2 border-b border-black pb-5"}>
                <label>Название</label>
                <input onChange={handleNameChange} onBlur={handleNameOnBlur} value={signal.name} required className="rounded-md border border-black px-2 w-44 text-center"/>
            </div>
            <div className={"flex flex-col justify-center items-center gap-2"}>
                <label>Тип сигнала</label>
                <div className={"flex"}>
                    <select value={signal.type} className={"rounded-md border border-black text-center align-middle h-7 w-32 bg-white text-center"}
                            onChange={handleTypeChange}>
                        <option className={"text-center align-middle"} value={"clk"}>тактовый</option>
                        <option className={"text-center align-middle"} value="bit">одиночный</option>
                        <option className={"text-center align-middle"} value="bus">шина</option>
                    </select>
                </div>
                <label>Предделитель</label>
                <div>
                    <div className={"flex"}>
                        <select className={"rounded-md border border-black text-center align-middle h-7 w-16 bg-white text-center"}
                        value={signal.divider}
                                onChange={handleDividerChange}>
                            <option className={"text-center align-middle"} value={1}>1</option>
                            <option className={"text-center align-middle"} value={2}>2</option>
                        </select>
                    </div>
                </div>
            </div>
            {signal.type === 'bit' || signal.type === 'clk' ? <BitProperties/> : null}
            {signal.type === 'bus' ? <BusProperties/> : null}



        </div>
    );
}

export default SignalProperties