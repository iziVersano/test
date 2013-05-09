/*!
 * Datapine
 * Mediator test specification
 * Copyright(c) 2012
 */

define([
    'lib/mediator'
], function (
    mediator
) {

    // Test suite
    describe('Mediator', function () {
        // Fake instances for testing
        var fakeInstance1 = { name: 'fakeInstance1', demo: true };
        var fakeInstance2 = { name: 'fakeInstance2', demo: true };
        var fakeInstance3 = { name: 'fakeInstance3', demo: true };
        // Fake channels for testing
        var fakeChannel1 = 'fakeChannel1';
        var fakeChannel2 = 'fakeChannel2';
        var fakeChannel3 = 'fakeChannel3';
        // Test specs
        it('loads correctly', function () {
            expect(mediator).not.toBeNull();
        });
        it('adds "fakeInstance1" and stores an instance internally when one is added', function () {
            mediator.removeAll();
            mediator.add(fakeInstance1);
            expect(_.size(mediator.getInstances())).toBe(1);
        });
        it('adds "fakeInstance2" and that is stored internally too', function () {
            mediator.removeAll();
            mediator.add(fakeInstance1);
            mediator.add(fakeInstance2);
            expect(_.size(mediator.getInstances())).toBe(2);
        });
        it('removes "fakeInstance1" and is reflected in the internal instances size', function () {
            mediator.removeAll();
            mediator.add(fakeInstance1);
            mediator.add(fakeInstance2);
            mediator.remove(fakeInstance1);
            expect(_.size(mediator.getInstances())).toBe(1);
        });
        it('removes all instances completely', function () {
            mediator.removeAll();
            mediator.add(fakeInstance1);
            mediator.add(fakeInstance2);
            mediator.add(fakeInstance3);
            mediator.removeAll();
            expect(_.size(mediator.getInstances())).toBe(0);
        });
        it('adds "fakeInstance3" and starts it correctly', function () {
            mediator.removeAll();
            mediator.add(fakeInstance3);
            var instances = mediator.getInstances();
            expect(instances[0].instance === fakeInstance3 && instances[0].active).toBe(true);
        });
        it('stops "fakeInstance3" correctly', function () {
            mediator.removeAll();
            mediator.add(fakeInstance3);
            mediator.deactivate(fakeInstance3);
            var instances = mediator.getInstances();
            expect(instances[0].instance === fakeInstance3 && instances[0].active === false).toBe(true);
        });
        it('adds "fakeInstance1" subscribes it to channel "fakeChannel1"', function () {
            mediator.removeAll();
            mediator.add(fakeInstance1);
            mediator.subscribe(fakeInstance1, fakeChannel1, function () {});
            var channels = mediator.getChannels();
            expect(channels[0].instance === fakeInstance1 && channels[0].channel === fakeChannel1).toBe(true);
        });
        it('adds "fakeInstance1" and subscribes it to channel "fakeChannel1" and broadcasts "fakeChannel1"', function () {
            mediator.removeAll();
            mediator.add(fakeInstance1);
            mediator.subscribe(fakeInstance1, fakeChannel1, function (testMessage1, testMessage2) {
                expect(testMessage1).toBe('testMessage1');
                expect(testMessage2).toBe('testMessage2');
            });
            mediator.broadcast('fakeChannel1', 'testMessage1', 'testMessage2');
        });
        it('adds "fakeInstance1" and "fakeInstance2" and subscribes them both to channel "fakeChannel1" and broadcasts "fakeChannel1"', function () {
            mediator.removeAll();
            mediator.add(fakeInstance1);
            mediator.add(fakeInstance2);
            mediator.subscribe(fakeInstance1, fakeChannel1, function (testMessage1, testMessage2) {
                expect(testMessage1).toBe('testMessage1');
                expect(testMessage2).toBe('testMessage2');
            });
            mediator.subscribe(fakeInstance2, fakeChannel1, function (testMessage1, testMessage2) {
                expect(testMessage1).toBe('testMessage1');
                expect(testMessage2).toBe('testMessage2');
            });
            mediator.broadcast('fakeChannel1', 'testMessage1', 'testMessage2');
        });
        it('adds "fakeInstance1" and "fakeInstance2" and subscribes them to channel "fakeChannel1", then stops "fakeInstance1" and broadcasts "fakeChannel1"', function () {
            var fakeInstance1Flag = false;
            mediator.removeAll();
            mediator.add(fakeInstance1);
            mediator.add(fakeInstance2);
            mediator.subscribe(fakeInstance1, fakeChannel1, function () {
                fakeInstance1Flag = true; // This shouldn't run, if it does there is a problem
            });
            mediator.subscribe(fakeInstance2, fakeChannel1, function () {
                expect(fakeInstance1Flag).toBe(false);
            });
            mediator.deactivate(fakeInstance1);
            mediator.broadcast('fakeChannel1');
        });
        it('adds "fakeInstance1" and "fakeInstance2", subscribes them to "fakeChannel1" and "fakeChannel2", then removes them all', function () {
            mediator.removeAll();
            mediator.add(fakeInstance1);
            mediator.add(fakeInstance2);
            mediator.subscribe(fakeInstance1, fakeChannel1, function () {});
            mediator.subscribe(fakeInstance1, fakeChannel2, function () {});
            mediator.subscribe(fakeInstance2, fakeChannel1, function () {});
            mediator.subscribe(fakeInstance2, fakeChannel2, function () {});
            mediator.removeAll();
            var instances = mediator.getInstances();
            var channels = mediator.getChannels();
            expect(_.size(instances)).toBe(0);
            expect(_.size(channels)).toBe(0);
        });
        it('adds two Backbone views, both with class name "fakeClass1", and another with different class "fakeClass2" and then removes just "fakeClass1"', function () {
            mediator.removeAll();
            var View1 = Backbone.View.extend({
                className: 'fakeClass1'
            });
            var View2 = Backbone.View.extend({
                className: 'fakeClass1'
            });
            var View3= Backbone.View.extend({
                className: 'fakeClass2'
            });
            mediator.add(new View1());
            mediator.add(new View2());
            mediator.add(new View3());
            expect(_.size(mediator.getInstances())).toBe(3);
            mediator.remove('.fakeClass1');
            expect(_.size(mediator.getInstances())).toBe(1);
        });
        it('adds two Backbone views, one with id "fakeId1" and the other with "fakeId2", and then remove "#fakeId1"', function () {
            mediator.removeAll();
            var View1 = Backbone.View.extend({
                id: 'fakeId1'
            });
            var View2 = Backbone.View.extend({
                id: 'fakeId2'
            });
            mediator.add(new View1());
            mediator.add(new View2());
            expect(_.size(mediator.getInstances())).toBe(2);
            mediator.remove('#fakeId1');
            expect(_.size(mediator.getInstances())).toBe(1);
        });
        it('adds three Backbone views, ids "fakeId1" and "fakeId2" and class "fakeClass1", and then remove ".fakeClass1"', function () {
            mediator.removeAll();
            var View1 = Backbone.View.extend({
                id: 'fakeId1'
            });
            var View2 = Backbone.View.extend({
                id: 'fakeId2'
            });
            var View3 = Backbone.View.extend({
                className: 'fakeClass1'
            });
            mediator.add(new View1());
            mediator.add(new View2());
            mediator.add(new View3());
            expect(_.size(mediator.getInstances())).toBe(3);
            mediator.remove('.fakeClass1');
            expect(_.size(mediator.getInstances())).toBe(2);
        });
        it('adds four Backbone views, ids "fakeId1" and "fakeId2" and class "fakeClass1" and other with name "fakeName1", and then remove "fakeName1"', function () {
            mediator.removeAll();
            var View1 = Backbone.View.extend({
                id: 'fakeId1'
            });
            var View2 = Backbone.View.extend({
                id: 'fakeId2'
            });
            var View3 = Backbone.View.extend({
                className: 'fakeClass1'
            });
            var View4 = Backbone.View.extend({
                name: 'fakeName1'
            });
            mediator.add(new View1());
            mediator.add(new View2());
            mediator.add(new View3());
            mediator.add(new View4());
            expect(_.size(mediator.getInstances())).toBe(4);
            mediator.remove('fakeName1');
            expect(_.size(mediator.getInstances())).toBe(3);
        });
        it('adds four Backbone views, with three having class "fakeClass1" one having "fakeClass2", and then remove "fakeClass1"', function () {
            mediator.removeAll();
            var View1 = Backbone.View.extend({
                className: 'fakeClass1'
            });
            var View2 = Backbone.View.extend({
                className: 'fakeClass1'
            });
            var View3 = Backbone.View.extend({
                className: 'fakeClass1'
            });
            var View4 = Backbone.View.extend({
                className: 'fakeClass2'
            });
            mediator.add(new View1());
            mediator.add(new View2());
            mediator.add(new View3());
            mediator.add(new View4());
            expect(_.size(mediator.getInstances())).toBe(4);
            mediator.remove('.fakeClass1');
            expect(_.size(mediator.getInstances())).toBe(1);
        });
        it('adds two Backbone views with class name "fakeClass1" and subscribes them both to channel "fakeChannel1" and broadcasts "fakeChannel1" and removes them by their class name', function () {
            mediator.removeAll();
            var View1 = Backbone.View.extend({
                className: 'fakeClass1'
            });
            var View2 = Backbone.View.extend({
                className: 'fakeClass1'
            });
            var view1 = new View1();
            var view2 = new View2();
            mediator.add(view1);
            mediator.add(view2);
            expect(_.size(mediator.getInstances())).toBe(2);
            mediator.subscribe(view1, fakeChannel1, function (testMessage1, testMessage2) {
                expect(testMessage1).toBe('testMessage1');
                expect(testMessage2).toBe('testMessage2');
            });
            mediator.subscribe(view2, fakeChannel1, function (testMessage1, testMessage2) {
                expect(testMessage1).toBe('testMessage1');
                expect(testMessage2).toBe('testMessage2');
            });
            mediator.broadcast('fakeChannel1', 'testMessage1', 'testMessage2');
            mediator.remove('.fakeClass1');
            expect(_.size(mediator.getInstances())).toBe(0);
        });
        it('adds three Backbone views, one with id "fakeId1" and two with class "fakeClass1" and then try to get "fakeClass1"', function () {
            mediator.removeAll();
            var View1 = Backbone.View.extend({
                id: 'fakeId1'
            });
            var View2 = Backbone.View.extend({
                className: 'fakeClass1'
            });
            var View3 = Backbone.View.extend({
                className: 'fakeClass1'
            });
            mediator.add(new View1());
            mediator.add(new View2());
            mediator.add(new View3());
            expect(_.size(mediator.get('.fakeClass1'))).toBe(2);
        });
    });

});