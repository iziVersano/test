/*!
 * Test

 */

// Require JS configuration
require.config({
    paths: {
         jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.2/jquery.min',
         //underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min',
         underscore: 'vendor/underscore-1.4.4',
         backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min',
        'backbone.localStorage': 'vendor/backbone.localstorage-1.0.0',
        'text': 'vendor/require.text-2.0.3',
        'domReady': 'vendor/require.domReady-2.0.1',
        //'slidesjs': '../vendor/jcarousellite_1.0.1',
        'slidesjs': 'vendor/jquery.slides',
        'backbone.nested': 'vendor/backbone.nested-1.1.2',
        'backbone.modelbinder-0.1.6': 'vendor/backbone.modelbinder-0.1.6',
        'backbone.layoutmanager': 'vendor/backbone.layoutmanager-0.6.6'
    },

  shim: {
      backbone: {
          //These script dependencies should be loaded before loading backbone.js
          deps: ['underscore', 'jquery'],
          //Once loaded, use the global 'Backbone' as the module value.
          exports: 'Backbone'
      },
      underscore: {
          exports: '_'
      },
      'backbone.localStorage': {
            deps: ['backbone'],
            exports: 'Backbone'
      },
      'backbone.layoutmanager': {
            deps: ['backbone'],
            exports: 'Backbone'
      },
      'backbone.nested': {
            deps: ['backbone'],
            exports: 'Backbone'
      }
  }

});

// Application initialize
require([
    'domReady',
    'lib/settings',
    'lib/user',
    'lib/mediator',
    'routers/Main',
    // Do not return a variable...
    'lib/mods',
    'backbone'

], function(
    domReady,
    settings,
    user,
    mediator,
    MainRouter,
    backbone,
    backbonenested
) {
    'use strict';
    domReady(function () {
      debugger;
      // Backbone Layout Manager configuration
      Backbone.LayoutManager.configure({
          // This allows for Underscore templating
          // https://github.com/tbranyen/backbone.layoutmanager#asynchronous--synchronous-fetching
          fetch: function(html) {
              'use strict';
              return _.template(html);
          },
          // This allows Views and LayoutViews to be interchangable, avoids much confusion
          // https://github.com/tbranyen/backbone.layoutmanager#structuring-a-view
          manage: true
      });
        // Set up router and history for user
        user.router = new MainRouter(); // assign to user for tracking user history and to do navigation
        Backbone.history.start(); // history starts after page load to avoid issues in IE
    });
});


