define([
    "Backbone",
    "dist/js/controls/tabControl/tabControl.js",
    "dist/js/controls/therapistDetailsControl/therapistDetailsControl.js",
    "Underscore",
    "jQuery",
    "AjaxControl",
    "text!/dist/js/controls/tabControl/tabControl.html",
], function(Backbone, TabControl, TherapistDetailsControl, _, $, AjaxControl, html) {

    return TabControl.extend({
        
        _therapistId: null,

        initialize: function () {
            TabControl.prototype.initialize.call(this, "tabControl", html);
            this._tabs = [
                {
                    title: "פרטים",
                    constructor: TherapistDetailsControl,
                    params: this._getParamsForDetailsTab
                },
                {
                    title: "רשימת מטופלים",
                    constructor: Backbone.View
                },
                {
                    title: "יומן עבודה",
                    constructor: Backbone.View
                }
            ]

            _.bindAll(this, "_getParamsForDetailsTab");
        },

        render: function () {
            TabControl.prototype.render.call(this);
            return this;
        },

        showTherapistDetails: function (therapistId) {
            this.therapistId(therapistId);
            this._selectDetailsTab();
            this._showTherapistDetails(therapistId);
        },

        _getParamsForDetailsTab: function () {
          return {
              therapistId : this.therapistId()
          }
        },

        _selectDetailsTab: function () {
            var tab = _.first(this._tabs);
            tab.elem.addClass("active");
            this._activeTab = new tab.constructor();
            this._tabContentDiv.html(this._activeTab.$el);
            this._activeTab.render();
        },

        _showTherapistDetails: function (therapistId) {
            if (this._activeTab.showTherapistDetails) {
                this._activeTab.showTherapistDetails(therapistId)
            }
        },

        therapistId: function (therapistId) {
            var result = this._therapistId;
            if (typeof therapistId !== "undefined") {
                this._therapistId = therapistId;
                result = this;
            }
            return result;
        },


    });
});