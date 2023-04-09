import {useContext} from "react";
import {CurrentItemContext} from "../DiagramProperties/CurrentItemContext";

const Graph = () => {
    const {updateCurrentItem} = useContext(CurrentItemContext);

    const handleWindowClick = () => {
        updateCurrentItem({
            type: 'diagram'
        });
    };

    return <main onClick={handleWindowClick} className="flex-1 bg-white "></main>;
  };
  
export default Graph;
  