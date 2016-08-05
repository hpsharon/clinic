define([
    "jQuery",
    "Underscore",
    "dist/js/controls/helperControl/helperControl.js",
], function ($, _, HelperControl) {

    return _.clone({
        name:{
            exTitle: "שם",
            searchBy: true,
            type: "text",
            logicalValidator: HelperControl.stringNotEmptyValidator,
            validationString: "שדה זה חייב להיות מלא"
        },
        address: {
            exTitle: "כתובת",
            searchBy: true,
            type: "text",
            logicalValidator: HelperControl.stringNotEmptyValidator,
            validationString: "שדה זה חייב להיות מלא"
        },
        phone:{
            exTitle: "טלפון",
            searchBy: true,
            type: "text",
            logicalValidator: HelperControl.stringNotEmptyValidator,
            validationString: "שדה זה חייב להיות מלא"
        },
        meeting_duration:{
            exTitle: "משך טיפול (דקות)",
            type: "text",
            logicalValidator: HelperControl.stringNotEmptyValidator,
            validationString: "שדה זה חייב להיות מלא"
        },
        id: {
            type: "text",
            disabled: true
        }
    })
});