import React, { useState } from 'react';

const LoginForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginChange = (event) => {
        setLogin(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // handle form submit logic
    };

    return (
            <div className="flex flex-col justify-center items-center">
                <h2 className="mb-6 font-bold">Авторизация</h2>
                <form onSubmit={handleFormSubmit} className="mb-4">
                    <div className="mb-4 space-x-6 flex">
                        <label htmlFor="login">Логин</label>
                        <input type="login" id="login" value={login} onChange={handleLoginChange} required className="rounded-md border border-black px-2"/>
                    </div>
                    <div className="mb-4 space-x-4 flex">
                        <label htmlFor="password">Пароль</label>
                        <input type="password" id="password" className="rounded-md border border-black px-2" value={password} onChange={handlePasswordChange} required />
                    </div>
                    <div className="justify-center items-center content-center flex">
                        <button type="submit" className="cursor-pointer hover:bg-gray-300 rounded-lg active:shadow-inner">Войти</button>
                    </div>
                </form>
            </div>
    );
};

export default LoginForm;