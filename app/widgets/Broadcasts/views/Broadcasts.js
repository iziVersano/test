/*!
 * Test

 */

define([
    'lib/helpers',
    './Broadcast',
    'lib/mediator',
    'vendor/jquery.slides',
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
        tagName:'ul',
        className: 'broadcastlist',
        initialize:function () {
        // Listen for broadcasts requests
           mediator.subscribe(this, 'nextResults', this.nextResults, this);
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
           this.$el.attr('id', this.options.widget.cid);
        
           if(this.collection.length > 1){
            //debugger;
            this.applySlide(this.options.channelsCollection.brodcasts);
            console.log('this.collection.brodcasts:' + this.options.channelsCollection.brodcasts);
           }
        },
        /*
        apply the slider plugin on the variouse broadcasts
        */
        applySlide:function(slidernum){
            var view = this;
             this.$el.slidesjs({
             backbonElement : this.options.widget,
             width: 940,    
             height: 528,
             callback: {
               loaded: function(number) {
                 // Use your browser console to view log
                 console.log('SlidesJS: Loaded with slide #' + slidernum);
                 _this._slide(slidernum);
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
        nextResults:function(num){
            //this.applySlide(num);
            this.options.channelsCollection.brodcasts = num;
            this.options.widget.render();
        },
        nextResultss:function(num){
            //this.applySlide(num);
            this.options.channelsCollection.brodcasts = num;
            this.options.widget.render();
        }
    });
});
