(function(){function n(){return((1+Math.random())*65536|0).toString(16).substring(1)}function r(){return n()+n()+"-"+n()+"-"+n()+"-"+n()+"-"+n()+n()+n()}var e=this._,t=this.Backbone;t.LocalStorage=window.Store=function(e){this.name=e;var t=this.localStorage().getItem(this.name);this.records=t&&t.split(",")||[]},e.extend(t.LocalStorage.prototype,{save:function(){this.localStorage().setItem(this.name,this.records.join(","))},create:function(e){return e.id||(e.id=r(),e.set(e.idAttribute,e.id)),this.localStorage().setItem(this.name+"-"+e.id,JSON.stringify(e)),this.records.push(e.id.toString()),this.save(),e.toJSON()},update:function(t){return this.localStorage().setItem(this.name+"-"+t.id,JSON.stringify(t)),e.include(this.records,t.id.toString())||this.records.push(t.id.toString()),this.save(),t.toJSON()},find:function(e){return JSON.parse(this.localStorage().getItem(this.name+"-"+e.id))},findAll:function(){return e(this.records).chain().map(function(e){return JSON.parse(this.localStorage().getItem(this.name+"-"+e))},this).compact().value()},destroy:function(t){return this.localStorage().removeItem(this.name+"-"+t.id),this.records=e.reject(this.records,function(e){return e==t.id.toString()}),this.save(),t},localStorage:function(){return localStorage}}),t.LocalStorage.sync=window.Store.sync=t.localSync=function(e,t,n,r){var i=t.localStorage||t.collection.localStorage;typeof n=="function"&&(n={success:n,error:r});var s,o=$.Deferred&&$.Deferred();switch(e){case"read":s=t.id!=undefined?i.find(t):i.findAll();break;case"create":s=i.create(t);break;case"update":s=i.update(t);break;case"delete":s=i.destroy(t)}return s?(n.success(s),o&&o.resolve()):(n.error("Record not found"),o&&o.reject()),o&&o.promise()},t.ajaxSync=t.sync,t.getSyncMethod=function(e){return e.localStorage||e.collection&&e.collection.localStorage?t.LocalStorage.sync:t.ajaxSync},t.sync=function(e,n,r,i){return t.getSyncMethod(n).apply(this,[e,n,r,i])}})();