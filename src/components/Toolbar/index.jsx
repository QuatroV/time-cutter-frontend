import ToolbarItem from "./components/FIleItem";
import LoginButton from "./components/LoginButton";
import FileItem from "./components/FIleItem";

const Toolbar = (props) => {

    return <div className="flex gap-1 ml-2 py-1">
        <FileItem>Файл</FileItem>
        <LoginButton user={props.user} onData={props.onData}>Войти</LoginButton>
    </div>;
};
  
export default Toolbar;
  