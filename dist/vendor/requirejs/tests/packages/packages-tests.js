require({baseUrl:requirejs.isBrowser?"./":"./packages/",paths:{"alpha/replace":"replace"},packages:[{name:"alpha",location:"pkgs/alpha"},{name:"beta",location:"pkgs/beta/0.2/scripts",main:"beta"},{name:"dojox/chair",location:"pkgs/dojox/chair"},{name:"dojox/table",location:"pkgs/dojox/table",main:"table"},{name:"bar",location:"bar/0.4",main:"scripts/main"},{name:"foo",location:"foo/lib"},{name:"funky",main:"index.js"},{name:"baz",location:"baz/lib",main:"index"},{name:"dojox/window",location:"dojox/window",main:"window"}]},["require","alpha","alpha/replace","beta","beta/util","bar","baz","foo","foo/second","dojox/chair","dojox/table","dojox/door","dojox/window/pane","dojox/window","dojox/table/legs","funky"],function(e,t,n,r,i,s,o,u,a,f,l,c,h,p,d,v){var m=e.toUrl("foo/../data.html");doh.register("packages",[function(e){e.is("alpha",t.name),e.is("fake/alpha/replace",n.name),e.is("beta",r),e.is("beta/util",i.name),e.is("bar",s.name),e.is("0.4",s.version),e.is("baz",o.name),e.is("0.4",o.barDepVersion),e.is("foo",o.fooName),e.is("baz/helper",o.helperName),e.is("foo",u.name),e.is("alpha",u.alphaName),e.is("foo/second",a.name),e.is(requirejs.isBrowser?"./foo/lib/../data.html":"./packages/foo/lib/../data.html",m),e.is("dojox/chair",f.name),e.is("dojox/chair/legs",f.legsName),e.is("dojox/table",l.name),e.is("dojox/chair",l.chairName),e.is("dojox/table/legs",d.name),e.is("dojox/door",c.name),e.is("dojox/window/pane",h.name),e.is("dojox/window",p.name),e.is("dojox/window/pane",p.paneName),e.is("funky",v.name),e.is("monkey",v.monkeyName)}]),doh.run()});