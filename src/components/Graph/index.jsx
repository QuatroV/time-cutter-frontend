import {useContext} from "react";
import {CurrentItemContext} from "../DiagramProperties/CurrentItemContext";
import DiagramRenderer from "./components/DiagramRenderer";
import {DiagramContext} from "../DiagramProperties/DiagramContext";

const Graph = () => {
    const {diagram} = useContext(DiagramContext);

    return <main className="flex-1 bg-white ">
        <DiagramRenderer diagram={diagram}/>
    </main>;
  };
  
export default Graph;
  