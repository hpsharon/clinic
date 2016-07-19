define([
    "jQuery",
    "Underscore",
    "Backbone",
    "/dist/js/main.js"
], function ($, _, Backbone, Main) {
    var initialize = function () {
        new Main();
    };

    return {
        initialize: initialize
    };
});
