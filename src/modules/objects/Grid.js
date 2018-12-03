import { app, Graphics, settings } from '../alias';
import { getGridInfo } from '../Utils/screenHelper';

const
    speed = settings.speed,
    options = settings.grid;
let
    screenWidth, screenHeight, cellSize;

export
    let grid = (function () {
        let line = new Graphics();
        return {
            init: function () {
                ({ screenWidth, screenHeight, cellSize } = getGridInfo());

                line.lineStyle(...options.style);

                for (let i = 0; i < 2 * screenWidth; i += cellSize) {
                    line.moveTo(i, 0);
                    line.lineTo(i, screenHeight - cellSize);
                }
                for (let i = cellSize / 2; i < (screenHeight - cellSize); i += cellSize) {
                    line.moveTo(0, i);
                    line.lineTo(2 * screenWidth, i);
                }

                line.x = cellSize / 2;
                line.y = cellSize / 2;
                app.stage.addChild(line);
            },
            getLine: function () {
                return line;
            },
            move: function () {
                //turn back grid for loop effect
                Math.abs(line.x + cellSize * 2) < Math.abs(speed) ?
                    line.x = speed :
                    line.x += speed;
            }
        }
    })();