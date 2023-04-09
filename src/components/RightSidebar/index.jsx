import DiagramProperties from "./components/DiagramProperties";
import {useContext, useState} from "react";
import SignalProperties from "./components/SignalProperties";
import {CurrentItemContext} from "../DiagramProperties/CurrentItemContext";

const RightSidebar = () => {
    const {currentItem} = useContext(CurrentItemContext);

    return (
        <aside className="w-60 p-2 border-l border-black overflow-auto">
            {currentItem.type === 'diagram'? <DiagramProperties/> : null}
            {currentItem.type === 'signal'? <SignalProperties/> : null}
        </aside>
    );
};
  
export default RightSidebar;
  