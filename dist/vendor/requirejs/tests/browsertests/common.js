(function(){function e(){r=!0;if(n.length){var e=document.getElementsByTagName("body")[0];if(e)for(var t=0;t<n.length;t++){var i=document.createElement("div");i.innerHTML=n[t],e.appendChild(i)}n=[]}}function t(){document.readyState==="complete"?e():i<5&&(i+=1,setTimeout(t,1e3))}var n=[],r=!1;window.log=function(t){typeof console!="undefined"&&console.log?console.log(t):(n.push(t),r&&e())};var i=0;t()})();