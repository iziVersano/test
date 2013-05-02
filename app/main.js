/*!
 * Test

 */

// Require JS configuration
require.config({
    paths: {
        'text': '../vendor/require.text-2.0.3',
        'domReady': '../vendor/require.domReady-2.0.1'
    }
});

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

// Application initialize
require([
    'domReady',
    'lib/settings',
    'lib/user',
    'lib/mediator',
    'routers/Main',
    // Do not return a variable...
    'lib/mods'
], function(
    domReady,
    settings,
    user,
    mediator,
    MainRouter
) {
    'use strict';
    domReady(function () {
      
        // Set up router and history for user
        user.router = new MainRouter(); // assign to user for tracking user history and to do navigation
        Backbone.history.start(); // history starts after page load to avoid issues in IE
    });
});
