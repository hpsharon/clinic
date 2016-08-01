define([
    "dist/js/controls/mgtPagingControl/mgtPagingControl.js",
    "dist/js/controls/helperControl/helperControl.js",
    "dist/js/controls/tableControl/tableControl.js",
    "Underscore",
    "jQuery",
    "AjaxControl",
    "text!/dist/js/controls/organizationMgtControl/organizationMgtControl.html",
    "dist/js/controls/organizationMgtControl/organizationMgtControlFields.js"
], function (MgtPagingControl, HelperControl, Table, _, $, AjaxControl, html, fields) {

    return MgtPagingControl.extend({

        _orgPromise: null,

        initialize: function () {
            MgtPagingControl.prototype.initialize.call(this, "orgMgtControl", html, fields);
            this._orgPromise = AjaxControl.sendRequest("/getOrgsForUser");
            this.title("הארגון שלי");

            _.bindAll(this, "setRawData");
            
        },

        render: function () {
            MgtPagingControl.prototype.render.call(this);
            this._contentDiv.html(this._table.$el);
            this._orgPromise
                .then(this.setRawData)
                .then(this.populateFields)
                .then(this.addPaging);
            this.removeCloseButton();
            return this;
        },

        events: function () {
            return _.extend({}, MgtPagingControl.prototype.events.call(this), {

            });
        },

        setRawData: function (data) {
            this.rawData(data);
            return data;
        },

        populateFields: function (data) {
            MgtPagingControl.prototype.populateFields.call(this, data);
        },

        

    });
});
