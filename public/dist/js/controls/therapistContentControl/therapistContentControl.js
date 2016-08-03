define([
    "dist/js/controls/contentControl/contentControl.js",
    "dist/js/controls/helperControl/helperControl.js",
    "Underscore",
    "jQuery",
    "dist/js/controls/therapistPageControl/therapistPageControl.js",
], function (ContentControl, HelperControl, _, $, TherapistPageControl) {

    return ContentControl.extend({
        
        _contentCtor: null,
        

        initialize: function () {
            ContentControl.prototype.initialize.call(this, "therapistContentControl", TherapistPageControl);
            this._pageTitle = "מטפלים";

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