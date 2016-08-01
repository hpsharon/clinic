define([
    "dist/js/controls/mgtControl/mgtControl.js",
    "dist/js/controls/helperControl/helperControl.js",
    "dist/js/controls/tableControl/tableControl.js",
    "dist/js/controls/pagingControl/pagingControl.js",
    "Underscore",
    "jQuery",
    "AjaxControl",
    "text!/dist/js/controls/organizationMgtControl/organizationMgtControl.html",
    "dist/js/controls/organizationMgtControl/organizationMgtControlFields.js"
], function (MgtControl, HelperControl, Table, PagingControl, _, $, AjaxControl, html, fields) {

    return MgtControl.extend({

        _orgPromise: null,
        _pagingController: null,
        _MAX_RECORDS_PER_PAGE: null,
        _currentPage: null,

        initialize: function () {
            MgtControl.prototype.initialize.call(this, "orgMgtControl", html, fields);
            this._orgPromise = AjaxControl.sendRequest("/getOrgsForUser");
            this.title("הארגון שלי");
            this._MAX_RECORDS_PER_PAGE = 10;
            this._currentPage = 1;
        },

        render: function () {
            MgtControl.prototype.render.call(this);
            this._contentDiv.html(this._table.$el);
            this._orgPromise
                .then(this.populateFields)
                .then(this.addPaging);
            this.removeCloseButton();
            // this.removeFooter();
            return this;
        },

        events: function () {
            return _.extend({}, MgtControl.prototype.events.call(this), {

            });
        },

        addPaging: function () {
            var data = this.rawData(),
                numOfItems = data.length;
            this._pagingController = new PagingControl(numOfItems, this._MAX_RECORDS_PER_PAGE);
            this._pagingController.render();
            this._footerDiv.find(".box-tools").append(this._pagingController.$el);
            this.bindEvent(this._pagingController, "pagingIndexClick", this._onPagingEvent)
        },

        populateFields: function (data) {
            MgtControl.prototype.populateFields.call(this, data);
            this.rawData(data);

        },

        _onPagingEvent: function (index) {
            switch (index) {
                case "prev":
                    this._pageNumber--;
                    break;
                case "next":
                    this._pageNumber--;
                    break;
                default:
                    this._pageNumber = index;
                    break;
            }
            this._showRecordsAccordgingToPageNumber();
        },

        _showRecordsAccordgingToPageNumber: function () {
            var startIndex = (Number(this._pageNumber)-1) * this._MAX_RECORDS_PER_PAGE;
            console.log("current page number:" + this._pageNumber);
            this._table._removeAllRows();
            MgtControl.prototype.populateFields.call(this, this.rawData().slice(startIndex, startIndex + this._MAX_RECORDS_PER_PAGE));
        }

    });
});
