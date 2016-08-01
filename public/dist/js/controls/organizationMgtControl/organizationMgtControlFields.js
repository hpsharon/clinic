define([
    "jQuery",
    "Underscore"
], function ($, _) {

    return _.clone({
        meeting_duration:{
            exTitle: "משך טיפול (דקות)"
        },
        phone:{
            exTitle: "טלפון"
        },
        address: {
            exTitle: "כתובת"
        },
        name:{
            exTitle: "שם"
        },
        id: {
            exTitle: " "
        }
    })
});