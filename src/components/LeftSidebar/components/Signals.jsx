import {useContext} from "react";
import {DiagramContext} from "../../DiagramProperties/DiagramContext";
import Signal from "./Signal";

const Signals = () => {
    const {diagram, removeSignal, updateSignal} = useContext(DiagramContext);


    return <div className="flex flex-col overflow-auto" style={{height: '95%'}}>
        {diagram.signals.map((item, index) =>
            <Signal signal={item} index={index}/>
        )}
    </div>
}

export default Signals