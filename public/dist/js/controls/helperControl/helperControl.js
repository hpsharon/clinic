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
        }

    });

    return new HelperControl();

});
