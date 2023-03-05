import ManageSignals from "./components/ManageSignals";
import Signals from "./components/Signals";

const RightSidebar = () => {
    return <div className="w-48 border-r border-black">
        <ManageSignals/> 
        <Signals /> 
    </div>;
};
  
export default RightSidebar;
  