requirejs.config({
    paths: {
        jQuery: "/../plugins/jQuery/jquery-2.2.3.min",
        AdminLTE: "/../dist/js/adminLTE",
        Underscore: "/../../plugins/underscore/underscore",
        Backbone: "/../../plugins/backbone/backbone",
        moment: "/../../plugins/moment/moment-with-locales",
        Bootstrap:'/../../bootstrap/js/bootstrap.min',
        slimscroll: '/../../plugins/slimScroll/jquery.slimscroll.min.js',
        application: "/../dist/js/application"
    },
    //Remember: only use shim config for non-AMD scripts,
    //scripts that do not already call define(). The shim
    //config will not work correctly if used on AMD scripts,
    //in particular, the exports and init config will not
    //be triggered, and the deps config will be confusing
    //for those cases.
    shim: {
        'Backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['Underscore', 'jQuery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        'Underscore': {
            exports: '_'
        },
        'AdminLTE': {
            deps: ['jQuery', 'Bootstrap'],
            exports: 'AdminLTE'
        },
        'jQuery': {
            exports: "$"
        },
        'Bootstrap': {
            deps: ['jQuery']
        },
        'slimscroll': {
            deps: ['jQuery']
        }
    },
    deps: [
        "jQuery",
        "Underscore",
        "Backbone",
        "AdminLTE",
        "application"
    ]
});

//Then, later in a separate file, call it 'MyModel.js', a module is
//defined, specifying 'backbone' as a dependency. RequireJS will use
//the shim config to properly load 'backbone' and give a local
//reference to this module. The global Backbone will still exist on
//the page too.
define(['application', 'Backbone', 'AdminLTE', 'jQuery'], function (application, Backbone, AdminLTE, $) {
    return application.initialize();
});
