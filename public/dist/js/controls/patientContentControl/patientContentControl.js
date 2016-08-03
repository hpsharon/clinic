define([
    "dist/js/controls/contentControl/contentControl.js",
    "dist/js/controls/helperControl/helperControl.js",
    "Underscore",
    "jQuery",
    "dist/js/controls/patientPageControl/patientPageControl.js",
    "text!/dist/js/controls/patientContentControl/patientContentControl.html"
], function (ContentControl, HelperControl, _, $, PatientPageControl, html) {

    return ContentControl.extend({
        
        _contentCtor: null,
        

        initialize: function () {
            ContentControl.prototype.initialize.call(this, "contentControl", PatientPageControl);

        },

        render: function () {
            ContentControl.prototype.render.call(this);
            return this;
        },

        events: function () {
            return _.extend({}, ContentControl.prototype.events, {

            });
        }

    });
});