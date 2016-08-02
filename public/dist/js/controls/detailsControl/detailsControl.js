define([
    "dist/js/controls/boxControl/boxControl.js",
    "dist/js/controls/helperControl/helperControl.js",
    "Underscore",
    "jQuery",
    "AjaxControl",
    "Modal",
    "text!/dist/js/controls/detailsControl/formGroupTemplate.html",
], function (BoxControl, HelperControl, _, $, AjaxControl, Modal, FormGroupTemplate) {

    return BoxControl.extend({

        _fields: null,
        _rawData: null,

        initialize: function (type, fields) {
            BoxControl.prototype.initialize.call(this, type);
            this.fields(fields);
        },

        render: function () {
            BoxControl.prototype.render.call(this);
            this.$el.find(".headerControl_userName").text(HelperControl.user().name);
            this.$el.find(".headerControl_orgName").text(HelperControl.user().organization.name);
            return this;
        },

        events: function () {
            return _.extend({}, BoxControl.prototype.events.call(this), {

            });
        },

        rawData: function (rawData) {
            var result = this._rawData;
            if (typeof rawData !== "undefined") {
                this._rawData = rawData;
                result = this;
            }
            return result;
        },

        fields: function (fields) {
            var result = this._fields;
            if (typeof fields !== "undefined") {
                this._fields = fields;
                result = this;
            }
            return result;
        },

        clearFields: function () {
            this._contentDiv.html("");
        },

        collect: function () {
            console.log(this.fields());
        },

        populateFields: function (data) {
            var fieldElem,
                contDiv;
            if (data) {
                this.rawData(data);
            }
            _.each(this.fields(), function(elemObject,  index){
                fieldElem = this._createFieldElem(index, elemObject, data);
                this._fields[index].elem = fieldElem;
                contDiv = elemObject.cont ? this.$el.find(elemObject.cont) : this._contentDiv;
                contDiv.append(fieldElem);
            }, this)
        },

        _validateData: function () {
            var arr_validation = [],
                fields = this.fields(),
                elemValue,
                isValid;
            _.each(this.fields(), function (dataObject, index) {
                if (dataObject.logicalValidator){
                    elemValue = this._getElemValue(dataObject.elem),
                        isValid = dataObject.logicalValidator(elemValue, fields);
                    this._showHideValidationStringAccordingToValidation(isValid, dataObject.elem, dataObject);
                    arr_validation.push(isValid);
                }
            }, this);
            isValid = !_.contains(arr_validation, false);
            if (!isValid) {
                this._showInvalidDataModal();
            }

            return isValid;
        },

        _showInvalidDataModal: function () {
            var errorTitle = "שגיאה",
                errorBody = "נא למלא את השדות כנדרש";
            Modal.show(errorTitle, errorBody);
        },

        _createFieldElem: function (index, elemObject, data) {
            var randomId = Math.ceil(Math.random()*100000000),
                elem;
            elemObject.randomId = randomId;
            elemObject.exTitle = elemObject.exTitle || index;
            elem = _.template(FormGroupTemplate);
            elem = $(elem(elemObject));

            if (data && data[index]) {
                elem.find("input").val(data[index]);
            }

            this._manipulateFieldElemForObject(elem, elemObject);
            return elem;
        },

        _manipulateFieldElemForObject: function(fieldElem, elemObject) {
            if (elemObject.hidden) {
                fieldElem.addClass("form-elem-hidden");
            }

            if (elemObject.logicalValidator) {
                fieldElem.change(this._onInputChange.bind(this, elemObject.logicalValidator, elemObject, fieldElem, this.fields()));
            }
        },

        _onInputChange: function(validationFunction, elemObject, fieldElem, fields, event) {
            var elemValue = this._getElemValue(fieldElem),
                isValid = validationFunction(elemValue, fields);

            this._showHideValidationStringAccordingToValidation(isValid, fieldElem, elemObject);
        },

        _getElemValue: function (fieldElem) {
            return fieldElem.find("input").val();
        },

        _showHideValidationStringAccordingToValidation: function (isValid, fieldElem, elemObject) {
            fieldElem.find(".help-block").remove();
            if (!isValid) {
                fieldElem.addClass("has-error");
                fieldElem.find("input").after('<span class="help-block">'+elemObject.validationString+'</span>');
            } else {
                fieldElem.removeClass("has-error");
            }
        }




    });
});