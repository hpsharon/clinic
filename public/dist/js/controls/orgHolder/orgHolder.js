define([
    "dist/js/controls/baseControl/baseControl.js",
    "Underscore",
    "jQuery",
    "AjaxControl",
    "dist/js/controls/selectControl/selectControl.js",
], function (BaseControl, _, $, AjaxControl, SelectControl) {
    "use strict";

    var OrgHolder =  BaseControl.extend({

        _allOrgsPromise: null,
        _orgSelect: null,

        initialize: function () {
            BaseControl.prototype.initialize.call(this, "orgHolder");
            this._allOrgsPromise = AjaxControl.sendRequest("/getAllOrgs");
            this._orgSelect = new SelectControl();
            _.bindAll(this, "_populateOrgSelectBox");

            this.bindEvent(this._orgSelect, "optionSelect", this._onOrgChange)
            return this;
        },

        render: function (){
            BaseControl.prototype.initialize.call(this);
            this._orgSelect.render();
            this._allOrgsPromise
                .then(this._populateOrgSelectBox);
            return this;
        },

        events: function() {
            return _.extend({}, BaseControl.prototype.events.call(this), {

            })
        },

        getSelectedOrg: function () {
            return this._orgSelect.getSelectedOptionValue();
        },

        _populateOrgSelectBox: function (orgs) {
            var orgOptions = _.map(orgs, function(org){
                return {
                    text: org.name,
                    value: org.id
                }
            }),
                addSelectOption = true;

            this._orgSelect.addOptions(orgOptions, addSelectOption);
            this.$el.html(this._orgSelect.$el);
        },

        _onOrgChange: function (orgId) {
            this.trigger("orgChange", orgId);
        }


    });

    return new OrgHolder();

});
