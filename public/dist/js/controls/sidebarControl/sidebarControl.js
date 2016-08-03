define([
    "Backbone",
    "dist/js/controls/helperControl/helperControl.js",
    "dist/js/controls/baseControl/baseControl.js",
    "dist/js/controls/mainContentControl/mainContentControl.js",
    "dist/js/controls/patientContentControl/patientContentControl.js",
    "dist/js/controls/therapistContentControl/therapistContentControl.js",
    "Underscore",
    "jQuery",
    "AjaxControl",
    "text!/dist/js/controls/sidebarControl/sidebarControl.html",
    "text!/dist/js/controls/sidebarControl/liItemTemplate.html",
], function (Backbone, HelperControl, BaseControl, MainPageContentControl, PatientContentControl, TherapistContentControl,
             _, $, AjaxControl, html, ListItemTemplate) {

    return BaseControl.extend({

        _loggedInUser: null,
        _tabs: null,
        _liTemplate: null,

        initialize: function () {
            BaseControl.prototype.initialize.call(this, "sidebarControl", html);
            this._liTemplate = _.template(ListItemTemplate);
        },

        render: function () {
            BaseControl.prototype.render.call(this);

            this.$el.find(".sidebarControl_username").text(HelperControl.user().name);
            this._initTabs();
            return this;
        },

        events: function () {
            return _.extend({}, BaseControl.prototype.events, {
                "click .sidebar-menu li" : "_onTabClick"
            });
        },

        _initTabs: function () {
            this._tabs = [
                {
                    exTitle: "מטופלים",
                    icon: "fa fa-sitemap",
                    constructor: PatientContentControl,
                },
                {
                    exTitle: "ארגון",
                    icon: "fa fa-dashboard",
                    constructor: MainPageContentControl,
                },
                {
                    exTitle: "מטפלים",
                    icon: "fa fa-sitemap",
                    constructor: TherapistContentControl
                }
            ]
            this._createElemsAndAppend();
            this._selectFirstTab();
        },
        _createElemsAndAppend: function () {
            _.each(this._tabs, function(tab){
                tab.elem = this._generateTabElem(tab);
                this.$el.find(".sidebar-menu").append(tab.elem);
            }, this);
        },

        _generateTabElem: function (tab) {
            var elem;
            if (tab.isMultiLevel) {
                elem = this._generateMultiLevelTab(tab);
            } else {
                elem = $(this._liTemplate(tab));
            }

            return elem;
        },

        _generateMultiLevelTab: function (tab) {
            var mainTab = $(this._liTemplate(tab)),
                subMenu = $('<ul>').addClass("treeview-menu");
            mainTab.find('a').after(subMenu);

            _.each(tab.childItems, function (tab) {
                tab.elem = $(this._liTemplate(tab));
                subMenu.append(tab.elem);
            }, this);
            return mainTab;
        },

        _selectFirstTab: function () {
            var first = _.first(this._tabs),
                elem = first.elem,
                constructor = first.constructor;
            elem.addClass("active");
            this._triggerTabClick(constructor);
        },

        _triggerTabClick: function (constructor) {
            this.trigger("sidebarTabClick", constructor);
        },

        _onTabClick: function (e) {
            var tab = this._findTabByElem(e.target);
            this._removeActiveClass();
            if (tab) {
                tab.elem.addClass("active");
                this._triggerTabClick(tab.constructor);
            }
        },

        _removeActiveClass: function () {
            this.$el.find(".sidebar-menu li").removeClass("active");
        },

        _findTabByElem: function (elem) {
            var _tab, tabElem;
            _.each(this._tabs, function (tab) {
                if (!tab.isMultiLevel) {
                    tabElem = tab.elem;
                    if (tabElem.find(elem).length > 0) {
                        _tab = tab;
                    };
                } else {
                    _.each(tab.childItems, function(ctab){
                        tabElem = ctab.elem;
                        if (tabElem.find(elem).length > 0) {
                            _tab = ctab;
                        };
                    })
                }

            }, this);
            return _tab;
        }

    });
});