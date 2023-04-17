import React, {useRef, useEffect, useContext} from 'react';
import { SVG } from '@svgdotjs/svg.js';
import { ReactSVG } from 'react-svg';
import {CurrentItemContext} from "../../DiagramProperties/CurrentItemContext";

const DiagramRenderer = ({ diagram }) => {
    const containerRef = useRef();
    const {currentItem, updateCurrentItem} = useContext(CurrentItemContext);

    useEffect(() => {
        if (containerRef.current) {
            const container = containerRef.current;
            // Получаем текущую ширину контейнера
            const containerWidth = container.clientWidth;

            // Устанавливаем ширину контейнера на основе текущей ширины
            container.style.width = `${containerWidth}px`;
            clearContainer(containerRef.current)
            drawDiagram(containerRef.current, diagram, updateCurrentItem);
        }
    }, [containerRef, diagram]);


    return (
        <div ref={containerRef} style={{ width: '100%', height: '100%', overflow: 'auto', position: 'relative', padding: '10px' }}>
            <ReactSVG src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3C/svg%3E" />
        </div>
    );
};

/**
 * Очистка контейнера от диаграммы
 * @param container
 */
const clearContainer = (container) => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
};

const findLongestSignalName = (signals) => {
    let maxLength = 0;

    signals.forEach((signal) => {
        if (signal.name.length > maxLength) {
            maxLength = signal.name.length;
        }
    });

    return maxLength;
};

