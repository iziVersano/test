define("d",{name:"d"}),define("adapter/d",["d"],function(e){return e.adapted=!0,e}),define("e",["d"],function(e){return{name:"e",d:e}}),require({baseUrl:"./",map:{"*":{d:"adapter/d"},"adapter/d":{d:"d"}}},["e","adapter/d"],function(e,t){doh.register("mapConfigStarAdapter",[function(n){n.is("e",e.name),n.is("d",e.d.name),n.is(!0,e.d.adapted),n.is(!0,t.adapted),n.is("d",t.name)}]),doh.run()}),define("mapConfigStarAdapter-tests",[],function(){});