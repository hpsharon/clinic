define([
    "Backbone",
    "Underscore",
    "jQuery",
    "Promise"
], function (Backbone, _, $, Promise) {
    "use strict";

    var HelperControl =  Backbone.Model.extend({
        _user: null,

        user: function (user) {
            var result = this._user;
            if (typeof user !== "undefined") {
                this._user = user;
                result = this;
            }
            return result;
        },

        isValidKeyCode: function (keycode) {
            var valid =
                (keycode > 47 && keycode < 58)   || // number keys
                keycode == 32 || keycode == 13   || // spacebar & return key(s) (if you want to allow carriage returns)
                (keycode > 64 && keycode < 91)   || // letter keys
                (keycode > 95 && keycode < 112)  || // numpad keys
                (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
                (keycode > 218 && keycode < 223);   // [\]' (in order)

            return valid;
        },

        stringNotEmptyValidator: function (str) {
            return str.trim() != "";
        }


    });

    return new HelperControl();

});
