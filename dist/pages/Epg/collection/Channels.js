define(["lib/settings"],function(e){"use strict";return Backbone.Collection.extend({page:5,parse:function(e){var t=[],n=this,r=0;return _.each(e.data,function(e){r<=n.page&&n.push(e),r++}),this.models}})});