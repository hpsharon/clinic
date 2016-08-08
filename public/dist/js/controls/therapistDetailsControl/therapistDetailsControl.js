define([
    "dist/js/controls/detailsControl/detailsControl.js",
    "dist/js/controls/helperControl/helperControl.js",
    "dist/js/controls/elemDispatcher/elemDispatcher.js",
    "Underscore",
    "jQuery",
    "AjaxControl",
    "/dist/js/controls/therapistDetailsControl/therapistDetailsControlFields.js"

], function (DetailsControl, HelperControl, ElemDispatcher, _, $, AjaxControl, fields) {

    return DetailsControl.extend({

        _therapistId: null,

        initialize: function (params) {
            console.log(params);
            DetailsControl.prototype.initialize.call(this, "therapistDetailsControl", fields);
            this.fields(fields);
            this.title("פרטי מטפל");
            
            if (params && params.therapistId) {
                this._therapistId = params.therapistId;
            }

            _.bindAll(this, "showTherapistDetails", "_showTherapistDetails");
        },

        render: function () {
            DetailsControl.prototype.render.call(this);
            this._contentDiv.wrap(ElemDispatcher.getElement("<form>", "form-horizontal"));
            this.removeCloseButton();
            this.removeSearchOption();
            this._addButtonsToFooter();
            if (this._therapistId) {
                this.showTherapistDetails(this._therapistId);
            }
            return this;
        },

        events: function () {
            return _.extend({}, DetailsControl.prototype.events.call(this), {
                "click .saveBtn" : "_onSaveButtonClick",
                "click .cancelBtn" : "_onCancelButtonClick"
            });
        },

        showTherapistDetails: function (therapistId) {
            AjaxControl.sendRequest("/getTherapistById", {id: therapistId})
                .then(this._showTherapistDetails)
        },

        _addButtonsToFooter: function () {
            var saveButton = ElemDispatcher.getButton("שמירה", "btn-success pull-right saveBtn"),
                cancelButton = ElemDispatcher.getButton("ביטול", "btn-danger cancelBtn");

            this._footerDiv.append(cancelButton);
            this._footerDiv.append(saveButton);

        },

        _showTherapistDetails: function (therapist) {
            this.populateFields(therapist);
            this._hideLoadingOverlay();
        }

    });
});