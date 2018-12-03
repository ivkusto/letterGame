import { app, settings } from '../alias';
let cellSize;

export let getGridInfo = () => {
    cellSize = app.screen.height / (settings.grid.cellNum + 2);
    return {
        screenWidth: app.screen.width,
        screenHeight: app.screen.height,
        cellSize: cellSize,
        gridSize: {
            height: settings.grid.cellNum,
            width: Math.floor(app.screen.width / cellSize) + 2
        }
    }
}

//set global object postion by coords and row, column numbers
export let setPositionByCoords = (pixiObject, i, j) => {
    pixiObject.x = cellSize * i + cellSize;
    pixiObject.y = cellSize * j + cellSize * 1.5;
}
