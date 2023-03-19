import ToolbarItem from "./components/ToolbarItem";
import LoginButton from "./components/LoginButton";

const Toolbar = (props) => {

    return <div className="flex gap-1 ml-2 py-1">
        <ToolbarItem>Файл</ToolbarItem>
        <ToolbarItem>Справка</ToolbarItem>
        <ToolbarItem>Вид</ToolbarItem>
        <LoginButton user={props.user} onData={props.onData}>Войти</LoginButton>
    </div>;
};
  
export default Toolbar;
  