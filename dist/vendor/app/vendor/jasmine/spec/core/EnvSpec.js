describe("jasmine.Env",function(){var e;beforeEach(function(){e=new jasmine.Env,e.updateInterval=0}),describe("ids",function(){it("nextSpecId should return consecutive integers, starting at 0",function(){expect(e.nextSpecId()).toEqual(0),expect(e.nextSpecId()).toEqual(1),expect(e.nextSpecId()).toEqual(2)})}),describe("reporting",function(){var t;beforeEach(function(){t=jasmine.createSpyObj("fakeReporter",["log"])}),describe("version",function(){var t;beforeEach(function(){t=jasmine.version_}),afterEach(function(){jasmine.version_=t}),it("should raise an error if version is not set",function(){jasmine.version_=null;var t;try{e.version()}catch(n){t=n}expect(t.message).toEqual("Version not set")}),it("version should return the current version as an int",function(){jasmine.version_={major:1,minor:9,build:7,revision:8},expect(e.version()).toEqual({major:1,minor:9,build:7,revision:8})}),describe("versionString",function(){it("should return a stringified version number",function(){jasmine.version_={major:1,minor:9,build:7,release_candidate:"1",revision:8},expect(e.versionString()).toEqual("1.9.7.rc1 revision 8")}),it("should return a nice string when version is unknown",function(){jasmine.version_=null,expect(e.versionString()).toEqual("version unknown")})})}),it("should allow reporters to be registered",function(){e.addReporter(t),e.reporter.log("message"),expect(t.log).toHaveBeenCalledWith("message")})}),describe("equality testing",function(){describe("with custom equality testers",function(){var t,n,r;beforeEach(function(){e.addEqualityTester(function(e,i){return t=e,n=i,r})}),it("should call the custom equality tester with two objects for comparison",function(){e.equals_("1","2"),expect(t).toEqual("1"),expect(n).toEqual("2")}),describe("when the custom equality tester returns false",function(){beforeEach(function(){r=!1}),it("should give custom equality testers precedence",function(){expect(e.equals_("abc","abc")).toBeFalsy();var t={};expect(e.equals_(t,t)).toBeFalsy()})}),describe("when the custom equality tester returns true",function(){beforeEach(function(){r=!0}),it("should give custom equality testers precedence",function(){expect(e.equals_("abc","def")).toBeTruthy(),expect(e.equals_(!0,!1)).toBeTruthy()})}),describe("when the custom equality tester returns undefined",function(){beforeEach(function(){r=jasmine.undefined}),it("should use normal equality rules",function(){expect(e.equals_("abc","abc")).toBeTruthy(),expect(e.equals_("abc","def")).toBeFalsy()}),describe("even if there are several",function(){beforeEach(function(){e.addEqualityTester(function(e,t){return jasmine.undefined}),e.addEqualityTester(function(e,t){return jasmine.undefined})}),it("should use normal equality rules",function(){expect(e.equals_("abc","abc")).toBeTruthy(),expect(e.equals_("abc","def")).toBeFalsy()})})}),it("should evaluate custom equality testers in the order they are declared",function(){r=!1,e.addEqualityTester(function(e,t){return!0}),expect(e.equals_("abc","abc")).toBeFalsy()})})})});