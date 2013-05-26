/*!
 * Test

 */

define([
    'lib/user',
    'lib/mediator',
    'lib/helpers',
    './collection/Broadcasts',
    './views/Broadcasts',
     'text!./templates/layout.tpl'
], function(
    user,
    mediator,
    helpers,
    BroadcastsCollection,
    BroadcastsView,
    layoutTemplate
) {
    'use strict';
    return Backbone.Layout.extend({
        className: 'widget-Broadcasts',
        template: layoutTemplate,
        initialize: function () {
            var view = this;
            // Add sub views, must be done during initializing to have access to 'this'
            this.broadcasts = new BroadcastsCollection();
            _.each(this.collection,function(model){
                view.broadcasts.add(model);
            });
        },
         beforeRender: function () {
            this.setViews({
                '.broadcasts': new BroadcastsView({model:this.model, collection: this.broadcasts, widget:this.options.widget})
            });
            // this.collection.each(function (broadcast) {
            //     this.insertView(new BroadcastItemView({ model: broadcast }));
            // }, this);
        },
    });
});
