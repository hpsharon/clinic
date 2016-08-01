define([
    "Backbone",
    "Underscore",
    "text!/dist/js/controls/tableControl/tableTemplate.html",

], function (Backbone, _, tableTemplate) {

    "use strict";
    return Backbone.View.extend({

        _fields: null,
        el: null,
        _tableData: null,
        _tableRowDiv: null,

        initialize: function (fields) {
            _.extend(this, Backbone.Events);
            this.fields(fields);
            this.$el = $(tableTemplate);
            this._tableData = {};
            Backbone.View.prototype.delegateEvents.call(this);

            _.bindAll(this, "populateFields");
        },

        render: function () {
            var headerElem = this.$el.find(".tbodyHeaders"),
                title, header;

            _.each(this.fields(), function (field, index) {
                title = field.exTitle ? field.exTitle : index;
                header = $("<th>").text(title);
                headerElem.append(header);
            });

            this._tableRowDiv = this.$el.find(".tbodyHeaders");

            return this;

        },

        events:  {
            "click td": "_onCellClick"
        },

        pushRowData: function (dataObj, rowId ) {
            var isRowExist = this._tableData[rowId],
                rowObj;
            if (isRowExist) {
                this._setRowData(dataObj, rowId);
            } else {
                rowObj = this._generateTableRow(dataObj);
                this._tableRowDiv.after(rowObj);
            }
        },

        fields: function (fields) {
            var result = this._fields;

            if (typeof fields !== "undefined") {
                this._fields = fields;
                result = this;
            }
            return result;
        },

        clear: function () {
            this._tableData = {};
            this._removeAllRows();
        },

        removeRowById: function (rowId) {
            if (this._tableData[rowId]) {
                delete this._tableData[rowId]
            }
            this.$el.find("[tabledataid="+rowId+"]").remove();
        },

        populateFields: function (data) {
            var arrRowElem = [],
                rowObj;

            _.each(data, function (obj, index) {
                rowObj = this._generateTableRow(obj);
                arrRowElem.push(rowObj);
            }, this);

            arrRowElem = arrRowElem.reverse();
            _.each(arrRowElem, function (rowObj) {
                this._tableRowDiv.after(rowObj);
            }, this);
        },

        _removeAllRows: function () {
            this.$el.find("tr:not(.tbodyHeaders)").remove();
        },


        _setRowData: function (dataObj, rowId) {
            var row = this.$el.find('[tabledataid="' + rowId + '"]'),
                field, elem, cell;
            _.each(dataObj, function (value, index){
                field = this.fields()[index];
                if (field) {
                    elem = this._generateCellObject(field, index, dataObj);
                    cell = row.find('[data-col-name=' + index + ']');
                    cell.replaceWith(elem);
                }
            }, this)

        },

        _onCellClick: function (e) {
            var clickedCell = $(e.target).closest("td"),
                colName = clickedCell[0].dataset.colName,
                rowData = this._getRowDataByElem(clickedCell),
                rowId = $(clickedCell).closest("tr").attr("tableDataId");

            this.trigger("tableCellClick", colName, rowId, rowData);
        },

        _getRowDataByElem: function (elem) {
            var elemDataId = $(elem).closest("tr").attr("tableDataId"),
                data = this._tableData[elemDataId];

            return data;
        },
        
        _generateTableRow: function (dataObj) {
            var dataRow = $("<tr>"),
                cellObject;

            _.each(this.fields(), function (dataItem, index) {
                cellObject = this._generateCellObject(dataItem, index, dataObj);
                dataRow.append(cellObject);
            }, this);
            dataRow.attr("tableDataId", dataObj.id);
            return dataRow;
        },
        
        _generateCellObject: function (field, index, dataObj) {
            var obj = $("<td>") ,value;

            if (field.path) {
                value = this._extractPath(field, index, dataObj);
            } else
            if (typeof dataObj[index] === "boolean" || typeof dataObj[index] === "number") {
                value = dataObj[index]
            } else {
                value = dataObj[index] || "";
            }


            if (field.classes) {
                obj.addClass(field.classes);
            }

            if (field.parse && typeof field.parse === "function") {
                value = field.parse(value);
            }

            if (field.type) {
                value = this._generateSpecialCellElements(field, index, dataObj);
            }
            obj[0].dataset.colName = index;
            obj.html(value);

            this._tableData[dataObj.id] = this._tableData[dataObj.id] || {};
            this._tableData[dataObj.id][index] = value;
            return obj;
        },

        _generateSpecialCellElements: function (field) {
            var elem, classes = "btn btn-block btn-default";
            switch (field.type) {
                case "button":
                    classes = field.buttonClasses ? field.buttonClasses : classes;
                    elem =  $('<button type="button" class="'+classes+'">'+ field.text +'</button>')
                    break;
                case "inputText":
                    elem = $('<input type="text" class="form-control">');
                    break;
                default:
                    break;
            }
            return elem;
        },

        _extractPath: function (field, index, dataObj) {
            var split = field.path.split("."),
                result = dataObj;

            _.each(split, function (field) {
                if (result) {
                    result = result[field];
                }
            });
            return result;
        }

    });

});



