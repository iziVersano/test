/*!
 * Test

 */

define([
    'lib/user',
    'lib/mediator',
    'lib/helpers',
    'underscore', 
    'backbone',
    'backbone.layoutmanager',
    './collection/Broadcasts',
    './views/Broadcasts',
     'text!./templates/layout.tpl'
], function(
    user,
    mediator,
    helpers,
    _, 
    Backbone,
    layoutmanager,
    BroadcastsCollection,
    BroadcastsView,
    layoutTemplate
) {
    'use strict';
    return layoutmanager.Layout.extend({
        className: 'widget-Broadcasts',
        template: layoutTemplate,
        initialize: function () {
            var view = this;
            // Add sub views, must be done during initializing to have access to 'this'
            //mediator.subscribe(this, 'loadResults', this.loadResults, this);
            this.broadcasts = new BroadcastsCollection();
            _.each(this.collection,function(model){
                view.broadcasts.add(model);
            });
        },
        
         beforeRender: function () {
            this.setViews({
                '.broadcasts': new BroadcastsView(
                    {
                        model:this.model, 
                        collection: this.broadcasts, 
                        widget:this.options.widget, 
                        channelsCollection:this.options.channels
                   })
            });
            // this.collection.each(function (broadcast) {
            //     this.insertView(new BroadcastItemView({ model: broadcast }));
            // }, this);
        },
        loadResults: function() {
            
            //this.channelsCollection.fetch({success: this.render});
        }
    });
});
