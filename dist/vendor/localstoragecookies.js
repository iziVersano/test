window.localStorage||(window.localStorage={getItem:function(e){return!e||!this.hasOwnProperty(e)?null:unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)"+escape(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"),"$1"))},key:function(e){return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/,"").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[e])},setItem:function(e,t){if(!e)return;document.cookie=escape(e)+"="+escape(t)+"; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/",this.length=document.cookie.match(/\=/g).length},length:0,removeItem:function(e){if(!e||!this.hasOwnProperty(e))return;document.cookie=escape(e)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/",this.length--},hasOwnProperty:function(e){return(new RegExp("(?:^|;\\s*)"+escape(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=")).test(document.cookie)}},window.localStorage.length=(document.cookie.match(/\=/g)||window.localStorage).length);