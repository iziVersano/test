require({baseUrl:"./",paths:{a:"a1"},map:{a:{c:"c1"},"a/sub/one":{c:"c2"}}},["a","b","c","a/sub/one"],function(e,t,n,r){doh.register("mapConfig",[function(i){i.is("c1",e.c.name),i.is("c1/sub",e.csub.name),i.is("c2",r.c.name),i.is("c2/sub",r.csub.name),i.is("c",t.c.name),i.is("c/sub",t.csub.name),i.is("c",n.name)}]),doh.run()});