define([
    "dist/js/controls/contentControl/contentControl.js",
    "dist/js/controls/helperControl/helperControl.js",
    "Underscore",
    "jQuery",
    "AjaxControl",
    "dist/js/controls/mainPageControl/mainPageControl.js",
], function (ContentControl, HelperControl, _, $, AjaxControl, MainPageControl) {

    return ContentControl.extend({

        initialize: function () {
            ContentControl.prototype.initialize.call(this, "mainPageControl", MainPageControl);
            this._pageTitle = "הארגון שלי";
        },

        render: function () {
            ContentControl.prototype.render.call(this);
            return this;
        },

        events: function () {
            return _.extend({}, ContentControl.prototype.events.call(this), {

            });
        }

    });
});