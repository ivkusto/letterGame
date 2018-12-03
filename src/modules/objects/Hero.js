import { app, Graphics, settings } from '../alias';
import { getGridInfo, setPositionByCoords } from '../utils/screenHelper';

const
    options = settings.hero,
    speed = settings.speed;
let
    screenWidth, screenHeight, cellSize, radius, coords, lastKey;

export
    let hero = (function () {
        let circle = new Graphics();

        return {
            init: () => {
                _initEvents();
                ({ screenWidth, screenHeight, cellSize } = getGridInfo());
                circle.beginFill(options.color);
                radius = Math.floor(cellSize / 2)
                circle.drawCircle(0, 0, radius);
                circle.endFill();
                coords = [options.xPosition, Math.floor(settings.grid.cellNum / 2)];
                setPositionByCoords(circle, ...coords);

                app.stage.addChild(circle);
            },

            getCoords: () => coords,
            move: () => {
                circle.x += speed;
            },
            checkMovement: (availableMovement) => {
                if (availableMovement[lastKey]) {
                    coords = availableMovement['heroCoords'];
                    let [i, j] = availableMovement[lastKey];
                    coords[0] += i;
                    coords[1] += j;
                    circle.x += cellSize * i;
                    circle.y += cellSize * j;
                    lastKey = null;
                }
                return coords;
            }
        }
    })();

function _initEvents() {
    document.addEventListener('keypress', (event) => {
        lastKey = event.key.toUpperCase();
    });
}