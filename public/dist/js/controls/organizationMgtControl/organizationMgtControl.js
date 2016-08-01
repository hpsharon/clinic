define([
    "dist/js/controls/baseControl/baseControl.js",
    "dist/js/controls/helperControl/helperControl.js",
    "dist/js/controls/tableControl/tableControl.js",
    "Underscore",
    "jQuery",
    "AjaxControl",
    "text!/dist/js/controls/organizationMgtControl/organizationMgtControl.html",
    "dist/js/controls/organizationMgtControl/organizationMgtControlFields.js"
], function (BaseControl, HelperControl, Table, _, $, AjaxControl, html, fields) {

    return BaseControl.extend({

        _orgPromise: null,
        _orgTable: null,

        initialize: function () {
            BaseControl.prototype.initialize.call(this, "headerControl", html);
            this._orgPromise = AjaxControl.sendRequest("/getOrgsForUser");
            this._orgTable = new Table(fields);

            _.bindAll(this, "populateFields");

        },

        render: function () {
            BaseControl.prototype.render.call(this);
            this.$el.find(".box-body").html(this._orgTable.$el);
            this._orgTable.render();
            this._orgPromise
                .then(this.populateFields);
            return this;
        },

        events: function () {
            return _.extend({}, BaseControl.prototype.events, {

            });
        },

        populateFields: function (data) {
            console.log(data);
            this._orgTable.populateFields(data);
        }

    });
});
