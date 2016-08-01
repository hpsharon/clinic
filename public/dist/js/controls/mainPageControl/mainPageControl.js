define([
    "dist/js/controls/baseControl/baseControl.js",
    "dist/js/controls/helperControl/helperControl.js",
    "dist/js/controls/organizationMgtControl/organizationMgtControl.js",
    "Underscore",
    "jQuery",
    "AjaxControl",
    "text!/dist/js/controls/mainPageControl/mainPageControl.html",
], function (BaseControl, HelperControl, OrganizationMgtCtrl, _, $, AjaxControl, html) {

    return BaseControl.extend({

        _organizationMgtCtrl: null,

        initialize: function () {
            BaseControl.prototype.initialize.call(this, "headerControl", html);
            this._organizationMgtCtrl = new OrganizationMgtCtrl();
        },

        render: function () {
            BaseControl.prototype.render.call(this);
            this.$el.html(this._organizationMgtCtrl.$el);
            this._organizationMgtCtrl.render();
            return this;
        },

        events: function () {
            return _.extend({}, BaseControl.prototype.events, {

            });
        }

    });
});