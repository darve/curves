
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
        grid = [],
        bots = [],
        pos = [],

        gfx = new PIXI.Graphics(),
        gridgfx = new PIXI.Graphics(),
        target = new Vec(w/2, h/2),
        targetgfx = new PIXI.Graphics(),

        // Some rad colours, should we need any.
        colours = [
            0xe5a629,
            0xe64040,
            0xd1c8b2,
            0x208c86
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
        var dead = [];
        if (delta > interval) {
            then = now - (delta % interval);
            // gfx.clear();
            bots.forEach(function(bot, index) {
                if ( bot.alive ) bot.integrate();
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
        });

        for ( var f = 0; f < 3; f++ ) {
            bots.push( new Bot(
                    Math.floor(Math.random() * w), Math.floor(Math.random() * h),
                    // 300, 200,
                    1,
                    target.x, target.y,
                    new PIXI.Graphics()
                )
            );

            stage.addChild(bots[bots.length-1].gfx);
        }

        // for ( var y = 0; y < 5; y++ ) {
        //     for ( var x = 0; x < 7; x++ ) {
        //         gridgfx.beginFill(randomColour(), 1);
        //         gridgfx.lineStyle(2, 0x38092F, 1);
        //         gridgfx.drawRect((w/2)-140+(40*x),(h/2)-100+(40*y), 40, 40);
        //     }
        // }
        // stage.addChild(gridgfx);

        targetgfx.beginFill(0xFFFFFF, 1);
        targetgfx.lineStyle(1, 0xFFFFFF, 1);
        targetgfx.drawCircle(target.x, target.y, 10);
        stage.addChild(targetgfx);
        stage.addChild(gfx);

        // Start the rendering loop wahey oh yeah
        window.requestAnimationFrame(render);
    }

    $(init);

})(window,document,document.querySelectorAll('canvas')[0]);
