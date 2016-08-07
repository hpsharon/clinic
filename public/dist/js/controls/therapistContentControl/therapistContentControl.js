define([
    "dist/js/controls/contentControl/contentControl.js",
    "dist/js/controls/helperControl/helperControl.js",
    "dist/js/controls/orgHolder/orgHolder.js",
    "Underscore",
    "jQuery",
    "dist/js/controls/therapistPageControl/therapistPageControl.js",
], function (ContentControl, HelperControl, OrgHolder, _, $, TherapistPageControl) {

    return ContentControl.extend({

        initialize: function () {
            ContentControl.prototype.initialize.call(this, "therapistContentControl", TherapistPageControl);
            this._pageTitle = "מטפלים";


        },

        render: function () {
            ContentControl.prototype.render.call(this);
            //TODO:: only if system admin
            this.$el.find(".content-header").append(OrgHolder.$el)
            OrgHolder.initialize().render();
            return this;
        },

        events: function () {
            return _.extend({}, ContentControl.prototype.events, {

            });
        }

    });
});