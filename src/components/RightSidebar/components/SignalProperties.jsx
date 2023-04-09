import React, {useContext, useEffect, useState} from "react";
import {DiagramContext} from "../../DiagramProperties/DiagramContext";
import {CurrentItemContext} from "../../DiagramProperties/CurrentItemContext";


const SignalProperties = () => {
    const {diagram,updateSignal} = useContext(DiagramContext);
    const {currentItem} = useContext(CurrentItemContext);
    const [signal, setSignal] = useState(diagram.signals[currentItem.index]);

    useEffect(() => {
        setSignal(diagram.signals[currentItem.index]);
    }, [currentItem, diagram]);



    return (
        <div className={"space-y-4"}>
            <div className={"flex flex-col justify-center items-center gap-2 border-b border-black pb-5"}>
                <label>Название</label>
                <input value={signal.name} required className="rounded-md border border-black px-2 w-44 text-center"/>
            </div>


        </div>
    );
}

export default SignalProperties