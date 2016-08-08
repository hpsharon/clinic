define([
    "dist/js/controls/baseControl/baseControl.js",
    "dist/js/controls/helperControl/helperControl.js",
    "dist/js/controls/therapistMgtControl/therapistMgtControl.js",
    "dist/js/controls/therapistTabControl/therapistTabControl.js",
    "Underscore",
    "jQuery",
    "AjaxControl",
    "text!/dist/js/controls/therapistPageControl/therapistPageControl.html",
], function (BaseControl, HelperControl, TherapistMgtControl, TherapistTabControl, _, $, AjaxControl, html) {

    return BaseControl.extend({

        _therapistMgtCtrl: null,
        _therapistTabCtrl: null,


        initialize: function () {
            BaseControl.prototype.initialize.call(this, "patientPageControl", html);
            this._therapistMgtCtrl = new TherapistMgtControl();
            this._therapistTabCtrl = new TherapistTabControl();
            this._bindEvents();

        },

        render: function () {
            BaseControl.prototype.render.call(this);
            this.$el.find(".mainPage_therapistMgt").html(this._therapistMgtCtrl.$el);
            this.$el.find(".mainPage_organizationTabDetails").html(this._therapistTabCtrl.$el);
            this._therapistMgtCtrl.render();
            this._therapistTabCtrl.render();

            return this;
        },

        events: function () {
            return _.extend({}, BaseControl.prototype.events, {

            });
        },

        _bindEvents: function () {
            this.bindEvent(this._therapistMgtCtrl, "therapistSelect", this._onTherapistSelect)
        },

        _onTherapistSelect: function (therapistId) {
            this._therapistTabCtrl.showTherapistDetails(therapistId);
        }

    });
});
