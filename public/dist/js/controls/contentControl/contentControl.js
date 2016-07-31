define([
    "dist/js/controls/baseControl/baseControl.js",
    "Underscore",
    "jQuery",
    "AjaxControl",
    "text!/dist/js/controls/contentControl/contentControl.html"
], function (BaseControl, _, $, AjaxControl, html) {

    return BaseControl.extend({

        _loggedInUser: null,

        initialize: function () {
            BaseControl.prototype.initialize.call(this, "contentControl", html);
        },

        render: function (user) {
            BaseControl.prototype.render.call(this);
            return this;
        },

        events: function () {
            return _.extend({}, BaseControl.prototype.events, {

            });
        }

    });
});