const drawDiagram = (container, diagram, updateCurrentItem) => {

    const { totalTime, stepTime, unit, showGrid, showAxes, signals } = diagram;

    //Установка значений
    const startPaddingX = findLongestSignalName(signals) * 7 + 20;
    const signalPadding = 15;
    const stepCount = totalTime/stepTime;
    const stepWidth = 50;
    const signalHeight = 25;
    const diagramWidth = stepWidth*stepCount + startPaddingX;
    const diagramHeight = signals.length * (signalHeight + signalPadding + 1);

    const xWithPadding = (x) => startPaddingX + x;






    const svg = SVG().addTo(container).size(diagramWidth, diagramHeight+10);
    svg.clear();

    // Создаем маркер (стрелку) с заданными размерами и цветом
    const arrowSize = 10;
    const arrow = svg
        .marker(arrowSize, arrowSize, function (add) {
            add
                .path(`M0,0 L${arrowSize},${arrowSize / 2} L0,${arrowSize} L${arrowSize / 4},${arrowSize / 2} Z`)
                .fill('black');
            this.ref(arrowSize, arrowSize / 2);
        })
        .attr({ orient: 'auto' });


    if (showGrid) {
        const stepCount = totalTime / stepTime;
        for (let i = 1; i <= stepCount; i++) {
            const x = i * stepWidth + startPaddingX;
            const line = svg.line(x, 0, x, diagramHeight).stroke({ color: '#ccc', width: 1, dasharray: '5,5' });
        }
    }

    if (showAxes) {
        svg
            .line(startPaddingX, diagramHeight, startPaddingX, 0)
            .stroke({ color: 'black', width: 1 })
            .attr({ 'marker-end': arrow }); // Добавляем маркер (стрелку) к концу линии;
        svg
            .line(startPaddingX, diagramHeight, diagramWidth, diagramHeight)
            .stroke({ color: 'black', width: 1 })
            .attr({ 'marker-end': arrow }); // Добавляем маркер (стрелку) к концу линии
    }

    signals.forEach((signal, index) => {
        const { name, type, areas } = signal;
        //Начальная координата по y = номер сигнала * размер сигнала + отступ
        const y = index * signalHeight+(signalPadding*(index+1));
        switch (type) {
            case 'bit':
            {
                areas.forEach((value, areaIndex) => {
                    const startX = xWithPadding(areaIndex * stepWidth);
                    const endX = xWithPadding((areaIndex + 1) * stepWidth);
                    if (areaIndex > 0) {
                        const prevValue = areas[areaIndex - 1];
                        if (prevValue !== value) {
                            if(prevValue < value) {
                                svg.line(startX, y+signalHeight, startX+8, y).stroke({ color: 'blue', width: 2 });
                                svg.line(startX+8, y, endX, y).stroke({ color: 'blue', width: 2 });
                            } else {
                                svg.line(startX, y, startX+8, y+signalHeight).stroke({ color: 'blue', width: 2 });
                                svg.line(startX+8, y+signalHeight, endX, y+signalHeight).stroke({ color: 'blue', width: 2 });
                            }
                        } else {
                            if (value === '1') {
                                svg.line(startX, y, endX, y).stroke({ color: 'blue', width: 2 });
                            } else if(value === '0') {
                                svg.line(startX, y + signalHeight, endX, y + signalHeight).stroke({ color: 'blue', width: 2 });
                            }
                        }
                    } else {
                        if (value === '1') {
                            svg.line(startX, y, endX, y).stroke({ color: 'blue', width: 2 });
                        } else if(value === '0') {
                            svg.line(startX, y + signalHeight, endX, y + signalHeight).stroke({ color: 'blue', width: 2 });
                        }
                    }

            })
                break;
            }
            case 'clk':
            {
                areas.forEach((value, areaIndex) => {
                    const startX = xWithPadding(areaIndex * stepWidth);
                    const endX = xWithPadding((areaIndex + 1) * stepWidth);
                    if (value === '1') {
                        svg.line(startX, y, endX, y).stroke({ color: 'blue', width: 2 });
                    } else if(value === '0') {
                        svg.line(startX, y + signalHeight, endX, y + signalHeight).stroke({ color: 'blue', width: 2 });
                    }

                    if (areaIndex > 0) {
                        const prevValue = areas[areaIndex - 1];
                        if (prevValue !== value) {
                            svg.line(startX, y, startX, y + signalHeight).stroke({ color: 'blue', width: 2 });
                        }
                    }
                })
                break;
            }
            case 'bus':
            {
                let currentStep = 0;
                areas.forEach((area, areaIndex) => {
                    const startX = xWithPadding(currentStep * stepWidth);
                    const endX = xWithPadding(currentStep*stepWidth + area.steps*stepWidth);
                    if (areaIndex > 0) {
                        svg.line(startX,y, startX + 8, y + signalHeight).stroke({ color: 'blue', width: 2 });
                        svg.line(startX,y+signalHeight, startX + 8, y).stroke({ color: 'blue', width: 2 });
                        svg.line(startX+8, y, endX, y).stroke({ color: 'blue', width: 2 });
                        svg.line(startX+8, y+signalHeight, endX, y+signalHeight).stroke({ color: 'blue', width: 2 });
                    } else {
                        svg.line(startX, y, endX, y).stroke({ color: 'blue', width: 2 });
                        svg.line(startX, y+signalHeight, endX, y+signalHeight).stroke({ color: 'blue', width: 2 });
                    }
                    svg.text(area.value)
                        .font({ family: 'Arial', size: 15, anchor: 'middle', weight: "bold"})
                        .fill("black")
                        .move((endX+startX)/2, y+signalHeight/2-15)
                        .attr({ 'text-anchor': 'end', 'dominant-baseline': 'central'});
                    currentStep+=Number(area.steps);
                })
                break;
            }
        }

        // Добавьте название сигнала слева от сигнала
        const signalNameText = svg
            .text(name)
            .font({ family: 'Arial', size: 16, anchor: 'start', weight: "bold"})
            .fill("green")
            .move(startPaddingX-3, y+signalHeight/2-14)
            .attr({ 'text-anchor': 'end', 'dominant-baseline': 'central', 'cursor': 'pointer' });
        const underline = svg
            .line(startPaddingX-3, y+signalHeight/2+9, startPaddingX - name.length*10, y+signalHeight/2+9)
            .stroke({ width: 2, dasharray: "2,2", color: "black" });
        underline.hide();

        // Показываем пунктирное подчеркивание при наведении курсора мыши
        signalNameText.on("mouseenter", function () {
            underline.show();
        });

        // Скрываем пунктирное подчеркивание при выходе курсора мыши
        signalNameText.on("mouseleave", function () {
            underline.hide();
        });

        // Выбираем текщую диаграмму активной
        signalNameText.on("click", function () {
            updateCurrentItem({
                type: 'signal',
                index: index
            })
        });

    });
};

export default DiagramRenderer;


