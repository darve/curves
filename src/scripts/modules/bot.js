
'use strict';

var Vec = require('./Vec'),
    curve = require('./Curve');

module.exports = (function() {

    var Bot = function( posx, posy, speed, targetx, targety, gfx ) {

        var _ = this;

        _.pos = new Vec(posx, posy);
        _.target = new Vec(targetx, targety);
        _.vector = _.target.minusNew(_.target);
        _.speed = speed;

        _.history = [];
        _.alive = true;
        _.gfx = gfx;
        _.framecount = 0;
    };

    Bot.prototype = {

        draw: function() {
            var _ = this;
            _.gfx.clear();
            // _.gfx.beginFill(0xFFFFFF, 1);
            // _.gfx.lineStyle(1, 0xFFFFFF, 1);
            // _.gfx.drawCircle(_.pos.x, _.pos.y, 5);
            curve.draw(_.gfx, _.history, 0.38888, 0xFFFFFF);
        },

        integrate: function(power) {
            var _ = this;

            if ( !_.pos.isCloseTo(_.target, 10) ) {
                _.distance = _.pos.minusNew( _.target ).magnitude();
                _.angleVector = _.pos.minusNew( _.target).normalise();
                _.vector.minusEq( _.angleVector ).normalise();
                _.pos.plusEq( _.vector.normalise().multiplyEq( 4+_.distance/80 ) );
            }


            _.history.push(_.pos.x);
            _.history.push(_.pos.y);

            if ( _.history.length > 30 ) {
                _.history.shift();
                _.history.shift();
            }



            _.draw();
        }
    };

    return Bot;
})();
