define([
    "Backbone",
    "dist/js/controls/baseControl/baseControl.js",
    "dist/js/controls/helperControl/helperControl.js",
    "Underscore",
    "jQuery",
    "AjaxControl",
    "text!/dist/js/controls/tabControl/tabControl.html",
], function (Backbone, BaseControl, HelperControl, _, $, AjaxControl, html) {

    return BaseControl.extend({
        
        _tabs: null,
        _tabContentDiv: null,
        _activeTab: null,


        initialize: function () {
            BaseControl.prototype.initialize.call(this, "tabControl", html);
            this._tabs = [
                {
                    title: "פרטים",
                    constructor: Backbone.View
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
        },

        render: function () {
            BaseControl.prototype.render.call(this);
            this._tabContentDiv = this.$el.find(".tab-content");
            this._initTabs();
            return this;
        },

        events: function () {
            return _.extend({}, BaseControl.prototype.events.call(this), {
                "click .nav-tabs li" : "_onTabClick"
            });
        },
        
        _initTabs: function () {
            var tabTemplate = '<li><a href="#" data-toggle="tab" aria-expanded="false"><%-title %></a></li>',
                appendTo = this.$el.find(".nav-tabs"),
                tabElement,
                temp;
            
            _.each(this._tabs, function (tabData) {
                temp = _.template(tabTemplate);
                tabElement = $(temp(tabData));
                tabData.elem = tabElement;
                appendTo.append(tabElement);
            });
        },

        _onTabClick: function (e) {
            var target = e.target,
                tab = this._findTabByElem(target),
                Constructor = tab.constructor;
            this._activeTab = new Constructor();
            this._tabContentDiv.html(this._activeTab.$el);
            this._activeTab.render();
            console.log(tab);
        },

        _findTabByElem: function (elem) {
            var tabElem,
                result;
            _.each(this._tabs, function (tab) {
                tabElem = tab.elem;
                if (tabElem.find($(elem)).length > 0) {
                    result = tab;
                }
            }, this);
            return result;
        }
        
        

    });
});