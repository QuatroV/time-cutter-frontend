import React, { createContext, useState } from 'react';

// Создаем контекст
export const LoginContext = createContext("");

// Создаем провайдер контекста
const LoginContextProvider = ({ children }) => {
    const [login, setLogin] = useState(sessionStorage.getItem("login")?sessionStorage.getItem("login") : '');

    // Функция для изменения значения контекста
    const updateLogin = (newLogin) => {
        setLogin(newLogin)
    };

    // Предоставляем доступ к функции setState() и значению контекста через провайдер
    return (
        <LoginContext.Provider value={{login, updateLogin }}>
            {children}
        </LoginContext.Provider>
    );
};
export default LoginContextProvider;