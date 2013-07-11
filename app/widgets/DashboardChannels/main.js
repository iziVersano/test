/*!
 * Test

 */

 define([
    'lib/user',
    'lib/mediator',
    'lib/settings',
    'lib/helpers',
    './collection/Channels',
    './models/Channel',
    './views/ListChannels',
    'text!./data/tabs.json',
    'text!./templates/containerChannel.tpl'
], function(
    user,
    mediator,
    settings,
    helpers,
    Channels,
    EpgModel,
    ChannelListView,
    tabsJSON,
    containerChannelTemplate
) {
    'use strict';
    return Backbone.Layout.extend({
        template: containerChannelTemplate,
        className: 'container-reports',
       
        serialize: function () {
            return {
               
                title: this.options.reportId ? 'Edit Channel' : 'Create a Channel'
            };
        },
        initialize: function () {
            this.loadedArr =  [];
            _.bindAll(this, 'onFetchSuccess', 'loadResults', 'onFetchReloadSuccess');
            this.on('onLoadResaults', this.loadResults, this);
            // Listen for broadcasts requests
            //mediator.subscribe(this, 'loadResults', this.loadResults, this);
            //this.on('refreshList', this.render, this);
            this.epgChannels = new Channels();
            //this.epgModel = new EpgModel();
            this.epgChannels.fetch({ success: this.onFetchSuccess });
            //this.epgChannels.on("add reset", this.render, this);
            
            var view = this;
            //this.infiniScroll = new Backbone.InfiniScroll(this.epgChannels, {success: view.render()});
             // this.epgModel.fetch().done(function () { // queue up this callback to run when fetch() completes
             //        view.render();
             // });
          
            //this.dashboards.fetch();
            //Sort Active
            // this.epgChannels.sortBy(function(a) {
            //     return a.get("active");
            // });
            
            //this.chanels = this.epgModel.data.
            
        }, 
        //Refetch Backend with new broadcasts
        loadResults: function(){
           //debugger;
           
           //this.remove();
           
           if(this.epgChannels.brodcasts < 5 && !this.brodcastsLoaded(this.epgChannels.brodcasts)) {
               // reset the colletion 
               this.epgChannels.reset();
               //go fetch more data
               this.epgChannels.fetch({success: this.onFetchSuccess});
           } else {
                this.options.widget.$el.removeClass('loading');
                //mediator.broadcast('nextResults', this.epgChannels.brodcasts);
                this.render();
           }
        },
        beforeRender: function () {
                this.setViews({
                '.container-widget-Channelsx'  : new ChannelListView({ collection: this.epgChannels, widget: this })
                });
        },
        afterRender: function () {
           //mediator.broadcast('nextResults', this.epgChannels.brodcasts);

        },
        onFetchSuccess: function () {
            this.loadedArr.push(this.epgChannels.brodcasts);
            this.options.widget.isLoading = false;
            this.options.widget.$el.removeClass('loading');
            this.render();
        },

        onFetchReloadSuccess:function(){
            //this.options.widget.render();
        },

        brodcastsLoaded:function(limit){
            return  jQuery.inArray(limit, this.loadedArr) > -1
        }
    });
});
