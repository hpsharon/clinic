define([
    "dist/js/controls/baseControl/baseControl.js",
    "dist/js/controls/helperControl/helperControl.js",
    "Underscore",
    "jQuery",
    "AjaxControl",
    "dist/js/controls/mainPageControl/mainPageControl.js",
    "text!/dist/js/controls/contentControl/contentControl.html"
], function (BaseControl, HelperControl, _, $, AjaxControl, MainPageControl, html) {

    return BaseControl.extend({
        
        _mainPageControl: null,
        

        initialize: function () {
            BaseControl.prototype.initialize.call(this, "contentControl", html);
            this._mainPageControl = new MainPageControl();
        },

        render: function () {
            BaseControl.prototype.render.call(this);
            this.$el.find(".content").html(this._mainPageControl.$el);
            this._mainPageControl.render();
            return this;
        },

        events: function () {
            return _.extend({}, BaseControl.prototype.events, {

            });
        }

    });
});