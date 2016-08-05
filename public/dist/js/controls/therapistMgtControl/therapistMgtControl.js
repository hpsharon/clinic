define([
    "dist/js/controls/mgtPagingControl/mgtPagingControl.js",
    "dist/js/controls/helperControl/helperControl.js",
    "dist/js/controls/tableControl/tableControl.js",
    "Underscore",
    "jQuery",
    "AjaxControl",
    "dist/js/controls/therapistMgtControl/therapistMgtControlFields.js"
], function (MgtPagingControl, HelperControl, Table, _, $, AjaxControl, fields) {

    return MgtPagingControl.extend({

        _thrPromise: null,
        _allOrgsPromise: null,

        initialize: function () {
            var html = undefined;
            MgtPagingControl.prototype.initialize.call(this, "therapistMgtControl", html, fields);
            //this.thrPromise = AjaxControl.sendRequest("/getOrgsForUser");
            this._allOrgsPromise = AjaxControl.sendRequest("/getAllOrgs");
            this.title("רשימת מטפלים");
            this._MAX_RECORDS_PER_PAGE = 10;
            // _.bindAll(this, "setRawData", "_showTable");

        },

        render: function () {
            MgtPagingControl.prototype.render.call(this);
            this._allOrgsPromise
                .then(this._populateOrgSelectBox);
            // this.thrPromise
            //     .then(this.setRawData)
            //     .then(this.populateFields)
            //     .then(this.addPaging)
            //     .then(this._showTable);
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

        _populateOrgSelectBox: function (orgs) {
            console.log(orgs);
        }

    });
});
