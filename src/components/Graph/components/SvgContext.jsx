import React, {createContext, useState} from 'react';

// Создаем контекст
export const SvgContext = createContext("");

// Создаем провайдер контекста
const SvgContextProvider = ({ children }) => {

    const [svg, setSvg] = useState('');

    const updateSvg = (newSvg) => {
        setSvg(newSvg);
    }

    const contextValue = {
        svg,
        updateSvg
    };

    return (
        <SvgContext.Provider value={contextValue}>
            {children}
        </SvgContext.Provider>
    );
};
export default SvgContextProvider;