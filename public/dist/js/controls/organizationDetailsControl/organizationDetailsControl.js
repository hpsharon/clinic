define([
    "dist/js/controls/boxControl/boxControl.js",
    "dist/js/controls/helperControl/helperControl.js",
    "dist/js/controls/elemDispatcher/elemDispatcher.js",
    "Modal",
    "Underscore",
    "jQuery",
    "AjaxControl",
    "/dist/js/controls/organizationDetailsControl/organizationDetailsControlFields.js",
    "text!/dist/js/controls/organizationDetailsControl/formGroupTemplate.html",
], function (BoxControl, HelperControl, ElemDispatcher, Modal, _, $, AjaxControl, fields, FormGroupTemplate) {

    return BoxControl.extend({

        _fields: null,
        _rawData: null,

        initialize: function () {
            BoxControl.prototype.initialize.call(this, "organizationDetailsControl");
            this.fields(fields);
            this.title("פרטי ארגון");
        },

        render: function () {
            BoxControl.prototype.render.call(this);
            this._contentDiv.wrap(ElemDispatcher.getElement("<form>", "form-horizontal"));
            this.removeCloseButton();
            this.removeSearchOption();
            this.populateFields();
            this._addButtonsToFooter();
            this._removeLoadingOverlay();
            return this;
        },

        events: function () {
            return _.extend({}, BoxControl.prototype.events.call(this), {
                "click .saveBtn" : "_onSaveButtonClick",
                "click .cancelBtn" : "_onCancelButtonClick"
            });
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

        showOrg: function (org) {
            var title = "פרטי ארגון: " + org.name;
            this.clearFields();
            this.populateFields(org);
            this.title(title);
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

        _onCancelButtonClick: function () {
            this.clearFields();
            this.populateFields();
            this.title("פרטי ארגון");
        },

        _onSaveButtonClick: function () {
            var isDataValid = this._validateData(),
                errorTitle = "שגיאה",
                errorBody = "נא למלא את השדות כנדרש";
            if (!isDataValid) {
                Modal.show(errorTitle, errorBody);
            }
            console.log(isDataValid);
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
            return !_.contains(arr_validation, false);
        },

        _addButtonsToFooter: function () {
            var saveButton = ElemDispatcher.getButton("שמירה", "btn-success pull-right saveBtn"),
                cancelButton = ElemDispatcher.getButton("ביטול", "btn-danger cancelBtn");

            this._footerDiv.append(cancelButton);
            this._footerDiv.append(saveButton);

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