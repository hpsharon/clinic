define([
    "dist/js/controls/baseControl/baseControl.js",
    "dist/js/controls/helperControl/helperControl.js",
    "dist/js/controls/therapistMgtControl/therapistMgtControl.js",
    "dist/js/controls/tabControl/tabControl.js",
    "Underscore",
    "jQuery",
    "AjaxControl",
    "text!/dist/js/controls/therapistPageControl/therapistPageControl.html",
], function (BaseControl, HelperControl, TherapistMgtControl, TabControl, _, $, AjaxControl, html) {

    return BaseControl.extend({

        _therapistMgtCtrl: null,
        _therapistDetailsCtrl: null,


        initialize: function () {
            BaseControl.prototype.initialize.call(this, "patientPageControl", html);
            this._therapistMgtCtrl = new TherapistMgtControl();
            this._therapistDetailsCtrl = new TabControl();

        },

        render: function () {
            BaseControl.prototype.render.call(this);
            this.$el.find(".mainPage_therapistMgt").html(this._therapistMgtCtrl.$el);
            this.$el.find(".mainPage_organizationTabDetails").html(this._therapistDetailsCtrl.$el);
            this._therapistMgtCtrl.render();
            this._therapistDetailsCtrl.render();

            return this;
        },

        events: function () {
            return _.extend({}, BaseControl.prototype.events, {

            });
        }

    });
});
