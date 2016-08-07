define([
    "dist/js/controls/mgtPagingControl/mgtPagingControl.js",
    "dist/js/controls/helperControl/helperControl.js",
    "dist/js/controls/tableControl/tableControl.js",
    "dist/js/controls/orgHolder/orgHolder.js",
    "Underscore",
    "jQuery",
    "AjaxControl",
    "dist/js/controls/therapistMgtControl/therapistMgtControlFields.js"
], function (MgtPagingControl, HelperControl, Table, OrgHolder, _, $, AjaxControl, fields) {

    return MgtPagingControl.extend({

        _thrPromise: null,

        initialize: function () {
            var html = undefined;
            MgtPagingControl.prototype.initialize.call(this, "therapistMgtControl", html, fields);
            this.title("רשימת מטפלים");
            this._MAX_RECORDS_PER_PAGE = 10;
            this.bindEvent(OrgHolder, "orgChange", this._onOrgChange)

            _.bindAll(this, "_handleTherapistList", "setRawData");
        },

        render: function () {
            MgtPagingControl.prototype.render.call(this);
            this.removeCloseButton();
            this._hideLoadingOverlay();
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

        _onOrgChange: function (orgId) {
            AjaxControl.sendRequest("/getTherapistsForOrgId", {orgId: orgId})
                .then(this.setRawData)
                .then(this._handleTherapistList)
        },

        _handleTherapistList: function (therapists) {
            console.log(therapists);
            this.populateFields(therapists)
        }
        

    });
});
