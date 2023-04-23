import React, {createContext, useCallback, useEffect, useState} from 'react';
import debounce from 'lodash/debounce';

// Создаем контекст
export const DiagramContext = createContext("");

const defaultDiagram = {
    name: 'Кефтеме',
    totalTime: 60,
    stepTime: 1,
    unit: 'ue',
    showGrid: true,
    showAxes: true,
    signals: [],
    tracers: []
};

// Создаем провайдер контекста
const DiagramContextProvider = ({ children }) => {
    const getDiagram = () => {
        try {
            return JSON.parse(localStorage.getItem('diagram'));
        } catch (e) {
            console.log(e);
            return defaultDiagram;
        }
    }

    const [diagram, setDiagram] = useState(localStorage.getItem('diagram')? getDiagram() : defaultDiagram);

    /**
     * Добавить новйы сигнал
     * @param signal - добавляемый сигнал
     */
    const addSignal = (signal) => {
        setDiagram({
            ...diagram,
            signals: [...diagram.signals, signal]
        });
    };

    const updateDiagram = (updatedProperties) => {
        setDiagram(prevDiagram => ({
            ...prevDiagram,
            ...updatedProperties
        }));
    }

    /**
     * Удалить сигнал по индексу
     * @param signalIndex индекс сигнала
     */
    const removeSignal = (signalIndex) => {
        const updatedSignals = diagram.signals.filter((_, index) => index !== signalIndex);
        setDiagram({
            ...diagram,
            signals: updatedSignals
        });
    };

    /**
     * Обновить сигнал по индексу
     * @param signalIndex - индекс сигнала
     * @param updatedSignal - новое значение сигнала
     */
    const updateSignal = (signalIndex, updatedSignal) => {
        const updatedSignals = diagram.signals.map((signal, index) => {
            if (index === signalIndex) {
                return {
                    ...signal,
                    ...updatedSignal
                };
            }
            return signal;
        });
        setDiagram({
            ...diagram,
            signals: updatedSignals
        });
    };

    /**
     * Функция для обновления диаграммы в локальном хранилище
     * Используется для задержки, чтоб сохранялось актуальное значение
     */
    const debouncedUpdateDiagram = useCallback(
        debounce((updatedDiagram) => {
            localStorage.setItem('diagram', JSON.stringify(updatedDiagram));
            setDiagram(updatedDiagram);
        }, 100),
        []
    );

    useEffect(() => {
        debouncedUpdateDiagram(diagram);
    }, [diagram, debouncedUpdateDiagram]);

    const contextValue = {
        diagram,
        updateDiagram,
        addSignal,
        removeSignal,
        updateSignal
    };

    // Предоставляем доступ к функции setState() и значению контекста через провайдер
    return (
        <DiagramContext.Provider value={contextValue}>
            {children}
        </DiagramContext.Provider>
    );
};
export default DiagramContextProvider;