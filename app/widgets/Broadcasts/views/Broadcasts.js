/*!
 * Test

 */

define([
    'lib/helpers',
    './broadcast',
    'lib/mediator',
    'slidesjs',
    'text!../templates/broadcastsCarousel.tpl'
], function(
    helpers,
    BroadcastItemView,
    mediator,
    slidesjs,
    broadcastsCarousel
) {
    'use strict';
    return Backbone.View.extend({
        //template: reportsTemplat
        className: 'broadcastlist',
        initialize:function () {
          
        },
        beforeRender: function () {
            //this.collection.sort();
            this.collection.each(function (broadcast) {
                this.insertView(new BroadcastItemView({ model: broadcast }));
            }, this);
        },

        serialize: function () {
            return {
                listID:this.options.widget.cid,
            };
        },

        afterRender: function ( ) {
          debugger;
           this.$el.attr('id', this.options.widget.cid);
            this.$el.slidesjs({
              backbonElement : this.options.widget,
              width: 940,    
              height: 528,
              callback: {
                loaded: function(number) {
                  // Use your browser console to view log
                  console.log('SlidesJS: Loaded with slide #' + number);

                  // Show start slide in log
                  //$('#slidesjs-log .slidesjs-slide-number').text(number);
                },
                start: function(number) {
                  // Use your browser console to view log
                  console.log('SlidesJS: Start Animation on slide #' + number);
                },
                complete: function(number) {
                  // Use your browser console to view log
                  console.log('SlidesJS: Animation Complete. Current slide is #' + number);

                  // Change slide number on animation complete
                  //$('#slidesjs-log .slidesjs-slide-number').text(number);
                }
              }
            });
        },
    });
});
