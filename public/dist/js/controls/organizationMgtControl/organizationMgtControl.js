define([
    "dist/js/controls/mgtControl/mgtControl.js",
    "dist/js/controls/helperControl/helperControl.js",
    "dist/js/controls/tableControl/tableControl.js",
    "Underscore",
    "jQuery",
    "AjaxControl",
    "text!/dist/js/controls/organizationMgtControl/organizationMgtControl.html",
    "dist/js/controls/organizationMgtControl/organizationMgtControlFields.js"
], function (MgtControl, HelperControl, Table, _, $, AjaxControl, html, fields) {

    return MgtControl.extend({

        _orgPromise: null,

        initialize: function () {
            MgtControl.prototype.initialize.call(this, "headerControl", html, fields);
            this._orgPromise = AjaxControl.sendRequest("/getOrgsForUser");
            
        },

        render: function () {
            MgtControl.prototype.render.call(this);
            this.$el.find(".box-body").html(this._table.$el);
            this._orgPromise
                .then(this.populateFields);
            return this;
        },

        events: function () {
            return _.extend({}, MgtControl.prototype.events, {

            });
        }

    });
});
