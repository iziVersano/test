require(["one"],function(e){define("nested",["two"],function(e){return{name:"nested",two:e}}),require(["nested"],function(t){doh.register("nestedDefine2",[function(n){n.is("one",e.name),n.is("two",t.two.name),n.is("nested",t.name)}]),doh.run()})});