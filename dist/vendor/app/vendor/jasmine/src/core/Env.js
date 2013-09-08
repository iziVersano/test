jasmine.Env=function(){this.currentSpec=null,this.currentSuite=null,this.currentRunner_=new jasmine.Runner(this),this.reporter=new jasmine.MultiReporter,this.updateInterval=jasmine.DEFAULT_UPDATE_INTERVAL,this.defaultTimeoutInterval=jasmine.DEFAULT_TIMEOUT_INTERVAL,this.lastUpdate=0,this.specFilter=function(){return!0},this.nextSpecId_=0,this.nextSuiteId_=0,this.equalityTesters_=[],this.matchersClass=function(){jasmine.Matchers.apply(this,arguments)},jasmine.util.inherit(this.matchersClass,jasmine.Matchers),jasmine.Matchers.wrapInto_(jasmine.Matchers.prototype,this.matchersClass)},jasmine.Env.prototype.setTimeout=jasmine.setTimeout,jasmine.Env.prototype.clearTimeout=jasmine.clearTimeout,jasmine.Env.prototype.setInterval=jasmine.setInterval,jasmine.Env.prototype.clearInterval=jasmine.clearInterval,jasmine.Env.prototype.version=function(){if(jasmine.version_)return jasmine.version_;throw new Error("Version not set")},jasmine.Env.prototype.versionString=function(){if(!jasmine.version_)return"version unknown";var e=this.version(),t=e.major+"."+e.minor+"."+e.build;return e.release_candidate&&(t+=".rc"+e.release_candidate),t+=" revision "+e.revision,t},jasmine.Env.prototype.nextSpecId=function(){return this.nextSpecId_++},jasmine.Env.prototype.nextSuiteId=function(){return this.nextSuiteId_++},jasmine.Env.prototype.addReporter=function(e){this.reporter.addReporter(e)},jasmine.Env.prototype.execute=function(){this.currentRunner_.execute()},jasmine.Env.prototype.describe=function(e,t){var n=new jasmine.Suite(this,e,t,this.currentSuite),r=this.currentSuite;r?r.add(n):this.currentRunner_.add(n),this.currentSuite=n;var i=null;try{t.call(n)}catch(s){i=s}return i&&this.it("encountered a declaration exception",function(){throw i}),this.currentSuite=r,n},jasmine.Env.prototype.beforeEach=function(e){this.currentSuite?this.currentSuite.beforeEach(e):this.currentRunner_.beforeEach(e)},jasmine.Env.prototype.currentRunner=function(){return this.currentRunner_},jasmine.Env.prototype.afterEach=function(e){this.currentSuite?this.currentSuite.afterEach(e):this.currentRunner_.afterEach(e)},jasmine.Env.prototype.xdescribe=function(e,t){return{execute:function(){}}},jasmine.Env.prototype.it=function(e,t){var n=new jasmine.Spec(this,this.currentSuite,e);return this.currentSuite.add(n),this.currentSpec=n,t&&n.runs(t),n},jasmine.Env.prototype.xit=function(e,t){return{id:this.nextSpecId(),runs:function(){}}},jasmine.Env.prototype.compareRegExps_=function(e,t,n,r){return e.source!=t.source&&r.push("expected pattern /"+t.source+"/ is not equal to the pattern /"+e.source+"/"),e.ignoreCase!=t.ignoreCase&&r.push("expected modifier i was"+(t.ignoreCase?" ":" not ")+"set and does not equal the origin modifier"),e.global!=t.global&&r.push("expected modifier g was"+(t.global?" ":" not ")+"set and does not equal the origin modifier"),e.multiline!=t.multiline&&r.push("expected modifier m was"+(t.multiline?" ":" not ")+"set and does not equal the origin modifier"),e.sticky!=t.sticky&&r.push("expected modifier y was"+(t.sticky?" ":" not ")+"set and does not equal the origin modifier"),r.length===0},jasmine.Env.prototype.compareObjects_=function(e,t,n,r){if(e.__Jasmine_been_here_before__===t&&t.__Jasmine_been_here_before__===e)return!0;e.__Jasmine_been_here_before__=t,t.__Jasmine_been_here_before__=e;var i=function(e,t){return e!==null&&e[t]!==jasmine.undefined};for(var s in t)!i(e,s)&&i(t,s)&&n.push("expected has key '"+s+"', but missing from actual.");for(s in e)!i(t,s)&&i(e,s)&&n.push("expected missing key '"+s+"', but present in actual.");for(s in t){if(s=="__Jasmine_been_here_before__")continue;this.equals_(e[s],t[s],n,r)||r.push("'"+s+"' was '"+(t[s]?jasmine.util.htmlEscape(t[s].toString()):t[s])+"' in expected, but was '"+(e[s]?jasmine.util.htmlEscape(e[s].toString()):e[s])+"' in actual.")}return jasmine.isArray_(e)&&jasmine.isArray_(t)&&e.length!=t.length&&r.push("arrays were not the same length"),delete e.__Jasmine_been_here_before__,delete t.__Jasmine_been_here_before__,n.length===0&&r.length===0},jasmine.Env.prototype.equals_=function(e,t,n,r){n=n||[],r=r||[];for(var i=0;i<this.equalityTesters_.length;i++){var s=this.equalityTesters_[i],o=s(e,t,this,n,r);if(o!==jasmine.undefined)return o}return e===t?!0:e===jasmine.undefined||e===null||t===jasmine.undefined||t===null?e==jasmine.undefined&&t==jasmine.undefined:jasmine.isDomNode(e)&&jasmine.isDomNode(t)?e===t:e instanceof Date&&t instanceof Date?e.getTime()==t.getTime():e.jasmineMatches?e.jasmineMatches(t):t.jasmineMatches?t.jasmineMatches(e):e instanceof jasmine.Matchers.ObjectContaining?e.matches(t):t instanceof jasmine.Matchers.ObjectContaining?t.matches(e):jasmine.isString_(e)&&jasmine.isString_(t)?e==t:jasmine.isNumber_(e)&&jasmine.isNumber_(t)?e==t:e instanceof RegExp&&t instanceof RegExp?this.compareRegExps_(e,t,n,r):typeof e=="object"&&typeof t=="object"?this.compareObjects_(e,t,n,r):e===t},jasmine.Env.prototype.contains_=function(e,t){if(jasmine.isArray_(e)){for(var n=0;n<e.length;n++)if(this.equals_(e[n],t))return!0;return!1}return e.indexOf(t)>=0},jasmine.Env.prototype.addEqualityTester=function(e){this.equalityTesters_.push(e)};