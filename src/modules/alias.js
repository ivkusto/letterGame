import * as PIXI from 'pixi.js';
//Create a Pixi Application
const letterStyle = new PIXI.TextStyle({
    fontFamily: 'Verdana',
    fontSize: 25,
    fill: '#89c1db',
    stroke: '#000',
    fontWeight: 'bold',
    strokeThickness: 4,
});

export let
    app = new PIXI.Application(
        {
            autoResize: true,
            resolution: devicePixelRatio
        }),
    Graphics = PIXI.Graphics,
    renderer = app.renderer;
export let
    settings = {
        speed: -0.6,
        hero: {
            color: 0xff910c,
            radius: 32,
            xPosition: 5
        },
        grid: {
            cellNum: 10,
            style: [4, 0x838383, 1]
        },
        letter: {
            style: letterStyle,
            size: 0.8
        }
    }

