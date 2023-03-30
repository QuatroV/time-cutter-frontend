import React, { useState } from 'react';
import axios from "axios";

const RegistrationForm = (props) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    const handleLoginChange = (event) => {
        setLogin(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        event.preventDefault();
        axios.post("http://localhost:8080/api/auth/register", {
            'login': login,
            'email':email,
            'password': password,
        }).then(() => {
            props.onReg();
        }
        ).catch(error => {
            console.error(error);
            setError(error.response.data.message);
        });
    };


    return (
        <div className="flex flex-col justify-center items-center">
            {error && <div className={"text-red-600"}>{error}</div>}
            <h2 className="mb-6 font-bold">Регистрация</h2>
            <form onSubmit={handleFormSubmit} className="mb-4">
                <div className="mb-4 flex justify-between w-full gap-3">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={handleEmailChange} required className="rounded-md border border-black px-2 w-44"/>
                </div>
                <div className="mb-4 flex justify-between w-full gap-3">
                    <label htmlFor="login">Логин</label>
                    <input type="login" id="login" value={login} onChange={handleLoginChange} required className="rounded-md border border-black px-2 w-44"/>
                </div>
                <div className="mb-4 flex justify-between w-full gap-3">
                    <label htmlFor="password">Пароль</label>
                    <input type="password" id="password" className="rounded-md border border-black px-2 w-44" value={password} onChange={handlePasswordChange} required />
                </div>
                <div className="justify-center items-center content-center flex">
                    <button type="submit" className="cursor-pointer hover:bg-gray-300 rounded-lg active:shadow-inner">Зарегистрироваться</button>
                </div>
            </form>
        </div>
    );
};

export default RegistrationForm;