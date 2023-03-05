import ToolbarItem from "./components/ToolbarItem";

const RightSidebar = () => {
    return <div className="flex gap-1 ml-2 py-1">
        <ToolbarItem>Файл</ToolbarItem>
        <ToolbarItem>Справка</ToolbarItem>
        <ToolbarItem>Вид</ToolbarItem>
    </div>;
};
  
export default RightSidebar;
  