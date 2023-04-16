import {useContext} from "react";
import {CurrentItemContext} from "../DiagramProperties/CurrentItemContext";
import DiagramRenderer from "./components/DiagramRenderer";
import {DiagramContext} from "../DiagramProperties/DiagramContext";

const Graph = () => {
    const {updateCurrentItem} = useContext(CurrentItemContext);
    const {diagram} = useContext(DiagramContext);

    const handleWindowClick = () => {
        updateCurrentItem({
            type: 'diagram'
        });
    };

    return <main onClick={handleWindowClick} className="flex-1 bg-white ">
        <DiagramRenderer diagram={diagram}/>
    </main>;
  };
  
export default Graph;
  