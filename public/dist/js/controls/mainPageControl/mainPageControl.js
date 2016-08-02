define([
    "dist/js/controls/baseControl/baseControl.js",
    "dist/js/controls/helperControl/helperControl.js",
    "dist/js/controls/organizationMgtControl/organizationMgtControl.js",
    "dist/js/controls/organizationDetailsControl/organizationDetailsControl.js",
    "Underscore",
    "jQuery",
    "AjaxControl",
    "text!/dist/js/controls/mainPageControl/mainPageControl.html",
], function (BaseControl, HelperControl, OrganizationMgtCtrl, OrganizationDetailsControl, _, $, AjaxControl, html) {

    return BaseControl.extend({

        _organizationMgtCtrl: null,
        _organizationDetailsControl: null,

        initialize: function () {
            BaseControl.prototype.initialize.call(this, "headerControl", html);
            this._organizationMgtCtrl = new OrganizationMgtCtrl();
            this._organizationDetailsControl = new OrganizationDetailsControl();
            this._bindEvents();
        },

        render: function () {
            BaseControl.prototype.render.call(this);
            this.$el.find(".mainPage_organizationMgt").html(this._organizationMgtCtrl.$el);
            this.$el.find(".mainPage_organizationDetails").html(this._organizationDetailsControl.$el);
            this._organizationMgtCtrl.render();
            this._organizationDetailsControl.render();
            return this;
        },

        events: function () {
            return _.extend({}, BaseControl.prototype.events, {

            });
        },

        _bindEvents: function () {
            this.bindEvent(this._organizationMgtCtrl, 'organizationMgt_OrgClick', this._onOrgClick);
        },

        _onOrgClick: function (org, orgId) {
            this._organizationDetailsControl.showOrg(org);
        }

    });
});