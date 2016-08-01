define([
    "dist/js/controls/boxControl/boxControl.js",
    "dist/js/controls/helperControl/helperControl.js",
    "dist/js/controls/tableControl/tableControl.js",
    "Underscore",
    "jQuery",
    "AjaxControl"
], function (BoxControl, HelperControl, Table, _, $, AjaxControl) {

    return BoxControl.extend({

        _table: null,
        _fields: null,
        _rawData: null,

        initialize: function (type, html, fields, css) {
            BoxControl.prototype.initialize.call(this, type, html, css);
            this.fields(fields);
            this._table = new Table(fields);

            this.bindEvent(this._table, "tableCellClick" ,this._onTableCellClick)

            _.bindAll(this, "populateFields", "addPaging");
        },

        render: function () {
            BoxControl.prototype.render.call(this);
            this._table.render();
            return this;
        },

        events: function () {
            return _.extend({}, BoxControl.prototype.events.call(this), {

            });
        },

        populateFields: function (data) {
            this._table.populateFields(data);
        },

        fields: function (fields) {
            var result = this._fields;
            if (typeof fields !== "undefined") {
                this._fields = fields;
                result = this;
            }
            return result;
        },

        rawData: function (rawData) {
            var result = this._rawData;
            if (typeof rawData !== "undefined") {
                this._rawData = rawData;
                result = this;
            }
            return result;
        },

        _onTableCellClick: function (colName, rowId, rowData) {
            console.log(arguments);

        },

        _searchByQuery: function(searchQueryString){
            if (searchQueryString == "") {
                this._table._removeAllRows();
                this.populateFields(this.rawData());
                return;
            }
            var data = this.rawData(),
                arr_rowsToShow = [],
                needToShowThisRow;
            _.each(data, function (rowData, key) {
                needToShowThisRow = this._isSearchCriterieMatchesRowData(searchQueryString, rowData);
                if (needToShowThisRow) {
                    arr_rowsToShow.push(rowData.id);
                }
            }, this)
            this._table.hideAllRows();
            this._table.showRowsById(arr_rowsToShow);
        },

        _isSearchCriterieMatchesRowData: function (searchQueryString, rowData) {
            var isMatch = false,
                result = false;
            _.each(this.fields(), function(field, fieldIndex){
                if (field && field.searchBy) {
                    isMatch = rowData[fieldIndex].indexOf(searchQueryString) > -1;
                    if (isMatch) {result = true};
                }
            }, this)

            return result;
        }
          

    });
});