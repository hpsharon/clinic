define([
    "Underscore",
    "jQuery",
    "AjaxControl",
    "dist/js/controls/baseControl/baseControl.js",
    "dist/js/controls/headerControl/headerControl.js"
], function (_, $, AjaxControl, BaseControl, HeaderControl) {

    return BaseControl.extend({
        el: document.body,
        _loggedInUser: null,
        _loggedInUserPromise: null,
        _headerControl: null,

        initialize: function () {
            console.log("main.js init");
            BaseControl.prototype.initialize.call(this, "mainControl");
            this._loggedInUserPromise = AjaxControl.sendRequest("/getLoggedInUser");
            this._headerControl = new HeaderControl();
            _.bindAll(this, "_storeLoggedInUser", "_renderSubControls");
            this.render();
        },

        render: function () {
            console.log("render.js init");
            BaseControl.prototype.render.call(this);
            this._loggedInUserPromise
                .then(this._storeLoggedInUser)
                .then(this._renderSubControls);
            this.$el.find(".headerWrapper").html(this._headerControl.$el);

            // a fix for hovering over select2 boxes.
            // the tooltip on hovering over the box is pushed in the bottom of the doc, making the scroll bars to display
            // and pushes the whole screen rightwards.
            // this css patch hides the tooltip so the screen won't be pushed by the scroll bars.
            this.loadCss(".ui-tooltip.ui-widget.ui-corner-all.ui-widget-content {display: none !important}");

            return this;
        },

        events: function () {
            return _.extend({}, BaseControl.prototype.events, {

            });
        },

        _storeLoggedInUser: function (user) {
            this._loggedInUser = user;
        },

        _renderSubControls: function () {
            console.log("rendering subControls");
            this._headerControl.render(this._loggedInUser);
        }

    });
});