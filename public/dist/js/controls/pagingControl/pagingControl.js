define([
    "dist/js/controls/baseControl/baseControl.js",
    "dist/js/controls/helperControl/helperControl.js",
    "Underscore",
    "jQuery",

], function (BaseControl, HelperControl, _, $) {

    return BaseControl.extend({

        _numOfRecords: null,
        _maxNumOfRecordsPerPage: null,
        _numOfButtons: null,
        _pageNumber: null,
        _prevButton: null,
        _nextButton: null,

        initialize: function (numOfRecords, maxNumOfRecordsPerPage) {
            BaseControl.prototype.initialize.call(this, "paginControl");
            this._numOfRecords = numOfRecords;
            this._maxNumOfRecordsPerPage = maxNumOfRecordsPerPage;
            this._numOfButtons = Math.ceil(this._numOfRecords  / this._maxNumOfRecordsPerPage);
            this._pageNumber = 1;

            _.bindAll(this, "_onListItemClick");
        },

        render: function () {
            BaseControl.prototype.render.call(this);
            this.$el = this._createPagingElem();
            this.$el.find("li").click(this._onListItemClick);
            this._prevButton = this.$el.find("li").find("[index=prev]");
            this._nextButton = this.$el.find("li").find("[index=next]");
            //selecting the first page
            this.$el.find("li").find("[index=1]").addClass("active");
            this._prevButton.addClass("cursor-not-allowed");

            return this;
        },

        events: function () {
            return _.extend({}, BaseControl.prototype.events.call(this), {
                "click li" : "_onListItemClick"
            });
        },

        _createPagingElem: function () {
            var list = $("<ul>").addClass("pagination pagination-sm no-margin pull-right"),
                li, page;
            list.append('<li><a index="prev" href="#">«</a></li>');
            for (var i=1; i<=this._numOfButtons; i++) {
                page = i;
                li = $('<li><a index="'+page+'"  href="#">'+ page +'</a></li>');
                list.append(li);
            }
            list.append('<li><a index="next" href="#">»</a></li>');
            return list;
        },

        _onListItemClick: function (e) {
            var index = $(e.target).attr("index"),
                currentPageNumber = this._pageNumber;
            switch (index) {
                case "prev":
                    if (this._pageNumber > 1) {
                        this._pageNumber--;
                    }
                    break;
                case "next":
                    if (this._pageNumber <= this._numOfButtons) {
                        this._pageNumber++;
                    }
                    break;
                default:
                    this._pageNumber = index;
                    break;
            }
            if (this._pageNumber != currentPageNumber) {
                this.trigger("pagingIndexClick", this._pageNumber);
                this._disableButtonsAccordingToPageNumber();
            }
        },

        _disableButtonsAccordingToPageNumber: function () {
            this.$el.find("li a").removeClass("active");
            this.$el.find("li").find("[index=" + this._pageNumber +"]").addClass("active");
            this._prevButton.removeClass("active cursor-not-allowed");
            this._nextButton.removeClass("active cursor-not-allowed");

            if (this._pageNumber == 1) {
                this._prevButton.addClass("cursor-not-allowed");
            }
            if (this._pageNumber == this._numOfButtons) {
                this._nextButton.addClass("cursor-not-allowed");
            }
        }

    });
});