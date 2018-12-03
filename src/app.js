import { app, Graphics, renderer, settings } from './modules/alias';
import { grid } from './modules/objects/Grid';
import { hero } from './modules/objects/Hero';
import { letters } from './modules/objects/Letters';

let state;
let gameObjects = [grid, hero, letters];
let setup = () => {
    //prepare view
    _setView();
    //initialize objects
    _initObjects();
    //Set the game state
    state = play;

    //Start the game loop 
    app.ticker.add(delta => gameLoop(delta));

    //set the canvas
    function _setView() {
        renderer.backgroundColor = 0xFFFFFF;
        //set adaptive
        renderer.view.style.position = "absolute";
        renderer.view.style.display = "block";
        renderer.autoResize = true;

        renderer.resize(window.innerWidth, window.innerHeight);
        //Add the canvas that Pixi automatically created for you to the HTML document
        document.body.appendChild(app.view);
    }

    //init game objects
    function _initObjects() {
        gameObjects.forEach(object => object.init());
        letters.setHeroCoords(hero.getCoords());
    }
}


function gameLoop(delta) {
    //Update the current game state:
    state(delta);
    letters.checkWinLose();

}

function play(delta) {
   //update hero coords depends on key pressed
    letters.setHeroCoords(
        hero.checkMovement(
            letters.getAvailableMovement()));

      
    gameObjects.forEach(object => object.move());
}

setup();