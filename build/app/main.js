/*!
 * Test - v0.1.0 - 2013-05-16
 * http://Test.com
 * Copyright (c) 2013
 */

(function(){define("domReady",[],function(){"use strict";function u(e){var t;for(t=0;t<e.length;t+=1)e[t](s)}function a(){var e=o;i&&e.length&&(o=[],u(e))}function f(){i||(i=!0,n&&clearInterval(n),a())}function c(e){return i?e(s):o.push(e),c}var e,t,n,r=typeof window!="undefined"&&window.document,i=!r,s=r?document:null,o=[];if(r){if(document.addEventListener)document.addEventListener("DOMContentLoaded",f,!1),window.addEventListener("load",f,!1);else if(window.attachEvent){window.attachEvent("onload",f),t=document.createElement("div");try{e=window.frameElement===null}catch(l){}t.doScroll&&e&&window.external&&(n=setInterval(function(){try{t.doScroll(),f()}catch(e){}},30))}document.readyState==="complete"&&f()}return c.version="2.0.1",c.load=function(e,t,n,r){r.isBuild?n(null):c(n)},c}),define("lib/settings",[],function(){"use strict";return{"apiBaseURL":"http://api.gettuned.in/epg/test","defaultLanguage":"en","loginRoute":"login","loginSuccessRoute":"home","logoutRoute":"logout","databaseSetttings":"settings","homeRoute":"home","splashScreenRoute":"welcome","supportEmail":"support@Test.com","databases":"settings/databases","emailAuthUrl":"util/forgotpassword","successPasswordreset":"resetpwdsuccess","dateFormat":"d MM yy","defaultMinWidth":1224,"defaultChartType":"line","defaultMinHeight":667,"defaultHeaderHeight":61,"defaultToolbarHeight":56,"chartsRoute":"charts"}}),define("lib/mediator",[],function(){"use strict";var e=function(){var e=[],t=[],n=function(t){if(_.isUndefined(t))throw new Error("You must pass an instance lookup");if(!_.isString(t))throw new Error("Instance lookup must be a string");t=$.trim(t);var n=t.substr(0,1),r;return n=="#"?(t=t.substr(1),r=_.filter(e,function(e){return e.instance.id?e.instance.id==t:!1})):n=="."?(t=t.substr(1),r=_.filter(e,function(e){return e.instance.$el?e.instance.$el.hasClass(t):!1})):r=_.filter(e,function(e){return e.name||e.instance.name?e.name==t||e.instance.name==t:!1}),r?_.pluck(r,"instance"):!1},r=function(t){if(_.isUndefined(t))throw new Error("You must pass an instance");if(!_.isObject(t))throw new Error("You have to pass an object to get");var n=_.find(e,function(e){return e.instance===t});return n?n:!1},i=function(){return e},s=function(e){if(!e)throw new Error("Must pass a lookup to get an instance");if(!_.isString(e))throw new Error("Instance lookup must be a string");return n(e)},o=function(){return t},u=function(t,n){if(!_.isObject)throw new Error("Instance must be an object when adding to the mediator");if(n&&!_.isString(n))throw new Error("Instance name must be a string");var i=r(t);if(i)return i;var s={"active":!0,"instance":t};return n&&(s.name=n),e.push(s),s},a=function(n){var i;if(_.isUndefined(n))throw new Error("Must pass an instance or lookup");_.isString(n)?i=s(n):_.isObject(n)&&(i=n);if(i){var o=r(i);return o?(e=_.without(e,o),t=_.filter(t,function(e){return e.instance!=i}),_.isFunction(o.instance.remove)?o.instance.remove():o.instance.$el&&o.instance.$el.remove(),!0):!1}return!1},f=function(){_.each(e,function(e){a(e.instance)})},l=function(e){if(!e)throw new Error("Must pass an instance or lookup to remove");if(!_.isObject(e)&&!_.isString(e))throw new Error("Must pass an object or string to remove");if(_.isObject(e))a(e);else{var t=$.trim(e);_.each(n(t),function(e){a(e)})}},c=function(e,n,i,o){var a;_.isString(e)?a=s(e):_.isObject(e)&&(a=e);if(_.isUndefined(n))throw new Error("When subscribing, you must pass a channel");if(!_.isString(n))throw new Error("When subscribing, channel must be a string");if(_.isUndefined(i))throw new Error("When subscribing, you must pass a callback");if(!_.isFunction(i))throw new Error("When subscribing, callback must be a function");n=$.trim(n);if(a){var f=r(a);f||(f=u(a));var l={"channel":n,"instance":f.instance,"callback":i,"context":o};t.push(l);var c="";return _.each(t,function(e){c+=e.channel+" ("+e.instance.className+"), "}),l}return!1},h=function(e,n){var i;_.isString(e)?i=s(e):_.isObject(e)&&(i=e);if(_.isUndefined(n))throw new Error("When broadcasting, you must pass a channel");if(!_.isString(n))throw new Error("When subscribing, channel must be a string");n=$.trim(n);if(!i)return!1;var o=r(i);if(o)return t=_.without(t,o),!0},p=function(e){if(_.isUndefined(e))throw new Error("When broadcasting, you must pass a channel");if(!_.isString(e))throw new Error("When broadcasting, channel must be a string");e=$.trim(e);var n=_.rest(arguments,1),i=_.filter(t,function(t){return t.channel==e}),s=0;return _.each(i,function(e){var t=r(e.instance);t&&t.active&&(s++,e.callback.apply(e.context,n))}),s===0?!1:!0},d=function(t){var n;_.isString(t)?n=s(t):_.isObject(t)&&(n=[],n.push(t));if(n){var i;return _.each(n,function(t){i=r(t);if(!i)return!1;var n=_.indexOf(e,i);return e[n].active=!0,!0}),!0}return!1},v=function(){_.each(e,function(e){e.active=!0})},m=function(t){var n;_.isString(t)?n=s(t):_.isObject(t)&&(n=t);if(n){var i=r(n);if(!i)throw new Error("Could not start instance, does not exist in the mediator");var o=_.indexOf(e,i);return e[o].active=!1,!0}},g=function(){_.each(e,function(e){e.active=!1})};return{"add":u,"get":s,"remove":l,"removeAll":f,"subscribe":c,"unsubscribe":h,"broadcast":p,"activate":d,"activateAll":v,"deactivate":m,"deactivateAll":g,"getInstances":i,"getChannels":o}};return new e}),define("lib/user",["lib/settings","lib/mediator"],function(e,t){"use strict";var n=Backbone.NestedModel.extend({"router":null,"localStorage":new Backbone.LocalStorage("User"),"sync":Backbone.localSync,"defaults":{"id":"Test","language":e.defaultLanguage},"initialise":function(){}});return new n}),define("lib/helpers",["lib/settings","lib/user","lib/mediator"],function(e,t,n){"use strict";return{"convertTimestamp":function(e){var t=new Date(e*1e3),n=t.getFullYear(),r=("0"+(t.getMonth()+1)).slice(-2),i=("0"+t.getDate()).slice(-2),s=t.getHours(),o=s,u=("0"+t.getMinutes()).slice(-2),a="AM",f;return s>12?(o=s,a="PM"):s==0&&(o=12),f=o+":"+u,f}}}),define("widgets/DashboardChannels/models/Channel",["lib/settings"],function(e){"use strict";return Backbone.NestedModel.extend({"url":"/","defaults":{"broadcasts":{"to":"","subject":"","message":""}}})}),define("widgets/DashboardChannels/collection/Channels",["lib/settings","../models/Channel"],function(e,t){"use strict";return Backbone.Collection.extend({"currentArr":[],"url":"/","page":6,"brodcasts":1,"response":null,"parse":function(e){this.response=e.data;var t=this;return console.log("processing backend data"),_.each(e.data,function(e){var n=_.last(e.broadcasts),r=[];r.push(n);var i={"channel":e.channel,"broadcasts":r};t.push(i)}),this.models},"addResults":function(){console.log("pages:"+this.page);var e=0,t=this;_.each(this.response,function(n){e<=t.page&&$.inArray(n,t.currentArr)==-1&&(console.log("model id:"+n.channel.id),t.currentArr.push(n),t.add(n)),e++})}})}),define("widgets/Broadcasts/models/Broadcast",["lib/settings"],function(e){"use strict";return Backbone.NestedModel.extend({"url":"/"})}),define("widgets/Broadcasts/collection/Broadcasts",["lib/settings","../models/Broadcast"],function(e,t){"use strict";return Backbone.Collection.extend({"currentArr":[],"page":10,"response":null})}),define("text",["module"],function(e){"use strict";var t,n,r=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],i=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,s=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,o=typeof location!="undefined"&&location.href,u=o&&location.protocol&&location.protocol.replace(/\:/,""),a=o&&location.hostname,f=o&&(location.port||undefined),l=[],c=e.config&&e.config()||{};t={"version":"2.0.3","strip":function(e){if(e){e=e.replace(i,"");var t=e.match(s);t&&(e=t[1])}else e="";return e},"jsEscape":function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},"createXhr":c.createXhr||function(){var e,t,n;if(typeof XMLHttpRequest!="undefined")return new XMLHttpRequest;if(typeof ActiveXObject!="undefined")for(t=0;t<3;t+=1){n=r[t];try{e=new ActiveXObject(n)}catch(i){}if(e){r=[n];break}}return e},"parseName":function(e){var t=!1,n=e.indexOf("."),r=e.substring(0,n),i=e.substring(n+1,e.length);return n=i.indexOf("!"),n!==-1&&(t=i.substring(n+1,i.length),t=t==="strip",i=i.substring(0,n)),{"moduleName":r,"ext":i,"strip":t}},"xdRegExp":/^((\w+)\:)?\/\/([^\/\\]+)/,"useXhr":function(e,n,r,i){var s,o,u,a=t.xdRegExp.exec(e);return a?(s=a[2],o=a[3],o=o.split(":"),u=o[1],o=o[0],(!s||s===n)&&(!o||o.toLowerCase()===r.toLowerCase())&&(!u&&!o||u===i)):!0},"finishLoad":function(e,n,r,i){r=n?t.strip(r):r,c.isBuild&&(l[e]=r),i(r)},"load":function(e,n,r,i){if(i.isBuild&&!i.inlineText){r();return}c.isBuild=i.isBuild;var s=t.parseName(e),l=s.moduleName+"."+s.ext,h=n.toUrl(l),p=c.useXhr||t.useXhr;!o||p(h,u,a,f)?t.get(h,function(n){t.finishLoad(e,s.strip,n,r)},function(e){r.error&&r.error(e)}):n([l],function(e){t.finishLoad(s.moduleName+"."+s.ext,s.strip,e,r)})},"write":function(e,n,r,i){if(l.hasOwnProperty(n)){var s=t.jsEscape(l[n]);r.asModule(e+"!"+n,"define(function () { return '"+s+"';});\n")}},"writeFile":function(e,n,r,i,s){var o=t.parseName(n),u=o.moduleName+"."+o.ext,a=r.toUrl(o.moduleName+"."+o.ext)+".js";t.load(u,r,function(n){var r=function(e){return i(a,e)};r.asModule=function(e,t){return i.asModule(e,a,t)},t.write(e,u,r,s)},s)}};if(c.env==="node"||!c.env&&typeof process!="undefined"&&process.versions&&!!process.versions.node)n=require.nodeRequire("fs"),t.get=function(e,t){var r=n.readFileSync(e,"utf8");r.indexOf("﻿")===0&&(r=r.substring(1)),t(r)};else if(c.env==="xhr"||!c.env&&t.createXhr())t.get=function(e,n,r){var i=t.createXhr();i.open("GET",e,!0),c.onXhr&&c.onXhr(i,e),i.onreadystatechange=function(t){var s,o;i.readyState===4&&(s=i.status,s>399&&s<600?(o=new Error(e+" HTTP status: "+s),o.xhr=i,r(o)):n(i.responseText))},i.send(null)};else if(c.env==="rhino"||!c.env&&typeof Packages!="undefined"&&typeof java!="undefined")t.get=function(e,t){var n,r,i="utf-8",s=new java.io.File(e),o=java.lang.System.getProperty("line.separator"),u=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(s),i)),a="";try{n=new java.lang.StringBuffer,r=u.readLine(),r&&r.length()&&r.charAt(0)===65279&&(r=r.substring(1)),n.append(r);while((r=u.readLine())!==null)n.append(o),n.append(r);a=String(n.toString())}finally{u.close()}t(a)};return t}),define("text!widgets/Broadcasts/templates/broadcast.tpl",[],function(){return'<div class="brodcastImage"> <img src="<%= broadcastImage%>" > </div>\r\n<div class="broadcastInfo">\r\n	<div class="left">\r\n		<div class="brodcastTitle"><%= program%></div>\r\n		<div class=\'popularity\'>\r\n			<span class="stars"><span style="width: 50px;"></span></span>\r\n		</div>\r\n		<div class="brodcastTime"><%= broadcastTime%></div>\r\n	</div>\r\n	<div class="right">\r\n		<div class="avatar"><img src="" ></div>\r\n		<div class="avatar"><img src="" ></div>\r\n		<div class="avatar"><img src="" ></div>\r\n		<div class="avatar"><img src="" ></div>\r\n	</div>\r\n</div>\r\n'}),define("widgets/Broadcasts/views/broadcast",["lib/helpers","lib/user","lib/mediator","text!../templates/broadcast.tpl"],function(e,t,n,r){"use strict";return Backbone.View.extend({"template":r,"className":"broadcast","serialize":function(){return{"broadcastId":this.model.get("broadcast").id,"broadcastImage":this.model.get("images").backdrops.w154,"program":this.model.get("program").title,"broadcastTime":this.getBroadcastTime()}},"initialize":function(){this.popularity=this.model.get("program").popularity,this.getBroadcastTime()},"beforeRender":function(){},"afterRender":function(){var e=this,t=parseFloat(parseFloat(this.popularity));console.log("pop:"+t),$.fn.stars=function(){return $(this).each(function(){$(this).html($("<span />").width(Math.max(0,Math.min(5,t))*46))})},this.$("span.stars").stars()},"getBroadcastTime":function(){var t=e.convertTimestamp(this.model.get("time").start),n=e.convertTimestamp(this.model.get("time").end);return t+" - "+n}})}),define("widgets/Broadcasts/views/Broadcasts",["lib/helpers","./broadcast","lib/mediator"],function(e,t,n){"use strict";return Backbone.View.extend({"className":"broadcastlist","initialize":function(){},"beforeRender":function(){this.collection.each(function(e){this.insertView(new t({"model":e}))},this)}})}),define("text!widgets/Broadcasts/templates/layout.tpl",[],function(){return'<div class="broadcasts"></div>'}),define("widgets/Broadcasts/main",["lib/user","lib/mediator","lib/helpers","./collection/Broadcasts","./views/Broadcasts","text!./templates/layout.tpl"],function(e,t,n,r,i,s){"use strict";return Backbone.Layout.extend({"className":"widget-Broadcasts","template":s,"initialize":function(){var e=this;this.broadcasts=new r,_.each(this.collection,function(t){e.broadcasts.add(t)})},"beforeRender":function(){this.setViews({".broadcasts":new i({"collection":this.broadcasts})})}})}),define("text!widgets/DashboardChannels/templates/channel.tpl",[],function(){return'\r\n<div class="channel"><img src="<%= channeLogo%>" ></div>\r\n<div class="container-widget-broadcasts" id=\'pane2\'></div>\r\n\r\n        \r\n    \r\n   '}),define("widgets/DashboardChannels/views/AccordionItem",["lib/helpers","lib/mediator","widgets/Broadcasts/main","text!../templates/channel.tpl"],function(e,t,n,r){"use strict";return Backbone.View.extend({"className":"tablecontainerrow","template":r,"initialize":function(){},"serialize":function(){return{"channeLogo":this.model.get("channel").img.icons.w110,"avatar":this.model.get("channel").id}},"beforeRender":function(){this.setViews({".container-widget-broadcasts":new n({"brodcasts":this.collection,"collection":this.options.broadcasts,"widget":this})})},"afterRender":function(){}})}),define("text!widgets/DashboardChannels/templates/titleEpg.tpl",[],function(){return'\n<div class="headr"> tunedin</div>\n'}),define("widgets/DashboardChannels/views/ListChannels",["lib/helpers","./AccordionItem","lib/mediator","text!../templates/titleEpg.tpl"],function(e,t,n,r){"use strict";return Backbone.View.extend({"className":"tablecontainer","serialize":function(){return{}},"initialize":function(){},"beforeRender":function(){this.collection.each(function(e){this.insertView(new t({"collection":this.collection,"broadcasts":e.get("broadcasts"),"model":e}))},this)}})}),define("text!widgets/DashboardChannels/data/tabs.json",[],function(){return'[\n    {\n        "id": "reports",\n        "slug": "reports"\n    }\n]'}),define("text!widgets/DashboardChannels/templates/containerChannel.tpl",[],function(){return'<div class="container container-widget-Channelsx">\n    \n</div>\n<!-- <div class="bottom-separator"></div> -->'}),define("widgets/DashboardChannels/main",["lib/user","lib/mediator","lib/settings","lib/helpers","./collection/Channels","./models/Channel","./views/ListChannels","text!./data/tabs.json","text!./templates/containerChannel.tpl"],function(e,t,n,r,i,s,o,u,a){"use strict";return Backbone.Layout.extend({"template":a,"className":"container-reports","serialize":function(){return{"title":this.options.reportId?"Edit Channel":"Create a Channel"}},"initialize":function(){_.bindAll(this,"onFetchSuccess","loadResults","onFetchReloadSuccess"),this.epgChannels=new i,this.epgModel=new s,this.epgChannels.fetch({"success":this.onFetchSuccess});var e=this},"loadResults":function(){debugger;this.epgChannels.brodcasts<5?(this.epgChannels.brodcasts+=1,this.epgChannels.fetch({"success":this.onFetchSuccess})):this.options.widget.$el.removeClass("loading")},"beforeRender":function(){this.setViews({".container-widget-Channelsx":new o({"collection":this.epgChannels,"widget":this})})},"afterRender":function(){},"onFetchSuccess":function(){this.options.widget.isLoading=!1,this.options.widget.$el.removeClass("loading"),this.render()},"onFetchReloadSuccess":function(){this.options.widget.render()}})}),define("text!pages/Epg/templates/layout.tpl",[],function(){return'<div class="overlay-loading"></div>\n<div class="headr"> tunedin</div>\n<div class="page-Helpwrapper" id="pane1">\n    <div class="page-content">\n    <div class="page-wrapper">\n        <div class="container-widget-Channels">\n    </div>\n</div>\n</div>\n\n\n'}),define("pages/Epg/main",["lib/user","lib/mediator","lib/settings","lib/helpers","widgets/DashboardChannels/main","text!./templates/layout.tpl"],function(e,t,n,r,i,s){"use strict";return Backbone.Layout.extend({"className":"page page-Help","template":s,"serialize":{"supportEmail":n.supportEmail},"questions":function(){return JSON.parse(HelpJson)},"initialize":function(){t.add(this),this.isLoading=!1,t.subscribe(this,"resize",this.resize,this)},"beforeRender":function(){var e=this;this.$el.addClass("loading"),this.setViews({".container-widget-Channels":new i({"widget":this})})},"afterRender":function(){var e=this;this.$(".page-Helpwrapper").jScrollPane({"showArrows":!0,"autoReinitialise":!0}),this.$(".page-Helpwrapper").bind("jsp-scroll-y",function(t,n,r,i){i&&!e.isLoading&&(console.log("infi"),e.isLoading=!0,e.$el.addClass("loading"),e.views[".container-widget-Channels"].loadResults())}),t.broadcast("resize")},"resize":function(){var e,t,n,r=$(".headr").height();e=$(window).height(),e<500&&(e=500),n=e,n-=$("#header").outerHeight(!0),n-=r,this.$(".page-Helpwrapper").css("height",n)}})}),define("routers/Main",["lib/user","lib/mediator","lib/helpers","lib/settings","pages/Epg/main"],function(e,t,n,r,i){"use strict";return Backbone.Router.extend({"routes":{"":"index","epg":"epg"},"initialize":function(){t.subscribe(this,"errorMessage",this.onErrorMessage,this),$(window).bind("resize",function(){t.broadcast("resize",$(window).width(),$(window).height()),t.broadcast("resizePopup")}),$(window).bind("error",function(e,n,r){var i;i=e.originalEvent.message,i+=" "+e.originalEvent.filename,i+=" ("+e.originalEvent.lineno+")",t.broadcast("errorMessage",i)})},"index":function(){e.router.navigate("home",{"trigger":!0})},"epg":function(){t.remove(".page");var e=new i;$("#app").html(e.el),e.render()},"onErrorMessage":function(e){alert("basic error "+e)}})}),define("lib/mods",["lib/settings","lib/user","lib/mediator"],function(e,t,n){"use strict";Backbone.emulateHTTP=!1,Backbone.emulateJSON=!1,Backbone.sync=function(t,r,i){var s,o={"create":"POST","update":"PUT","delete":"DELETE","read":"GET"},u=JSON.stringify(r.toJSON());if(u.length>2e4&&(o[t]=="POST"||o[t]=="PUT"||o[t]=="DELETE")){s=e.apiBaseURL+"/"+o[t].toLowerCase();var a="POST",f="json",l=!1}else{s=e.apiBaseURL+"/__";var a="GET",f="jsonp",l=!0,u=encodeURIComponent(u)}s+=(_.isFunction(r.url)?r.url():r.url)+"/";if(l){s+="?&callback=?",s+="&_method="+o[t],s+="&start=1367320200",s+="&limit="+r.brodcasts;var c={}}else var c={"_payload":u};return $.ajax({"url":s,"type":a,"crossDomain":!0,"dataType":f,"data":c,"timeout":36e4,"success":function(e,t,s){return e.kind=="error"||e.success=="false"||e.success===!1?(i.error&&_.isFunction(i.error)&&(i.error.apply(r,[r,e.error]),n.broadcast("errorMessage",{"message":e.description,"error_code":e.error_code})),!1):(i.success&&_.isFunction(i.success)&&i.success.apply(r,[e,200,i]),!0)},"error":function(e,t,n){}})}}),require.config({"paths":{"text":"../vendor/require.text-2.0.3","domReady":"../vendor/require.domReady-2.0.1"}}),Backbone.LayoutManager.configure({"fetch":function(e){"use strict";return _.template(e)},"manage":!0}),require(["domReady","lib/settings","lib/user","lib/mediator","routers/Main","lib/mods"],function(e,t,n,r,i){"use strict";e(function(){n.router=new i,Backbone.history.start()})}),define("main",[],function(){})})();