define([
    "jQuery",
    "Underscore"
], function ($, _) {

    return _.clone({
        organization: {
            exTitle: "ארגון",
            path: "organization.name"
        },
        email:{
            exTitle: "כתובת מייל",
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