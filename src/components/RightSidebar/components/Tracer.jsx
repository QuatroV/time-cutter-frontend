import {useContext, useEffect, useState} from "react";
import { BsTrash3 } from 'react-icons/bs';
import {IoIosArrowUp, IoIosArrowDown} from 'react-icons/io'
import {DiagramContext} from "../../DiagramProperties/DiagramContext";
import {CurrentItemContext} from "../../DiagramProperties/CurrentItemContext";

const Tracer = ({tracer, index}) => {
    const {diagram, updateDiagram} = useContext(DiagramContext);
    const [currentTracer, setCurrentTracer] = useState(tracer);

    useEffect(() => {
        setCurrentTracer(diagram.tracers[index]);
    }, [tracer, diagram, index]);

    function handleKeyDown(event) {
        const allowedKeys = [
            "Backspace", "ArrowLeft", "ArrowRight", "Delete",
            "Tab", "End", "Home", "Enter", "Escape",
        ];

        if (allowedKeys.includes(event.key)) {
            return;
        }
        if (!/\d/.test(event.key)) {
            event.preventDefault();
        }
    }

    const removeButtonAction = () => {
        const newTracers = [...diagram.tracers];
        newTracers.splice(index, 1);
        updateDiagram({
            tracers: newTracers
        })
    }

    function handlePaste(event) {
        const pastedText = event.clipboardData.getData("text/plain");

        if (!/^\d*$/.test(pastedText)) {
            event.preventDefault();
        }
    }

    const handleXChange = (event) => {
        setCurrentTracer((prevTracer) => ({...prevTracer, x: event.target.value}));
        const newTracers = [...diagram.tracers];
        newTracers[index].x = event.target.value;
        updateDiagram( {
            tracers: newTracers
        })
    }


    return (
        <div className="flex relative border-b items-center border-black gap-5 self-center pb-2">
            <div className={"flex flex-col"}>
                <label className={""}>Положение</label>
                <input value={currentTracer.x}
                       type={"number"}
                       min={0}
                       className={"rounded-md border border-black px-2 w-20 text-center"}
                       onChange={handleXChange}
                       pattern="[0123456789]+"
                       onKeyDown={handleKeyDown}
                />
            </div>
            <div className={"flex flex-col self-center"}>
                <button onClick={removeButtonAction} className="bg-gray-200 rounded-full p-1 hover:border hover:border-black hover:full-rounded">
                    <BsTrash3 className="text-xs" />
                </button>
            </div>
        </div>

    );
}

export default Tracer