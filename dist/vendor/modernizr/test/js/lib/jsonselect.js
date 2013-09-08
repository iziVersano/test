(function(e){function t(e){try{return JSON&&JSON.parse?JSON.parse(e):(new Function("return "+e))()}catch(t){n("ijs")}}function n(e){throw new Error(l[e])}function r(e){return Array.isArray?Array.isArray(e):f.call(e)==="[object Array]"}function i(e){if(e===null)return"null";var t=typeof e;return t==="object"&&r(e)&&(t="array"),t}function s(e,t,n,r,s){var o=[],u=t[0]===">"?t[1]:t[0],a=!0,f;return u.type&&(a=a&&u.type===i(e)),u.id&&(a=a&&u.id===n),a&&u.pf&&(u.pf===":nth-last-child"?r=s-r:r++,u.a===0?a=u.b===r:(f=(r-u.b)%u.a,a=!f&&r*u.a+u.b>=0)),t[0]!==">"&&t[0].pc!==":root"&&o.push(t),a&&(t[0]===">"?t.length>2&&(a=!1,o.push(t.slice(2))):t.length>1&&(a=!1,o.push(t.slice(1)))),[a,o]}function o(e,t,n,i,u,a){var f=e[0]===","?e.slice(1):[e],l=[],c=!1,h=0,p=0,d=0,v,m;for(h=0;h<f.length;h++){m=s(t,f[h],i,u,a),m[0]&&(c=!0);for(p=0;p<m[1].length;p++)l.push(m[1][p])}if(l.length&&typeof t=="object"){l.length>=1&&l.unshift(",");if(r(t))for(h=0;h<t.length;h++)o(l,t[h],n,undefined,h,t.length);else{d=0;for(v in t)t.hasOwnProperty(v)&&d++;h=0;for(v in t)t.hasOwnProperty(v)&&o(l,t[v],n,v,h++,d)}}c&&n&&n(t)}function u(e,t){var n=[];return o(e,t,function(e){n.push(e)}),n}function a(e){return{sel:v(e),match:function(e){return u(this.sel,e)},forEach:function(e,t){return o(this.sel,e,t)}}}var f=Object.prototype.toString,l={ijs:"invalid json string",mpc:"multiple pseudo classes (:xxx) not allowed",mepf:"malformed expression in pseudo-function",nmi:"multiple ids not allowed",se:"selector expected",sra:"string required after '.'",uc:"unrecognized char",ujs:"unclosed json string",upc:"unrecognized pseudo class"},c={psc:1,psf:2,typ:3,str:4},h=/^(?:([\r\n\t\ ]+)|([*.,>])|(string|boolean|null|array|object|number)|(:(?:root|first-child|last-child|only-child))|(:(?:nth-child|nth-last-child))|(:\w+)|(\"(?:[^\\]|\\[^\"])*\")|(\")|((?:[_a-zA-Z]|[^\0-\0177]|\\[^\r\n\f0-9a-fA-F])(?:[_a-zA-Z0-9\-]|[^\u0000-\u0177]|(?:\\[^\r\n\f0-9a-fA-F]))*))/,p=/^\s*\(\s*(?:([+\-]?)([0-9]*)n\s*(?:([+\-])\s*([0-9]))?|(odd|even)|([+\-]?[0-9]+))\s*\)/,d=function(e,r){r||(r=0);var i=h.exec(e.substr(r));if(!i)return undefined;r+=i[0].length;var s;return i[1]?s=[r," "]:i[2]?s=[r,i[0]]:i[3]?s=[r,c.typ,i[0]]:i[4]?s=[r,c.psc,i[0]]:i[5]?s=[r,c.psf,i[0]]:i[6]?n("upc"):i[7]?s=[r,c.str,t(i[0])]:i[8]?n("ujs"):i[9]&&(s=[r,c.str,i[0].replace(/\\([^\r\n\f0-9a-fA-F])/g,"$1")]),s},v=function(e){var t=[],n=0,r;for(;;){var i=m(e,n);t.push(i[1]),i=d(e,n=i[0]),i&&i[1]===" "&&(i=d(e,n=i[0]));if(!i)break;i[1]===">"?(t.push(">"),n=i[0]):i[1]===","&&(r===undefined?r=[",",t]:r.push(t),t=[],n=i[0])}return r&&r.push(t),r?r:t},m=function(e,t){var r=t,i={},s=d(e,t);s&&s[1]===" "&&(r=t=s[0],s=d(e,t)),s&&s[1]===c.typ?(i.type=s[2],s=d(e,t=s[0])):s&&s[1]==="*"&&(s=d(e,t=s[0]));for(;;){if(s===undefined)break;if(s[1]===".")s=d(e,t=s[0]),(!s||s[1]!==c.str)&&n("sra"),i.id&&n("nmi"),i.id=s[2];else if(s[1]===c.psc)(i.pc||i.pf)&&n("mpc"),s[2]===":first-child"?(i.pf=":nth-child",i.a=0,i.b=1):s[2]===":last-child"?(i.pf=":nth-last-child",i.a=0,i.b=1):i.pc=s[2];else{if(s[1]!==c.psf)break;(i.pc||i.pf)&&n("mpc"),i.pf=s[2];var o=p.exec(e.substr(s[0]));o||n("mepf"),o[5]?(i.a=2,i.b=o[5]==="odd"?1:0):o[6]?(i.a=0,i.b=parseInt(o[6],10)):(i.a=parseInt((o[1]?o[1]:"+")+(o[2]?o[2]:"1"),10),i.b=o[3]?parseInt(o[3]+o[4],10):0),s[0]+=o[0].length}s=d(e,t=s[0])}return r===t&&n("se"),[t,i]};e._lex=d,e._parse=v,e.match=function(e,t){return a(e).match(t)},e.forEach=function(e,t,n){return a(e).forEach(t,n)},e.compile=a})(typeof exports=="undefined"?window.JSONSelect={}:exports);