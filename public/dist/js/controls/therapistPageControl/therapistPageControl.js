define([
    "dist/js/controls/baseControl/baseControl.js",
    "dist/js/controls/helperControl/helperControl.js",
    "dist/js/controls/therapistMgtControl/therapistMgtControl.js",
    "Underscore",
    "jQuery",
    "AjaxControl",
    "text!/dist/js/controls/therapistPageControl/therapistPageControl.html",
], function (BaseControl, HelperControl, TherapistMgtControl, _, $, AjaxControl, html) {

    return BaseControl.extend({

        _therapistMgtCtrl: null,


        initialize: function () {
            BaseControl.prototype.initialize.call(this, "patientPageControl", html);
            this._therapistMgtCtrl = new TherapistMgtControl();

        },

        render: function () {
            BaseControl.prototype.render.call(this);
            this.$el.find(".mainPage_therapistMgt").html(this._therapistMgtCtrl.$el);
            this._therapistMgtCtrl.render();

            return this;
        },

        events: function () {
            return _.extend({}, BaseControl.prototype.events, {

            });
        }

    });
});
