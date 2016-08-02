define([
    "dist/js/controls/detailsControl/detailsControl.js",
    "dist/js/controls/helperControl/helperControl.js",
    "dist/js/controls/elemDispatcher/elemDispatcher.js",
    "Underscore",
    "jQuery",
    "AjaxControl",
    "/dist/js/controls/organizationDetailsControl/organizationDetailsControlFields.js",
    
], function (DetailsControl, HelperControl, ElemDispatcher, _, $, AjaxControl, fields) {

    return DetailsControl.extend({
        
        initialize: function () {
            DetailsControl.prototype.initialize.call(this, "organizationDetailsControl", fields);
            this.fields(fields);
            this.title("פרטי ארגון");
        },

        render: function () {
            DetailsControl.prototype.render.call(this);
            this._contentDiv.wrap(ElemDispatcher.getElement("<form>", "form-horizontal"));
            this.removeCloseButton();
            this.removeSearchOption();
            this.populateFields();
            this._addButtonsToFooter();
            this._removeLoadingOverlay();
            return this;
        },

        events: function () {
            return _.extend({}, DetailsControl.prototype.events.call(this), {
                "click .saveBtn" : "_onSaveButtonClick",
                "click .cancelBtn" : "_onCancelButtonClick"
            });
        },

        showOrg: function (org) {
            var title = "פרטי ארגון: " + org.name;
            this.clearFields();
            this.populateFields(org);
            this.title(title);
        },

        _onCancelButtonClick: function () {
            this.clearFields();
            this.populateFields();
            this.title("פרטי ארגון");
        },

        _onSaveButtonClick: function () {
            var isDataValid = this._validateData();
        },
        
        _addButtonsToFooter: function () {
            var saveButton = ElemDispatcher.getButton("שמירה", "btn-success pull-right saveBtn"),
                cancelButton = ElemDispatcher.getButton("ביטול", "btn-danger cancelBtn");

            this._footerDiv.append(cancelButton);
            this._footerDiv.append(saveButton);

        }
        
    });
});