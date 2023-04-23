import React, {useContext, useEffect, useState} from "react";
import {CurrentItemContext} from "../../DiagramProperties/CurrentItemContext";
import {DiagramContext} from "../../DiagramProperties/DiagramContext";
import BusArea from "./BusArea";


const BusProperties = () => {
    const {diagram,updateSignal} = useContext(DiagramContext);
    const {currentItem} = useContext(CurrentItemContext);
    const [signal, setSignal] = useState(diagram.signals[currentItem.index]);

    const defaultArea = {
        value : '',
        steps : 1,
        padding: 0
    };

    useEffect(() => {
        setSignal(diagram.signals[currentItem.index]);
    }, [currentItem, diagram]);

    const handleDepthChange = (event) => {
        setSignal((prevSignal) => ({...prevSignal, depth: event.target.value}));
        updateSignal(currentItem.index, {
            depth: event.target.value
        })
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

    const handleAddValue = (event) => {
        const newAreas = [...signal.areas, defaultArea];
        setSignal((prevSignal) => ({...prevSignal, areas: newAreas}));
        updateSignal(currentItem.index, {
            areas: newAreas
        })
    }

    return (
        <div>
            <div className={"text-center"}>
                <label className={""}>Значения</label>
                <div className="flex flex-col overflow-auto">
                    {diagram.signals[currentItem.index].areas.map((item, index) =>
                        <BusArea area={item} index={index} signal={diagram.signals[currentItem.index]}/>
                    )}
                    <button className={"rounded-md border border-black mt-2"} onClick={handleAddValue}>Добавить</button>
                </div>
            </div>
        </div>
    );
}

export default BusProperties