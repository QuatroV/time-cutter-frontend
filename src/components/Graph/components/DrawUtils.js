/**
 * Метод для выделения области шины
 * @param svg - холст
 * @param areas - все области
 * @param area - текущая область
 * @param areaIndex - её индекс
 * @param signalHeight - высота сигнала
 * @param y
 * @param startX
 * @param endX
 * @returns {path} - svg элемент path
 */
export function createBusAreaPath (svg, areas, area, areaIndex, signalHeight, y, startX, endX) {
    let nextAreaPadding = 0;
    if(areas.length - 1 > areaIndex && areas[areaIndex+1].padding > 0) {
        nextAreaPadding = areas[areaIndex+1].padding;
    }

    let path;
    if(areaIndex > 0 ) {
        if(areaIndex !== areas.length - 1) {
            path = svg.path(`M ${startX+4} ${y+signalHeight/2} L ${startX+8} ${y} L ${endX} ${y} L ${endX+4} ${y+(signalHeight/2)} L ${endX} ${y+signalHeight} L ${startX+8} ${y+signalHeight} L ${startX+4} ${y+signalHeight/2} Z`);
        } else {
            path = svg.path(`M ${startX+4} ${y+signalHeight/2} L ${startX+8} ${y} L ${endX} ${y} V ${y+signalHeight} L ${startX+8} ${y+signalHeight} L ${startX+4} ${y+signalHeight/2} Z`);
        }
    } else {
        if(areaIndex === areas.length - 1) {
            path = svg.path(`M ${startX} ${y} L ${endX} ${y} V ${y+signalHeight} L ${startX} ${y+signalHeight} V ${y} Z`);
        } else {
            path = svg.path(`M ${startX} ${y} L ${endX} ${y} L ${endX+4} ${y+(signalHeight/2)} L ${endX} ${y+signalHeight} L ${startX} ${y+signalHeight} V ${y} Z`);
        }
    }
    return path;
}

/**
 * Добавить текст в центр области шины
 * @param svg
 * @param area
 * @param areaPath
 */
export function addTextToBusArea(svg, area, areaPath) {
    const bbox = areaPath.bbox();
    const centerX = bbox.cx;
    const centerY = bbox.cy;
    svg.text(area.value)
        .font({ family: 'Arial', size: 15, anchor: 'middle', weight: "bold"})
        .fill("black")
        .move(centerX, centerY-8)
        .attr({ 'text-anchor': 'end'});
}

/**
 * Отрисовать path битового сигнала
 * @param svg
 * @param areas
 * @param area
 * @param areaIndex
 * @param signalHeight
 * @param y
 * @param startX
 * @param endX
 * @returns {*}
 */
export function createBitAreaPath(svg, areas, area, areaIndex, signalHeight, y, startX, endX) {
    let nextArea;
    let pathPattern=``;
    if(areas.length - 1 > areaIndex) {
        nextArea = areas[areaIndex+1];
        //endX+=nextArea.padding;
    }
    //Начало
    if(areaIndex > 0 && area.value !== areas[areaIndex-1].value) {
        if(area.value == 1) {
            pathPattern+= `M ${startX} ${y+signalHeight} L ${startX+8} ${y} H ${endX}`
        } else {
            pathPattern+= `M ${startX} ${y} L ${startX+8} ${y+signalHeight} H ${endX}`
        }
    } else {
        if(area.value == 1) {
            pathPattern+= ` M ${startX} ${y} H ${endX}`
        } else {
            pathPattern+= `M ${startX} ${y+signalHeight} H ${endX}`
        }
    }

    //Конец
    if(areaIndex !== areas.length - 1 && nextArea.value !== area.value) {
        if(area.value > nextArea.value) {
            pathPattern+=` L ${endX+8} ${y+signalHeight} H ${startX}`;
        } else {
            pathPattern+=` L ${endX+8} ${y} H ${startX}`;
        }
    } else {
        if(area.value == 1) {
            pathPattern+= ` V ${y+signalHeight} H ${startX}`
        } else {
            pathPattern+= ` V ${y} H ${startX}`
        }
    }

    //Замыкание
    if(areaIndex === 0 || areas[areaIndex-1].value === area.value) {
       if(area.value == 1) {
           pathPattern+= ` V ${y}`
       } else {
           pathPattern += ` V ${y+signalHeight}`
       }
    }
    pathPattern += ` Z`;

    return svg.path(pathPattern);
}

