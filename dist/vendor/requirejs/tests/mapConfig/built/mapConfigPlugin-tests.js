define("plug",{load:function(e,t,n,r){e?e.charAt(0)==="/"&&(e="main"+e):e="main",e=e.split("/").shift(),e="plug/"+e,t([e],n)}}),define("plug/c1",{name:"plug!c1"}),define("a",["c","c/sub"],function(e,t){return{c:e,csub:t}}),define("plug/main",{name:"plug!main"}),define("b",["c","c/sub"],function(e,t){return{c:e,csub:t}}),define("plug/c2",{name:"plug!c2"}),define("a/sub/one",["c","c/sub"],function(e,t){return{c:e,csub:t}}),require({baseUrl:"./",paths:{a:"a1"},map:{"*":{c:"plug!"},a:{c:"plug!c1"},"a/sub/one":{c:"plug!c2"}}},["a","b","c","a/sub/one"],function(e,t,n,r){doh.register("mapConfigPlugin",[function(i){i.is("plug!c1",e.c.name),i.is("plug!c1",e.csub.name),i.is("plug!c2",r.c.name),i.is("plug!c2",r.csub.name),i.is("plug!main",t.c.name),i.is("plug!main",t.csub.name),i.is("plug!main",n.name)}]),doh.run()}),define("mapConfigPlugin-tests",[],function(){});