(function(){function e(){var e,t,n;if(typeof XMLHttpRequest!="undefined")return new XMLHttpRequest;for(t=0;t<3;t++){n=o[t];try{e=new ActiveXObject(n)}catch(r){}if(e){o=[n];break}}if(!e)throw new Error("require.getXhr(): XMLHttpRequest not available");return e}var t={},n,r,i,s,o=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"];typeof window!="undefined"&&window.navigator&&window.document?n=function(t,n){var r=e();r.open("GET",t,!0),r.onreadystatechange=function(e){r.readyState===4&&n(r.responseText)},r.send(null)}:typeof process!="undefined"&&process.versions&&!!process.versions.node?(r=require.nodeRequire("fs"),n=function(e,t){t(r.readFileSync(e,"utf8"))}):typeof Packages!="undefined"?n=function(e,t){var n="utf-8",r=new java.io.File(e),i=java.lang.System.getProperty("line.separator"),s=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(r),n)),o,u,a="";try{o=new java.lang.StringBuffer,u=s.readLine(),u&&u.length()&&u.charAt(0)===65279&&(u=u.substring(1)),o.append(u);while((u=s.readLine())!==null)o.append(i),o.append(u);a=String(o.toString())}finally{s.close()}t(a)}:typeof Components!="undefined"&&Components.classes&&Components.interfaces&&(i=Components.classes,s=Components.interfaces,Components.utils["import"]("resource://gre/modules/FileUtils.jsm"),n=function(e,t){var n,r,o={},u=new FileUtils.File(e);try{n=i["@mozilla.org/network/file-input-stream;1"].createInstance(s.nsIFileInputStream),n.init(u,1,0,!1),r=i["@mozilla.org/intl/converter-input-stream;1"].createInstance(s.nsIConverterInputStream),r.init(n,"utf-8",n.available(),s.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),r.readString(n.available(),o),r.close(),n.close(),t(o.value)}catch(a){throw new Error((u&&u.path||"")+": "+a)}}),define([],function(){return{load:function(e,r,i,s){var o=r.toUrl(e+".refine");n(o,function(n){n=n.replace(/refine\s*\(/g,"define("),s.isBuild&&(t[e]=n),n+="\r\n//@ sourceURL="+o,i.fromText(n)})},write:function(e,n,r){if(n in t){var i=t[n];r.asModule(e+"!"+n,i)}}}})})();