/**
 * Отрисовать path битового сигнала
 * @param svg
 * @param areas
 * @param area
 * @param areaIndex
 * @param signalHeight
 * @param y
 * @param startX
 * @param endX
 * @returns {*}
 */
export function createBitAreaPathNew(svg, areas, area, areaIndex, signalHeight, y, startX, endX) {
    let nextArea = null;
    let prevArea = null;
    let pathPattern=``;
    if(areas.length - 1 > areaIndex) {
        nextArea = areas[areaIndex+1];
    }
    if(areaIndex > 0) {
        prevArea = areas[areaIndex-1];
    }

    /**
     * Начало
     */
    if(area.value == 0) {
        if(prevArea !== null && prevArea.value !== area.value) {
            const prevValue = prevArea.value;
            if(prevValue == 1) {
                pathPattern+= `M ${startX} ${y} L ${startX+8} ${y+signalHeight} H ${endX}`
            }

            if(prevValue === 'z') {
                pathPattern+= `M ${startX} ${y+signalHeight/2} L ${startX+8} ${y+signalHeight} H ${endX}`
            }

        } else {
            pathPattern+= `M ${startX} ${y+signalHeight} H ${endX}`
        }
    }

    if(area.value == 1) {
        if(prevArea !== null && prevArea.value !== area.value) {
            const prevValue = prevArea.value;
            if(prevValue == 0) {
                pathPattern+= `M ${startX} ${y+signalHeight} L ${startX+8} ${y} H ${endX}`
            }

            if(prevValue === 'z') {
                pathPattern+= `M ${startX} ${y+signalHeight/2} L ${startX+8} ${y} H ${endX}`
            }

        } else {
            pathPattern+= `M ${startX} ${y} H ${endX}`
        }
    }

    if(area.value == 'z') {
        if(prevArea !== null && prevArea.value !== area.value) {
            const prevValue = prevArea.value;
            if(prevValue == 1) {
                pathPattern+= `M ${startX} ${y} L ${startX+8} ${y+signalHeight/2} H ${endX}`
            }

            if(prevValue == 0) {
                pathPattern+= `M ${startX} ${y+signalHeight} L ${startX+8} ${y+signalHeight/2} H ${endX}`
            }
        } else {
            pathPattern+= `M ${startX} ${y+signalHeight/2} H ${endX}`
        }
    }

    /**
     * Конец
     */
    if(area.value == 0) {
        if(nextArea !== null && nextArea.value !== area.value) {
            const nextValue = nextArea.value;
            if(nextValue == 1) {
                pathPattern+=` L ${endX+8} ${y} H ${startX}`
            }

            if(nextValue === 'z') {
                pathPattern+= `L ${endX+8} ${y+signalHeight/2} V ${y} H ${startX}`
            }

        } else {
            pathPattern+= ` V ${y} H ${startX}`
        }
    }

    if(area.value == 1) {
        if(nextArea !== null && nextArea.value !== area.value) {
            const nextValue = nextArea.value;
            if(nextValue == 0) {
                pathPattern+=` L ${endX+8} ${y+signalHeight} H ${startX}`
            }

            if(nextValue === 'z') {
                pathPattern+= `L ${endX+8} ${y+signalHeight/2} V ${y+signalHeight} H ${startX}`
            }

        } else {
            pathPattern+= ` V ${y+signalHeight} H ${startX}`
        }
    }

    if(area.value == 'z') {
        if(nextArea !== null && nextArea.value !== area.value) {
            const nextValue = nextArea.value;
            if(nextValue == 0) {
                pathPattern+=` L ${endX+8} ${y+signalHeight} H ${startX}`
            }

            if(nextValue == 1) {
                pathPattern+= ` L ${endX+8} ${y} V ${y+signalHeight} H ${startX}`
            }

        } else {
            pathPattern+= ` V ${y+signalHeight} H ${startX}`
        }
    }

    /**
     * Замыкание
     */
    //Замыкание
    if(areaIndex === 0 || prevArea.value === area.value) {
        if(area.value == 1) {
            pathPattern+= ` V ${y}`;
        } else if(area.value == 0){
            pathPattern += ` V ${y+signalHeight}`;
        } else if(area.value === 'z'&& prevArea.value) {
            pathPattern += ` V ${y+signalHeight/2}`;
        }
    }
    pathPattern += ` Z`;

    return svg.path(pathPattern);
}

