!function(e,t){typeof module!="undefined"?module.exports=t():typeof define=="function"&&typeof define.amd=="object"?define("tail",[],function(){return t()}):this[e]=t()}("tail",function(){return{name:"tail"}}),!function(e,t){typeof module!="undefined"?module.exports=t():typeof define=="function"&&typeof define.amd=="object"?define(e,t):this[e]=t()}("eye",function(){return{name:"eye"}}),define("eye",function(){}),function(e){e("newt",["require","tail","eye"],function(e){var t=e("tail"),n=e("eye");return{name:"newt",eyeName:n.name,tailName:t.name}})}(typeof define=="function"&&define.amd?define:function(e,t){typeof module!="undefined"&&module.exports?module.exports=t(require):window.myGlobal=t(function(e){return window[e]})}),function(e){e("spell",["require","newt"],function(e){var t=e("newt");return{name:"spell",newtName:t.name,tailName:t.tailName,eyeName:t.eyeName}})}(typeof define=="function"&&define.amd?define:function(e,t){typeof module!="undefined"&&module.exports?module.exports=t(require):window.myGlobal=t(function(e){return window[e]})}),require({baseUrl:requirejs.isBrowser?"./":"./universal/"},["spell"],function(e){doh.register("universal",[function(t){t.is("spell",e.name),t.is("newt",e.newtName),t.is("tail",e.tailName),t.is("eye",e.eyeName)}]),doh.run()}),define("universal-tests",function(){});