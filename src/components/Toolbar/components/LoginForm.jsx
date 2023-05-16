import React, {useContext, useState} from 'react';
import axios from 'axios';
import {LoginContext} from "./LoginContext";

const LoginForm = (props) => {
    const [loginForm, setLoginForm] = useState('');
    const [passwordForm, setPasswordForm] = useState('');
    const [error, setError] = useState(null);
    const {updateLogin} = useContext(LoginContext);

    const api = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

    const handleLoginChange = (event) => {
        setLoginForm(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPasswordForm(event.target.value);
    };


    const handleFormSubmit = (event) => {
        event.preventDefault();
        axios.post(`${api}/api/auth/login`, {
            'login': loginForm,
            'password': passwordForm
        }).then((resp) => {
                sessionStorage.setItem("tokens", JSON.stringify(resp.data));
                sessionStorage.setItem("login", loginForm);
                updateLogin(loginForm);
                props.onClose();
            }
        ).catch(error => {
            console.error(error);
            setError(error.response.data.message);
        });
    };

    return (
            <div className="flex flex-col justify-center items-center">
                {error && <div className={"text-red-600"}>{error}</div>}
                <h2 className="mb-6 font-bold">Авторизация</h2>
                <form onSubmit={handleFormSubmit} className="mb-4">
                    <div className="mb-4 flex justify-between w-full gap-3">
                        <label htmlFor="login">Логин</label>
                        <input type="login" id="login" value={loginForm} onChange={handleLoginChange} required className="rounded-md border border-black px-2 w-44"/>
                    </div>
                    <div className="mb-4 flex justify-between w-full gap-3">
                        <label htmlFor="password">Пароль</label>
                        <input type="password" id="password" className="rounded-md border border-black px-2 w-44" value={passwordForm} onChange={handlePasswordChange} required />
                    </div>
                    <div className="justify-center items-center content-center flex">
                        <button type="submit" className="cursor-pointer hover:bg-gray-300 rounded-lg active:shadow-inner">Войти</button>
                    </div>
                </form>
            </div>
    );
};

export default LoginForm;