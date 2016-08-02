define([
    "Backbone",
    "Underscore",
    "jQuery",
    "Promise"
], function (Backbone, _, $, Promise) {
    "use strict";

    var ElemDispatcher =  Backbone.Model.extend({

        getDiv: function (classes) {
            var div = $("<div>");
            if (classes) {
                div.addClass(classes);
            }

            return div;
        },

        getElement: function (elemType, classes) {
            var elem = $(elemType).addClass(classes)
            return elem;
        },

        /**
         *
         * @param buttonText
         * @param buttonType:   btn-danger (red), btn-default(grey), btn-primary(blue),
         *                      btn-success(green), btn-info(torquise), btn-warning(yellow)
         * @param buttonSize: btn-lg, btn-sm, btn-xs, btn-flat, disabled
         */
        getButton: function (buttonText, buttonType, buttonSize) {
            var button = $('<button type="button"></button>');
            button.addClass('btn');
            button.text(buttonText ? buttonText : "שמור");
            if (buttonType) {button.addClass(buttonType);} else {button.addClass("btn-default")}
            if (buttonSize) {
                button.addClass(buttonSize);
            }

            return button;
        }

    });

    return new ElemDispatcher();

});
