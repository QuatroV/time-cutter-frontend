import {useContext, useState} from "react";
import LoginModal from "./AuthModal";
import {LoginContext} from "./LoginContext";


const LoginButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {login, updateLogin} = useContext(LoginContext);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    function handleLogout() {
        updateLogin(null);
        sessionStorage.removeItem("login");
        sessionStorage.removeItem("tokens");
    }

    return (
    <div className="absolute cursor-pointer hover:bg-gray-300 rounded-lg px-2 py-0.5 active:shadow-inner right-5">
        <button onClick={login !=null && login !== ''? handleLogout : openModal}>
            {login !=null && login !== ''? 'Выйти' : 'Войти'}
        </button>
        <LoginModal isOpen={isModalOpen} onRequestClose={closeModal}/>
    </div>
    );
}

export default LoginButton