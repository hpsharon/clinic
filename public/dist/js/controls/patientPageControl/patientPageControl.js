define([
    "dist/js/controls/baseControl/baseControl.js",
    "dist/js/controls/helperControl/helperControl.js",
    "dist/js/controls/patientMgtControl/patientMgtControl.js",
    "Underscore",
    "jQuery",
    "AjaxControl",
    "text!/dist/js/controls/mainPageControl/mainPageControl.html",
], function (BaseControl, HelperControl, PatientMgtControl, _, $, AjaxControl, html) {

    return BaseControl.extend({

        _organizationMgtCtrl: null,
        _organizationDetailsControl: null,

        initialize: function () {
            BaseControl.prototype.initialize.call(this, "patientPageControl", html);
            console.log("patient");
        },

        render: function () {
            BaseControl.prototype.render.call(this);
            return this;
        },

        events: function () {
            return _.extend({}, BaseControl.prototype.events, {

            });
        }

    });
});