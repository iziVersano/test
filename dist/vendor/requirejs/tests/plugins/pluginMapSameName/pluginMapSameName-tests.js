require({map:{"*":{plugin:"plugin/plugin"}}},["plugin!foo"],function(e){doh.register("pluginMapSameName",[function(t){t.is("foo",e)}]),doh.run()});