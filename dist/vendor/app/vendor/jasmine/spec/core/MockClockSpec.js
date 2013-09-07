describe("MockClock",function(){beforeEach(function(){jasmine.Clock.useMock()}),describe("setTimeout",function(){it("should mock the clock when useMock is in a beforeEach",function(){var e=!1;setTimeout(function(){e=!0},3e4),expect(e).toBe(!1),jasmine.Clock.tick(30001),expect(e).toBe(!0)})}),describe("setInterval",function(){it("should mock the clock when useMock is in a beforeEach",function(){var e=0;setInterval(function(){e++},3e4),expect(e).toEqual(0),jasmine.Clock.tick(30001),expect(e).toEqual(1),jasmine.Clock.tick(30001),expect(e).toEqual(2),jasmine.Clock.tick(1),expect(e).toEqual(2)})}),it("shouldn't complain if you call jasmine.Clock.useMock() more than once",function(){jasmine.Clock.useMock()})});