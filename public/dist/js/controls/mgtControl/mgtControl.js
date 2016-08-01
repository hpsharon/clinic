define([
    "dist/js/controls/boxControl/boxControl.js",
    "dist/js/controls/helperControl/helperControl.js",
    "dist/js/controls/tableControl/tableControl.js",
    "Underscore",
    "jQuery",
    "AjaxControl"
], function (BoxControl, HelperControl, Table, _, $, AjaxControl) {

    return BoxControl.extend({

        _table: null,
        _fields: null,

        initialize: function (type, html, fields, css) {
            BoxControl.prototype.initialize.call(this, type, html, css);
            this.fields(fields);
            this._table = new Table(fields);

            _.bindAll(this, "populateFields");
        },

        render: function () {
            BoxControl.prototype.render.call(this);
            this._table.render();
            return this;
        },

        events: function () {
            return _.extend({}, BoxControl.prototype.events, {

            });
        },

        populateFields: function (data) {
            this._table.populateFields(data);
        },

        fields: function (fields) {
            var result = this._fields;
            if (typeof fields !== "undefined") {
                this._fields = fields;
                result = this;
            }
            return result;
        }
          

    });
});