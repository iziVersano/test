(function(e,t){function n(){o=e.now(),u=u||t(r,10)}function r(){var n=e.now();n-o<e.resizestop.threshold?u=t(r,10):(clearTimeout(u),u=o=0,a.width=i.width(),a.height=i.height(),s.trigger("resizestop"))}var i=e(window),s=e([]),o=0,u=0,a={};e.resizestop={propagate:!1,threshold:500},e.event.special.resizestop={setup:function(e,t){console.log("	setup:"),s=s.not(this),s=s.add(this),s.length===1&&i.bind("resize",n)},teardown:function(e){s=s.not(this),s.length||i.unbind("resize",n)},add:function(t){var n=t.handler;t.handler=function(t){return e.resizestop.propagate||t.stopPropagation(),t.data=t.data||{},t.data.size=t.data.size||{},e.extend(t.data.size,a),n.apply(this,arguments)}},remove:function(){console.log("...removing: ",this,arguments)}}})(jQuery,setTimeout);