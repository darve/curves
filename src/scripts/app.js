
'use strict';

/**
 * Smash targets below this line
 * -----------------------------
 */

var Vec     = require('./modules/Vec'),
    PIXI    = require('pixi'),
    $       = require('jquery'),
    curve   = require('./modules/Curve'),
    Bot     = require('./modules/Bot');

    window.Vec = Vec;

(function(win, doc, c) {

    var stage,
        renderer,
        w = win.innerWidth,
        h = win.innerHeight,

        // These are all used for the main rendering loop
        now,
        then = Date.now(),
        interval = 1000/60,
        delta,

        bastard = [],

        bots = [],
        pos = [],

        gfx = new PIXI.Graphics(),

        target = new Vec(w/2, h/2),
        targetgfx = new PIXI.Graphics(),

        // Some rad colours, should we need any.
        colours = [
            0xed5565,
            0xda4453,
            0xfc6e51,
            0xe9573f,
            0xffce54,
            0xfcbb42,
            0xa0d468,
            0x8cc152,
            0x48cfad,
            0x37bc9b,
            0x4fc1e9,
            0x3bafda,
            0x5d9cec,
            0x4a89dc,
            0xac92ec,
            0x967adc,
            0xec87c0,
            0xd770ad,
            0xf5f7fa,
            0xe6e9ed,
            0xccd1d9,
            0xaab2bd,
            0x656d78,
            0x434a54
        ];

    function randomColour() {
        return colours[Math.floor(Math.random() * colours.length)];
    }

    /**
     * Used to limit the frames per second the app runs at.
     */
    function render() {
        window.requestAnimationFrame(render);
        now = Date.now();
        delta = now - then;

        if (delta > interval) {
            then = now - (delta % interval);
            // gfx.clear();
            bots.forEach(function(bot, index) {
                bot.integrate();
            });

            renderer.render(stage);
        }
    }

    function init() {

        stage = new PIXI.Container();
        renderer = new PIXI.WebGLRenderer(w, h, {
            view: c,
            backgroundColor: 0x38092F,
            antialias: true
        });

        $('canvas').on('click', function(e) {
            e.preventDefault();
            pos.push(e.pageX);
            pos.push(e.pageY);

            // var temp = new Vec(e.pageX, e.pageY);
            // console.log( target.minusNew( temp ).normalise().reverse().angle(true) );

            bots.push( new Bot(
                    e.pageX, e.pageY,
                    4,
                    target.x, target.y,
                    new PIXI.Graphics()
                )
            );

            stage.addChild(bots[bots.length-1].gfx);

            // if ( pos.length > 6 ) {
            //     gfx.clear();
            //     curve.draw(gfx, pos, 0.38888, randomColour());
            // }
        });

        // for ( var f = 0; f < 100; f ++ ) {
            bots.push( new Bot(
                    Math.floor(Math.random() * w), Math.floor(Math.random() * h),
                    // 300, 200,
                    1,
                    target.x, target.y,
                    new PIXI.Graphics()
                )
            );

            stage.addChild(bots[bots.length-1].gfx);
        // }

        // targetgfx.beginFill(0xFFFFFF, 1);
        // targetgfx.lineStyle(1, 0xFFFFFF, 1);
        // targetgfx.drawCircle(target.x, target.y, 10);
        // stage.addChild(targetgfx);
        stage.addChild(gfx);

        // Start the rendering loop wahey oh yeah
        window.requestAnimationFrame(render);
    }

    $(init);

})(window,document,document.querySelectorAll('canvas')[0]);
