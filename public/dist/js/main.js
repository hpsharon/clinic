define([
    "Backbone",
    "Underscore",
    "jQuery",
    "dist/js/controls/baseControl/baseControl.js"
], function (Backbone, _, $, BaseControl) {

    return BaseControl.extend({
        el: document.body,

        initialize: function () {
            alert('main.js');
            BaseControl.prototype.initialize.call(this, "mainControl");

            this.render();
        },

        render: function () {

            BaseControl.prototype.render.call(this);

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
        }
    });


});