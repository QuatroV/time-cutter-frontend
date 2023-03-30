import React, { useState } from 'react';
import Modal from 'react-modal';
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";

const AuthModal = ({ isOpen, onRequestClose }) => {
    const [isReg, setIsReg] = useState(false);
    const [message, setMessage] = useState(null);

    const handleAuthSwitch = () => {
        setIsReg(!isReg);
    };

    const onClose = () => {
        setIsReg(false);
        onRequestClose();
        setMessage(null);

    };

    const onReg = () => {
        setIsReg(false);
        setMessage("Вы успешно зарегистрировались!")
    }

    const customStyles = {
        content: {
            width: '420px', // ширина модального окна
            height: '320px', // высота модального окна
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles} shouldCloseOnOverlayClick={false} closeButton={true} ariaHideApp={false}>
            <button onClick={onClose} style={{position: 'absolute', top: 0, right: 10}} className={"text-black font-bold text-xl"}>
                x
            </button>
            {message && <div className={"text-green-500 justify-center items-center content-center flex"}>{message}</div>}
            {isReg? <RegistrationForm onReg={onReg}/> : <LoginForm onClose={onClose}/>}
            <div className="justify-center items-center content-center flex">
                <button type="button" onClick={handleAuthSwitch} className="underline cursor-pointer hover:bg-gray-300 rounded-lg active:shadow-inner self-end">
                    {isReg? 'Есть аккаунт? Войти в систему' : 'Зарегистрироваться в системе'}
                </button>
            </div>
        </Modal>
    );
};

export default AuthModal;