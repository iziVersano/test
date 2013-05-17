/*!
 * Test

 */

define([
    'lib/user',
    'lib/mediator',
    'lib/helpers',
    'lib/settings',
    'pages/Epg/main'
    
], function(
    user,
    mediator,
    helperers,
    settings,
    EpgPage
   
) {
    'use strict';
    return Backbone.Router.extend({
        routes: {
            ''                                  : 'index',
            
            'epg'                              : 'epg'
        },
        initialize: function () {
               // Listen for error
            mediator.subscribe(this, 'errorMessage', this.onErrorMessage, this);
           

            // Listen for window events
            $(window).bind('resize', function () {
                mediator.broadcast('resize', $(window).width(), $(window).height());
                mediator.broadcast('resizePopup');
            });

        

            $(window).bind('error', function (errorObject, url, lineNumber) {
                var errorMessage;
                errorMessage = errorObject.originalEvent.message;
                errorMessage += ' ' + errorObject.originalEvent.filename;
                errorMessage += ' (' + errorObject.originalEvent.lineno + ')';
                mediator.broadcast('errorMessage', errorMessage);
            });
        },

        index: function () {
           // user.authentication(function () {
                user.router.navigate('epg', { trigger: true });
           // });
        },
       
        epg: function () {
            //user.authentication(function () {
                mediator.remove('.page');
                var page = new EpgPage();
                $('#app').html(page.el);
                page.render();
            //},true);
        },

          // *******Handel ERROR *********
        onErrorMessage: function (errorMessage) {
           alert('basic error ' + errorMessage);
        },
 });
});