define([
    "Backbone",
    "Underscore",
    "jQuery"
], function (Backbone, _, $) {
    "use strict";

    return Backbone.View.extend({

        _template: null,
        _type: null,
        _html: null,
        _css: null,
        template: null,
        _widgetEvents: null,
        _eventId: 0,

        initialize: function (type, html, css) {
            _.extend(this, Backbone.Events);
            if (typeof type !== "undefined") { this.type(type); }
            if (typeof html !== "undefined") { this.html(html); }
            if (typeof css  !== "undefined") { this.css(css);   }
            this._widgetEvents = {};

        },

        render: function () {
            if (this.html()){
                this.template = _.template(this._html);
                var compiledTemplate = this.template({});
                this.$el.html(compiledTemplate);
                this.$el.addClass(this._type + "_cont");
            }
            if (this.css()) {
                $('head').append('<style type="text/css">' + this.css() +  '</style>');
            }
            return this;
        },

        events: function () {

        },

        type: function (type) {
            var result = this._type;
            if (typeof type !== "undefined") {
                this._type = type;
                result = this;
            }
            return result;
        },

        html: function (html) {
            var result = this._html;
            if (typeof html !== "undefined") {
                this._html = html;
                result = this;
            }
            return result;
        },

        css: function (css) {
            var result = this._css;
            if (typeof css !== "undefined") {
                this._css = css;
                result = this;
            }
            return result;
        },

        bindEvent: function (obj, type, callback) {
            this._widgetEvents[++this._eventId] = {
                obj: obj,
                type: type,
                callback: callback
            };

            obj.on(type, callback, this);

            return this;
        },

        loadCss: function (css) {
            $('head').append('<style type="text/css">' + css +  '</style>');
        }
    });

});

