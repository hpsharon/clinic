define([
    "jQuery",
    "Underscore"
], function ($, _) {

    return _.clone({
        meeting_duration:{
            exTitle: "משך טיפול (דקות)"
        },
        phone:{
            exTitle: "טלפון",
            searchBy: true
        },
        address: {
            exTitle: "כתובת",
            searchBy: true
        },
        name:{
            exTitle: "שם",
            searchBy: true
        },
        id: {
            exTitle: " "
        }
    })
});