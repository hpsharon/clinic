define([
    "dist/js/controls/baseControl/baseControl.js",
    "dist/js/controls/helperControl/helperControl.js",
    "Underscore",
    "jQuery",
    "AjaxControl",
    "text!/dist/js/controls/boxControl/boxControl.html",
], function (BaseControl, HelperControl, _, $, AjaxControl, html) {

    return BaseControl.extend({

        _title: null,
        _loadingStateDiv: '<div class="overlay"><i class="fa fa-refresh fa-spin"></i></div>',
        _titleDiv: null,
        _contentDiv: null,
        _footerDiv: null,
        
        initialize: function () {
            BaseControl.prototype.initialize.call(this, "boxControl", html);
        },

        render: function () {
            BaseControl.prototype.render.call(this);
            this._footerDiv = this.$el.find(".box-footer");
            this._contentDiv = this.$el.find(".box-body");
            this._titleDiv = this.$el.find(".box-title");
            this._titleDiv.html(this.title());
            return this;
        },

        events: function () {
            return _.extend({}, BaseControl.prototype.events.call(this), {
                "keyup .boxControl_searchForm" : "_onSearchInputKeyUp"
            });
        },

        title: function (title) {
            var result = this._title;
            if (typeof title !== "undefined") {
                this._title = title;
                result = this;
            }
            return result;
        },

        removeFooter: function () {
            this._footerDiv.remove();
        },

        removeCloseButton: function () {
            this.$el.find(".boxControl_removeBtn").remove();
        },
        
        removeSearchOption: function () {
            this.$el.find(".boxControl_searchForm").remove();
        },

        _onSearchInputKeyUp: function (e) {
            var searchValue = e.target.value,
                keyCode = e.keyCode;
            if (HelperControl.isValidKeyCode(keyCode) || searchValue == ""){
                this._searchByQuery(searchValue);
            }
        }

    });
});

