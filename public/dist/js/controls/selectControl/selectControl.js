define([
    "Backbone",
    "Underscore",
    "jQuery",
    "text!/dist/js/controls/selectControl/selectControl.html"
], function (Backbone, _, $, html) {
    "use strict";

    return Backbone.View.extend({

        template: null,
        _optionCont: null,
        _html: null,

        initialize: function () {
            _.extend(this, Backbone.Events);
            this._html = html;

        },

        render: function () {
            this.template = _.template(this._html);
            var compiledTemplate = this.template({});
            this.$el.html(compiledTemplate);
            this._optionCont = this.$el.find(".form-control");
        },

        events: {
            "change .form-control" : "_onOptionChange"
        },

        /**
         *
         * @param arr_options: [{text: "optionText", value: <optionValue>}]
         * @param addSelectOption: If to add "Select..."
         */
        addOptions: function (arr_options, addSelectOption) {
            var optionHtml = '<option value="<%= value %>"><%=text %></option>',
                optionTemplate = _.template(optionHtml),
                newOption;
            if (addSelectOption) {
                newOption = optionTemplate({text: "בחר...", value: -1});
                this._optionCont.append(newOption);
            }
            _.each(arr_options, function(optionObject){
                newOption = optionTemplate(optionObject);
                this._optionCont.append(newOption);
            }, this);
        },

        getSelectedOptionValue: function () {
            return this._optionCont.val();
        },

        _onOptionChange: function (e) {
            this.trigger("optionSelect", this._optionCont.val());
        }


    });

});
