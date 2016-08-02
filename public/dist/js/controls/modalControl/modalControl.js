define([    
    "jQuery",
    "text!/dist/js/controls/modalControl/modalControl.html",
], function ($, html) {
    "use strict";

    var ModalControl =  Backbone.Model.extend({
        _user: null,
        _template: null,
        _modalElem: null,
        _modalTitle: null,
        _modalBody: null,

        initialize: function () {
            this._template = _.template(html);
            $("body").prepend(this._template);
            this.$el = $("#myModal");
            this._modalTitle = this.$el.find(".modal-title");
            this._modalBody = this.$el.find(".modal-body");
        },
        
        show: function (title, body) {
            this.setTitle(title);
            this.setBody(body);
            this.$el.modal({
                show: true
            });
        },

        setTitle: function (title) {
            this._modalTitle.html(title);
        },

        setBody: function (body) {
            this._modalBody.html(body);
        }


    });

    return new ModalControl();

});
