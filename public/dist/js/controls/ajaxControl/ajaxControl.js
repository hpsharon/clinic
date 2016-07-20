define([
    "Backbone",
    "Underscore",
    "jQuery",
    "Promise"
], function (Backbone, _, $, Promise) {
    "use strict";

    var AjaxControl =  Backbone.Model.extend({
        _TIMEOUT: 500000,

        initialize: function () {

        },

        sendRequest: function(url, requestData) {
            var promise = new Promise(function (resolve, reject){
                $.ajax({
                    url : url,
                    data : JSON.stringify(requestData)
                }).done(resolve).fail(reject);
            }.bind(this))
                .timeout(this._TIMEOUT, this._getTimeoutStr(datatype))
                .catch(this._defaultCatcher);

            return promise;
        },

        _getTimeoutStr: function (url) {
            return "Warning! Callback has yet to be received: " + url;
        },

        _defaultCatcher: function () {
            console.log(arguments);
            console.log("this is the default catcher, ajaxControl");
        }

    });

    return new AjaxControl();

});

