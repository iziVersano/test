describe("RunnerTest",function(){var e,t;beforeEach(function(){t=new jasmine.Env,t.updateInterval=0,e=new jasmine.FakeTimer,t.setTimeout=e.setTimeout,t.clearTimeout=e.clearTimeout,t.setInterval=e.setInterval,t.clearInterval=e.clearInterval}),describe("beforeEach",function(){it("should run before each spec for all suites",function(){var e;t.beforeEach(function(){e=0}),t.describe("suite 1",function(){t.it("test 1-1",function(){e++,this.expect(e).toEqual(1)}),t.it("test 1-2",function(){e++,this.expect(e).toEqual(1)})}),t.describe("suite 2",function(){t.it("test 2-1",function(){e++,this.expect(e).toEqual(1)})}),t.currentRunner().execute();var n=t.currentRunner().results();expect(n.totalCount).toEqual(3),expect(n.passedCount).toEqual(3)}),it("should provide all specs",function(){var e;t.beforeEach(function(){e=0}),t.describe("suite 1",function(){t.it("test 1-1",function(){e++,this.expect(e).toEqual(1)}),t.it("test 1-2",function(){e++,this.expect(e).toEqual(1)})}),t.describe("suite 2",function(){t.it("test 2-1",function(){e++,this.expect(e).toEqual(1)})}),t.currentRunner().execute(),expect(t.currentRunner().specs().length).toEqual(3)})}),describe("afterEach",function(){it("should run after each spec for all suites",function(){var e=3;t.afterEach(function(){e-=1}),t.describe("suite 1",function(){t.it("test 1-1",function(){this.expect(e).toEqual(3)}),t.it("test 1-2",function(){this.expect(e).toEqual(2)})}),t.describe("suite 2",function(){t.it("test 2-1",function(){this.expect(e).toEqual(1)})}),t.currentRunner().execute();var n=t.currentRunner().results();expect(n.totalCount).toEqual(3),expect(n.passedCount).toEqual(3)}),it("should run after a failing spec",function(){var e=jasmine.createSpy();t.afterEach(e),t.describe("suite",function(){t.it("fails",function(){this.explodes()})}).execute(),expect(e).toHaveBeenCalled()})}),it("should run child suites and specs and generate results when execute is called",function(){t.describe("one suite description",function(){t.it("should be a test",function(){this.runs(function(){this.expect(!0).toEqual(!0)})})}),t.describe("another suite description",function(){t.it("should be another test",function(){this.runs(function(){this.expect(!0).toEqual(!1)})})}),t.currentRunner().execute();var e=t.currentRunner().results();expect(e.totalCount).toEqual(2),expect(e.passedCount).toEqual(1),expect(e.failedCount).toEqual(1)}),it("should ignore suites that have been x'd",function(){t.xdescribe("one suite description",function(){t.it("should be a test",function(){this.runs(function(){this.expect(!0).toEqual(!0)})})}),t.describe("another suite description",function(){t.it("should be another test",function(){this.runs(function(){this.expect(!0).toEqual(!1)})})}),t.currentRunner().execute();var e=t.currentRunner().results();expect(e.totalCount).toEqual(1),expect(e.passedCount).toEqual(0),expect(e.failedCount).toEqual(1)}),it("should roll up results from all specs",function(){t.describe("one suite description",function(){t.it("should be a test",function(){this.runs(function(){this.expect(!0).toEqual(!0)})})}),t.describe("another suite description",function(){t.it("should be another test",function(){this.runs(function(){this.expect(!0).toEqual(!1)})})}),t.currentRunner().execute();var e=t.currentRunner().results();expect(e.totalCount).toEqual(2),expect(e.passedCount).toEqual(1),expect(e.failedCount).toEqual(1)}),describe("reporting",function(){var n;beforeEach(function(){n=jasmine.createSpyObj("fakeReporter",["log","reportRunnerStarting","reportRunnerResults"]),t.addReporter(n)}),it("should report runner results when the runner has completed running",function(){t.describe("one suite description",function(){t.it("should be a test",function(){this.runs(function(){this.expect(!0).toEqual(!0)})})}),t.describe("another suite description",function(){t.it("should be another test",function(){this.waits(200),this.runs(function(){this.expect(!0).toEqual(!1)})})}),t.currentRunner().execute(),expect(n.reportRunnerResults).not.toHaveBeenCalled(),e.tick(200),expect(n.reportRunnerResults).toHaveBeenCalled(),expect(n.reportRunnerResults.mostRecentCall.args[0].results()).toEqual(t.currentRunner().results())})}),it("should report when the tests start running",function(){var e=jasmine.createSpyObj("fakeReporter",["log","reportRunnerStarting"]);t.addReporter(e);var n=new jasmine.Runner(t);n.arbitraryVariable="foo",spyOn(n.queue,"start"),expect(e.reportRunnerStarting).not.toHaveBeenCalled(),n.execute(),expect(e.reportRunnerStarting).toHaveBeenCalled();var r=e.reportRunnerStarting.mostRecentCall.args[0];expect(r.arbitraryVariable).toEqual("foo"),expect(n.queue.start).toHaveBeenCalled()}),describe("when suites are nested",function(){function e(e){var t=[];for(var n=0;n<e.length;n++)t.push(e[n].getFullName());return t}var n,r,i;beforeEach(function(){n=t.describe("suite 1",function(){r=t.describe("suite 2",function(){})}),i=t.describe("suite 3",function(){})}),it("#suites should return a flat array of all suites, including nested suites",function(){var s=t.currentRunner().suites();expect(e(s)).toEqual([n.getFullName(),r.getFullName(),i.getFullName()])}),it("#topLevelSuites should return a flat array of all top-level suites only",function(){var r=t.currentRunner().topLevelSuites();expect(e(r)).toEqual([n.getFullName(),i.getFullName()])})})});