import {useState} from "react";
import AuthModal from "./AuthModal";
import LoginModal from "./AuthModal";


const LoginButton = (props) => {
    const [isAuthorized, setIsAuthorized] = useState(props.user != null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const user = {
        id : null,
        login : null
    };

    function handleLogout() {
        // Your code to handle logout goes here
        setIsAuthorized(false);
        props.onData(null);
    }

    return (
    <div className="absolute cursor-pointer hover:bg-gray-300 rounded-lg px-2 py-0.5 active:shadow-inner right-5">
        <button onClick={isAuthorized? handleLogout : openModal}>
            {isAuthorized ? 'Выйти' : 'Войти'}
        </button>
        <LoginModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </div>
    );
}

export default LoginButton