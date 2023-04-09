import {useContext} from "react";
import { BsTrash3 } from 'react-icons/bs';
import {IoIosArrowUp, IoIosArrowDown} from 'react-icons/io'
import {DiagramContext} from "../../DiagramProperties/DiagramContext";

const Signal = ({signal, index}) => {
    const {diagram, removeSignal, updateSignal} = useContext(DiagramContext);


    return (
        <div className="flex flex-col relative border-b items-center border-black">
            <div className="absolute top-0 right-3">
                <button className="bg-gray-200 rounded-full p-1 hover:border hover:border-black hover:full-rounded">
                    <BsTrash3 className="text-xs" />
                </button>
            </div>
            <div className={"absolute left-2 top-1/2 flex flex-col transform -translate-y-1/2"}>
                <button disabled={index === 0} style={{ visibility: index === 0 ? 'hidden' : 'visible' }}>
                    <IoIosArrowUp className={"hover:border hover:border-black hover:rounded"}/>
                </button>
                <button >
                    <IoIosArrowDown disabled={index === diagram.signals.length - 1} style={{ visibility: index === diagram.signals.length - 1 ? 'hidden' : 'visible' }} className={"hover:border hover:border-black hover:rounded"}/>
                </button>
            </div>
            <div className="flex p-2">
                <button className={"text-center cursor-pointer hover:underline decoration-dotted underline-offset-2"}>{signal.name}</button>
            </div>
        </div>

    );
}

export default Signal