define([
    "dist/js/controls/baseControl/baseControl.js",
    "dist/js/controls/helperControl/helperControl.js",
    "Underscore",
    "jQuery",
    "dist/js/controls/patientPageControl/patientPageControl.js",
    "text!/dist/js/controls/patientContentControl/patientContentControl.html"
], function (BaseControl, HelperControl, _, $, PatientPageControl, html) {

    return BaseControl.extend({
        
        _patientPageControl: null,
        

        initialize: function () {
            BaseControl.prototype.initialize.call(this, "contentControl", html);
            this._patientPageControl = new PatientPageControl();
        },

        render: function () {
            BaseControl.prototype.render.call(this);
            this.$el.find(".content").html(this._patientPageControl.$el);
            this._patientPageControl.render();
            return this;
        },

        events: function () {
            return _.extend({}, BaseControl.prototype.events, {

            });
        }

    });
});