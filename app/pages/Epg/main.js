/*!
 * Test

 */

define([
    'lib/user',
    'lib/mediator',
    'lib/settings',
    'lib/helpers',
    'widgets/DashboardChannels/main',
    'text!./templates/layout.tpl'
], function(
    user,
    mediator,
    settings,
    helpers,
    DashboardChannelstWidget,
    layoutTemplate
) {
    'use strict';
    return Backbone.Layout.extend({
        className: 'page page-Help',
        template: layoutTemplate,
        serialize: {
           
            supportEmail: settings.supportEmail
        },
        questions: function () {
            return JSON.parse(HelpJson);
        },
        initialize: function () {
            mediator.add(this);
            // Add sub views, must be done during initializing to have access to 'this'
            this.isLoading = false;
            mediator.subscribe(this, 'resize', this.resize, this);
        },
         beforeRender: function () {
            var self = this;
            this.$el.addClass('loading');
            this.setViews({
                '.container-widget-Channels' : new DashboardChannelstWidget({widget: this})
            });
        },    
        afterRender:function(){
                   var view = this;
                   this.$('.page-Helpwrapper').jScrollPane({ showArrows: true, autoReinitialise: true });
                   this.$('.page-Helpwrapper').bind(
                       'jsp-scroll-y',
                       function(event, scrollPositionY, isAtTop, isAtBottom)
                       {
                           if(isAtBottom && !view.isLoading) {
                              console.log('infi' )
                              view.isLoading = true;
                              //display waiting gif
                              view.$el.addClass('loading');
                              view.views['.container-widget-Channels'].loadResults();
                           }
                       }
                   );
                   mediator.broadcast('resize');
        },
               /**
                * resize
                * This handles checking size of various elements and directly adjusts sub views
                * Calling this at any point should provide an updated and accurate size ajustment of the user interface
                */
        resize: function () {
//                   alert("resize")
                  var windowHeight;
                  var reportsListWidth;
                  var mainHeight;
                  var tollBarHight = $('.headr').height();
                  windowHeight = $(window).height();
                  if (windowHeight < 500) {
                      windowHeight = 500;
                  }
                  mainHeight = windowHeight;
                  mainHeight -= $('#header').outerHeight(true);
                  mainHeight = mainHeight - tollBarHight;
                  this.$('.page-Helpwrapper').css('height', mainHeight);
        }

    });
});
