(function(){function e(){return((1+Math.random())*65536|0).toString(16).substring(1)}function t(){return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()}var n=this._,r=this.Backbone;r.LocalStorage=function(e){this.name=e;var t=this.localStorage().getItem(this.name);this.records=t&&t.split(",")||[]},n.extend(r.LocalStorage.prototype,{save:function(){this.localStorage().setItem(this.name,this.records.join(","))},create:function(e){return e.id||(e.id=t(),e.set(e.idAttribute,e.id)),this.localStorage().setItem(this.name+"-"+e.id,JSON.stringify(e)),this.records.push(e.id.toString()),this.save(),e.toJSON()},update:function(e){return this.localStorage().setItem(this.name+"-"+e.id,JSON.stringify(e)),n.include(this.records,e.id.toString())||this.records.push(e.id.toString()),this.save(),e.toJSON()},find:function(e){return JSON.parse(this.localStorage().getItem(this.name+"-"+e.id))},findAll:function(){return n(this.records).chain().map(function(e){return JSON.parse(this.localStorage().getItem(this.name+"-"+e))},this).compact().value()},destroy:function(e){return this.localStorage().removeItem(this.name+"-"+e.id),this.records=n.reject(this.records,function(t){return t===e.id.toString()}),this.save(),e},localStorage:function(){return localStorage}}),r.LocalStorage.sync=r.localSync=function(e,t,i,s){var o=t.localStorage||t.collection.localStorage;typeof i=="function"&&(i={success:i,error:s});var u;switch(e){case"read":u=t.id!==undefined?o.find(t):o.findAll();break;case"create":u=o.create(t);break;case"update":u=o.update(t);break;case"delete":u=o.destroy(t)}var a=r.LocalStorage.DELAY||0;u?n.delay(n.bind(i.success,i),a*Math.random(),u):n.delay(n.bind(i.error,i),a*Math.random(),"Record not found")},r.ajaxSync=r.sync,r.getSyncMethod=function(e){return e.localStorage||e.collection&&e.collection.localStorage?r.localSync:r.ajaxSync},r.sync=function(e,t,n,i){return r.getSyncMethod(t).apply(this,[e,t,n,i])}})();