define([
    "dist/js/controls/mgtControl/mgtControl.js",
    "dist/js/controls/helperControl/helperControl.js",
    "dist/js/controls/pagingControl/pagingControl.js",
    "Underscore",
    "jQuery",
], function (MgtControl, HelperControl, PagingControl, _, $) {

    return MgtControl.extend({

        _pagingController: null,
        _MAX_RECORDS_PER_PAGE: null,
        _pageNumber: null,

        initialize: function (type, html, fields) {
            MgtControl.prototype.initialize.call(this, type, html, fields);
            this._MAX_RECORDS_PER_PAGE = 10;
            this._pageNumber = 1;

            _.bindAll(this, "addPaging");
        },

        render: function () {
            MgtControl.prototype.render.call(this);
            return this;
        },

        events: function () {
            return _.extend({}, MgtControl.prototype.events.call(this), {

            });
        },

        populateFields: function () {
            var startIndex = (Number(this._pageNumber)-1) * this._MAX_RECORDS_PER_PAGE;
            MgtControl.prototype.populateFields.call(this, this.rawData().slice(startIndex, startIndex + this._MAX_RECORDS_PER_PAGE));
        },

        addPaging: function () {
            var data = this.rawData(),
                numOfItems = data.length;
            this._pagingController = new PagingControl(numOfItems, this._MAX_RECORDS_PER_PAGE);
            this._pagingController.render();
            this._footerDiv.find(".box-tools").append(this._pagingController.$el);
            this.bindEvent(this._pagingController, "pagingIndexClick", this._onPagingEvent)
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
            this._table._removeAllRows();
            this.populateFields();
        }

    });
});