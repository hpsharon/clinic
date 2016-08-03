define([
    "dist/js/controls/mgtPagingControl/mgtPagingControl.js",
    "dist/js/controls/helperControl/helperControl.js",
    "dist/js/controls/tableControl/tableControl.js",
    "Underscore",
    "jQuery",
    "AjaxControl",
    "dist/js/controls/organizationMgtControl/organizationMgtControlFields.js"
], function (MgtPagingControl, HelperControl, Table, _, $, AjaxControl, fields) {

    return MgtPagingControl.extend({

        _orgPromise: null,

        initialize: function () {
            var html = undefined;
            MgtPagingControl.prototype.initialize.call(this, "orgMgtControl", html, fields);
            this._orgPromise = AjaxControl.sendRequest("/getOrgsForUser");
            this.title("הארגון שלי");
            this._MAX_RECORDS_PER_PAGE = 5;
            _.bindAll(this, "setRawData", "_showTable");
            
        },

        render: function () {
            MgtPagingControl.prototype.render.call(this);
            this._orgPromise
                .then(this.setRawData)
                .then(this.populateFields)
                .then(this.addPaging)
                .then(this._showTable);
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

        displayAddedUpdatedOrg: function (org) {
            this._table.pushRowData(org, org.id);
        },

        _onTableCellClick: function (colName, rowId, rowData) {
            this.trigger("organizationMgt_OrgClick", rowData, rowId);
        },

        _showTable: function () {
            this._contentDiv.html(this._table.$el);
            this._hideLoadingOverlay();
        }

    });
});
