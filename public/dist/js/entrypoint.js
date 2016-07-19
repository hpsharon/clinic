requirejs.config({
    paths: {
        jquery: "/../plugins/jQuery/jquery-2.2.3.min",
        AdminLTE: "/../dist/js/adminLTE",
        underscore: "/../../plugins/underscore/underscore",
        backbone: "/../../plugins/backbone/backbone",
        moment: "/../../plugins/moment/moment-with-locales",
        Bootstrap:'/../../bootstrap/js/bootstrap.min',
        slimscroll: '/../../plugins/slimScroll/jquery.slimscroll.min.js',
        application: "/../dist/js/controls/application"
    },
    //Remember: only use shim config for non-AMD scripts,
    //scripts that do not already call define(). The shim
    //config will not work correctly if used on AMD scripts,
    //in particular, the exports and init config will not
    //be triggered, and the deps config will be confusing
    //for those cases.
    shim: {
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        AdminLTE: {
            deps: ['jquery', 'Bootstrap'],
            exports: 'AdminLTE'
        },
        jquery: {
            exports: "$"
        },
        Bootstrap: {
            deps: ['jquery']
        },
        slimscroll: {
            deps: ['jquery']
        }
    }
});

//Then, later in a separate file, call it 'MyModel.js', a module is
//defined, specifying 'backbone' as a dependency. RequireJS will use
//the shim config to properly load 'backbone' and give a local
//reference to this module. The global Backbone will still exist on
//the page too.
define(['backbone', 'AdminLTE', 'jquery'], function (Backbone, AdminLTE) {
    return console.log(1);
});
