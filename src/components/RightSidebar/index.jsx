import SignalProperties from "./components/SignalProperties";

const LeftSidebar = () => {
    return <aside className="w-48 p-2 border-l border-black">
        <h4 className="text-center font-bold">Сигнал 1</h4>
        <SignalProperties />
    </aside>;
};
  
export default LeftSidebar;
  