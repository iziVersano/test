define("c1",{name:"c1"}),define("c1/sub",{name:"c1/sub"}),define("a",["c","c/sub"],function(e,t){return{c:e,csub:t}}),define("c",{name:"c"}),define("c/sub",{name:"c/sub"}),define("b",["c","c/sub"],function(e,t){return{c:e,csub:t}}),define("c2",{name:"c2"}),define("c2/sub",{name:"c2/sub"}),define("a/sub/one",["c","c/sub"],function(e,t){return{c:e,csub:t}}),require({baseUrl:"./",paths:{a:"a1"},map:{a:{c:"c1"},"a/sub/one":{c:"c2"}}},["a","b","c","a/sub/one"],function(e,t,n,r){doh.register("mapConfig",[function(i){i.is("c1",e.c.name),i.is("c1/sub",e.csub.name),i.is("c2",r.c.name),i.is("c2/sub",r.csub.name),i.is("c",t.c.name),i.is("c/sub",t.csub.name),i.is("c",n.name)}]),doh.run()}),define("mapConfig-tests",[],function(){});