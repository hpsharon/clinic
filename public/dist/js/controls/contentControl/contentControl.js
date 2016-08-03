define([
    "dist/js/controls/baseControl/baseControl.js",
    "dist/js/controls/helperControl/helperControl.js",
    "Underscore",
    "jQuery",
    "AjaxControl",
    "text!/dist/js/controls/contentControl/contentControl.html"
], function (BaseControl, HelperControl, _, $, AjaxControl, html) {

    return BaseControl.extend({
        
        _contentCtor: null,
        _pageTitle: null,

        initialize: function (type, contentCtor) {
            BaseControl.prototype.initialize.call(this, type, html);
            this._contentCtor = new contentCtor();
        },

        render: function () {
            BaseControl.prototype.render.call(this);
            this.$el.find(".content").html(this._contentCtor.$el);
            this._contentCtor.render();
            this.$el.find(".contentControlTitle").text(this._pageTitle);
            return this;
        },

        events: function () {
            return _.extend({}, BaseControl.prototype.events, {

            });
        }

    });
});