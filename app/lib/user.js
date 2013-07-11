/*!
 * Test

 */

define([
    'lib/settings',
    'lib/mediator',
    'underscore', 
    'backbone',
    'backbone.localStorage',
    'backbone.nested'
], function(
    settings,
    mediator,
    _, 
    Backbone,
    localStorage,
    nested
) {
    'use strict';
    // This is slightly different, as it's our user and applications state,
    // we're creating an instance to share across the app
    var UserModel = Backbone.NestedModel.extend({
        router: null, // will hold the navigation/history for user
        localStorage: new Backbone.LocalStorage("User"),
        sync: Backbone.localSync,
        defaults: {
            'id': 'Test', // Gives the local storage a unique ID for recognisation
            'language': settings.defaultLanguage
        },

        initialise: function(){
            //default  flag for showing settings
        },
        
    });
    return new UserModel();
});
