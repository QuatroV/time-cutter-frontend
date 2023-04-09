import ManageSignals from "./components/ManageSignals";
import Signals from "./components/Signals";

const RightSidebar = () => {
    return <div className="w-56 border-r border-black h-full overflow-auto relative">
        <ManageSignals/>
        <Signals />
    </div>;
};
  
export default RightSidebar;
  