/*!
 * Test

 */

define([
    'lib/helpers',
    'lib/mediator',
    'widgets/Broadcasts/main',
   // 'slidesjs',
    'text!../templates/channel.tpl'

], function(
    helpers,
    mediator,
    BroadcastsWidget,
   // slidesjs,
    channelTemplate
) {
    'use strict';
    return Backbone.View.extend({
        tagName: 'li',
        className: 'tablecontainerrow',
        template: channelTemplate,
        events: {
            'click .next'           : 'onNextBroadcast',
            'click .prev'           : 'onPrevBroadcast'
        },
        initialize: function () {
         // this.collection.on("add reset", this.render, this);
         this.slideNumber = this.collection.brodcasts;
        },
          serialize: function () {
            return {
               
                channeLogo: this.model.get('channel').img.icons['w110'],
                avatar:this.model.get('channel').id
            };
        },
        beforeRender: function () {
            this.nextButton = this.$('.next');
            this.prevButton = this.$('.prev');
             this.setViews({
            '.container-widget-broadcasts'  : new BroadcastsWidget({
              model:this.model, 
              channels:this.collection , 
              collection: this.options.broadcasts, 
              widget: this })
            });
        },

        afterRender: function () {
 

        },
        onNextBroadcast:function(){
                   this.collection.brodcasts += 1; // Load next broadcast
                   this.options.widget.trigger('onLoadResaults');
        },
        onPrevBroadcast:function(){
                   this.collection.brodcasts -= 1; // Load next broadcast
                   this.options.widget.trigger('onLoadResaults');
        }      
     });
});