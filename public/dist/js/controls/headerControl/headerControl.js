define([
    "dist/js/controls/baseControl/baseControl.js",
    "Underscore",
    "jQuery",
    "AjaxControl",
    "text!/dist/js/controls/headerControl/headerControl.html",
], function (BaseControl, _, $, AjaxControl, html) {

    return BaseControl.extend({

        _loggedInUser: null,

        initialize: function () {
            BaseControl.prototype.initialize.call(this, "headerControl", html);
        },

        render: function (user) {
            BaseControl.prototype.render.call(this);
            this._loggedInUser = user;
            console.log(user);
            this.$el.find(".headerControl_userName").text(user.name);
            this.$el.find(".headerControl_orgName").text(user.organization.name);
            return this;
        },

        events: function () {
            return _.extend({}, BaseControl.prototype.events, {

            });
        }

    });
});