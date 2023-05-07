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