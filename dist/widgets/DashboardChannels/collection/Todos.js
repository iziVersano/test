define(["lib/settings","../models/Todo"],function(e,t){"use strict";return Backbone.Collection.extend({url:"/todos",model:t,parse:function(e){var t=e.response.todos;return _(t).map(function(t){return _.extend(t,{list:e.response.list})})},comparator:function(e){return e.get("priority")},findByPriority:function(e){return this.filter(function(t){return t.get("priority")==e})}})});