export function drawBitArea(svg, areas, area, areaIndex, signalHeight, y, startX, endX) {
    let prevArea = null;
    let prevValue = null;

    if(areaIndex !== 0) {
        prevArea = areas[areaIndex-1];
        prevValue = prevArea.value;
    }

    if(area.value == 1) {
        if(prevArea != null && prevValue !== area.value) {
            if(prevValue == 0) {
                drawAreaLine(svg,startX, y+signalHeight, startX+8, y);
            }
            if(prevValue === 'z') {
                drawAreaLine(svg, startX, y+signalHeight/2, startX+8, y);
            }
            drawAreaLine(svg,startX+8, y, endX, y);
        } else {
            drawAreaLine(svg,startX, y, endX, y);
        }
    }

    if(area.value == 0) {
        if(prevArea != null && prevValue !== area.value) {
            if (prevValue == 1) {
                drawAreaLine(svg,startX, y, startX+8, y+signalHeight);
            }
            if(prevValue == 'z') {
                drawAreaLine(svg, startX, y+signalHeight/2, startX+8, y+signalHeight);
            }
            drawAreaLine(svg, startX+8, y+signalHeight, endX, y+signalHeight);
        } else {
            drawAreaLine(svg,startX, y+signalHeight, endX, y+signalHeight);
        }
    }

    if(area.value === 'z') {
        if(prevArea != null && prevValue !== area.value) {
            if(prevValue == 1) {
                drawAreaLine(svg,startX, y, startX+8, y+signalHeight/2);
            }
            if(prevValue == 0) {
                drawAreaLine(svg,startX, y+signalHeight, startX+8, y+signalHeight/2)
            }
            drawAreaLine(svg,startX+8, y+signalHeight/2, endX, y+signalHeight/2);
        } else {
            drawAreaLine(svg,startX, y+signalHeight/2, endX, y+signalHeight/2);
        }
    }
    if(area.padding !== 0 && prevValue != null) {
        if(prevValue == 1) {
            drawAreaLine(svg,startX-area.padding, y, startX, y);
        } else if(prevValue == 0) {
            drawAreaLine(svg,startX-area.padding, y+signalHeight, startX, y+signalHeight);
        } else if(prevArea === 'z') {
            drawAreaLine(svg,startX-area.padding, y+signalHeight/2, startX, y+signalHeight/2);
        }
    }
}

/**
 * Отрисовать линию сигнала
 * @param svg
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 */
export const drawAreaLine = (svg, x1,y1, x2,y2) => {
    svg.line(x1, y1, x2, y2).stroke({ color: 'blue', width: 2, linecap: 'round' });
};

export function drawGapMark(svg, x, y) {
    const waveWidth = 5;
    const waveHeight = 14;
    const sDistance = 3;
    x-=waveWidth/2;

    let wavePath = `M ${x} ${y+waveHeight/2} C ${x + waveWidth/2} ${y+waveHeight/2} ${x + waveWidth/2} ${y - waveHeight/2} ${x+waveWidth},${y - waveHeight/2}`;
    svg.path(wavePath)
        .fill('none')
        .stroke({ width: 1, color: 'black' });
    x+=sDistance
    wavePath =  `M ${x} ${y+waveHeight/2} C ${x + waveWidth/2} ${y+waveHeight/2} ${x + waveWidth/2} ${y - waveHeight/2} ${x+waveWidth},${y - waveHeight/2}`;
    svg.path(wavePath)
        .fill('none')
        .stroke({ width: 1, color: 'black' });
}