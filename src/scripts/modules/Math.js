
'use strict';

module.exports = (function() {

    function rand(num, dec) {
        var random = Math.random() * num;
        return Number(random.toFixed(dec));
    }

    function diff(a, b) {
        return Math.abs(a-b);
    }

    return {
        rand: rand,
        diff: diff
    };
})();
