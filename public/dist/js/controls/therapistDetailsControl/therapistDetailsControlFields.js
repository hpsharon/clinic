define([
    "jQuery",
    "Underscore",
    "dist/js/controls/helperControl/helperControl.js",
], function ($, _, HelperControl) {

    return _.clone({
        name:{
            exTitle: "שם",
            searchBy: true,
            type: "text"
        },
        email: {
            exTitle: "אימייל",
            searchBy: true,
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