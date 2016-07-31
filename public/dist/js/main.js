define([
    "Underscore",
    "jQuery",
    "AjaxControl",
    "dist/js/controls/baseControl/baseControl.js",
    "dist/js/controls/headerControl/headerControl.js",
    "dist/js/controls/sidebarControl/sidebarControl.js",
    "dist/js/controls/contentControl/contentControl.js"
], function (_, $, AjaxControl, BaseControl, HeaderControl, SidebarControl, ContentControl) {

    return BaseControl.extend({
        el: document.body,
        _loggedInUser: null,
        _loggedInUserPromise: null,
        _headerControl: null,
        _sidebarControl: null,
        _contentControl: null,

        initialize: function () {
            BaseControl.prototype.initialize.call(this, "mainControl");

            this._loggedInUserPromise = AjaxControl.sendRequest("/getLoggedInUser");
            this._headerControl = new HeaderControl();
            this._sidebarControl = new SidebarControl();
            this._contentControl = new ContentControl();

            _.bindAll(this, "_storeLoggedInUser", "_renderSubControls");
            this.render();
        },

        render: function () {
            BaseControl.prototype.render.call(this);
            this._loggedInUserPromise
                .then(this._storeLoggedInUser)
                .then(this._renderSubControls);

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
            this.$el.find(".sidebarWrapper").html(this._sidebarControl.$el);
            this._sidebarControl.render(this._loggedInUser);

            this.$el.find(".headerWrapper").html(this._headerControl.$el);
            this._headerControl.render(this._loggedInUser);
            
            this.$el.find(".content-wrapper").html(this._contentControl.$el);
            this._contentControl.render();
        }

    });
});