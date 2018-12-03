import { app, settings } from '../alias';
import { getGridInfo, setPositionByCoords } from '../Utils/screenHelper';

const
    speed = settings.speed;
let
    screenWidth, screenHeight, cellSize,
    gridSize, letterTmp, heroCoords,
    //two-dimensional array of letters
    lettersArray = [],
    letterStyle = settings.letter.style;

export
    let letters = (() => {

        return {
            init: () => {
                ({ screenWidth, screenHeight, cellSize, gridSize } = getGridInfo());
                letterStyle.fontSize = cellSize * settings.letter.size;

                for (let i = 0; i < gridSize.width; i++) {
                    _fillColumn(i);
                }
            },

            move: () => {
               //shift letters when first collumn is out of viewport
                if (lettersArray[0][0].x + cellSize <= 0) {
                   //destroy letter object from first column
                    lettersArray[0].forEach(letter => letter.destroy());
                    //shift
                    for (let i = 0; i < lettersArray.length - 1; i++) {
                        lettersArray[i] = lettersArray[i + 1];
                    }
                    //fill last column with new letters
                    _fillColumn(lettersArray.length - 1, -1);
                    //change hero column coords, cos of shifting
                    heroCoords[0]--;
                }
                lettersArray.forEach(arr => {
                   //move each letter
                    arr.forEach(letter => letter.x += speed)
                })
            },

            /**
             * Set new hero position 
             * @param coords
             */
            setHeroCoords: (coords) => {
                //show last letter where player stayed
                heroCoords && _setLetterVisible(...heroCoords, true);
                heroCoords = coords;
                //hide letter where player stay now
                _setLetterVisible(...heroCoords, false);

                //change visibility of letter by coord
                function _setLetterVisible(i, j, isVisible) {
                    lettersArray[i][j].visible = isVisible
                }
            },

            /**
             * get available letter for hero moving
             * @return {Object{key: [xOffset, yOffset] }} availableMovement
             */
            getAvailableMovement: () => {
                let
                    availableMovement = { heroCoords: [...heroCoords] },
                    neighbourLetter;

                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        if ((i == 0 && j == 0) ||
                            (heroCoords[0] + i < 0) ||
                            (heroCoords[1] + j < 0)) continue;
                        
                        //get neighbour letter object
                        neighbourLetter = lettersArray[heroCoords[0] + i][heroCoords[1] + j];
                        availableMovement[neighbourLetter.text] = [i, j];
                    }
                }

                return availableMovement;
            },

            checkWinLose: () => {
                if (heroCoords[0] < 0) {
                    alert('WASTED');
                }
                if (heroCoords[0] === (lettersArray.length - 2)) {
                    alert('WIN');
                }
            }

        }
    })();


let aCharCode = 'A'.charCodeAt(),
    zCharCode = 'Z'.charCodeAt();

//get random letter
//TODO: generate different neighbour letter 
function _getRandomLetter() {
    return String.fromCharCode(
        aCharCode + Math.floor(Math.random() * (zCharCode - aCharCode + 1))
    )
}

/**
 * 
 * @param {Number} i - column number in array
 * @param {Number} deviation - physical deviation of column
 */
function _fillColumn(i, deviation = 0) {
    lettersArray[i] = [];
    for (let j = 0; j < gridSize.height; j++) {
        letterTmp = new PIXI.Text(_getRandomLetter(), letterStyle);
        
        //set global position by coords in array
        setPositionByCoords(letterTmp, i + deviation, j);
        //center letter
        letterTmp.anchor.set(0.5);
        //add to scene and array
        app.stage.addChild(letterTmp);
        lettersArray[i].push(letterTmp);
    }
}
