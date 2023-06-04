import React, {createContext, useState} from 'react';

// Создаем контекст
export const CurrentItemContext = createContext("");


// Создаем провайдер контекста
const CurrentItemContextProvider = ({ children }) => {

    const [currentItem, setCurrentItem] = useState({
        type: 'diagram',
        index: 0
    });

    const updateCurrentItem = (updatedProperties) => {
        setCurrentItem(prevCurrentItem => ({
            ...prevCurrentItem,
            ...updatedProperties
        }));
    };

    const updateCurrentItemFull = (updatedCurrentItem) => {
        setCurrentItem(updatedCurrentItem);
    }

    const contextValue = {
        currentItem,
        updateCurrentItem,
        updateCurrentItemFull
    };

    // Предоставляем доступ к функции setState() и значению контекста через провайдер
    return (
        <CurrentItemContext.Provider value={contextValue}>
            {children}
        </CurrentItemContext.Provider>
    );
};
export default CurrentItemContextProvider;