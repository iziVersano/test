/*!
 * Datapine
 * Range test specification
 * Copyright(c) 2012
 */

define([
    'widgets/FieldEditor/subwidgets/NumberGrouping/models/Range',
    'widgets/FieldEditor/subwidgets/NumberGrouping/models/Group',
    'widgets/FieldEditor/subwidgets/NumberGrouping/collections/Groups'
], function (
    RangeModel,
    GroupModel,
    GroupsCollection
) {

    var r1 = {
            min: 1,
            max: 1000,
            valueMin: 100,
            valueMax: 900
        }
        , r2 = {
            min: 1,
            max: 1,
            valueMin: 1,
            valueMax: 1
        }, r3 = {
            min: 1,
            max: 1000,
            operation: '>',
            valueMin: 200,
            valueMax: 0
        }, r4 = {
            min: 1,
            max: 1000,
            operation: '<=',
            valueMin: 99,
            valueMax: 0
        }, r5 = {
            min: 1,
            max: 1000,
            operation: '<=',
            valueMin: 100,
            valueMax: 0
        };

    // Test suite
    describe('<widgets/FieldEditor/subwidgets/NumberGrouping/collections/Groups.areGroupsOverlapping()> test suite', function () {

        beforeEach(function() {
            this.g1 = new GroupModel();
            this.g1.range = new RangeModel(r1);

            this.g2 = new GroupModel();
            this.g2.range = new RangeModel(r2);

            this.c1 = new GroupsCollection();
            this.c1.add(this.g1);
            this.c1.add(this.g2);

            this.g3 = new GroupModel();
            this.g3.range = new RangeModel(r3);
            
            this.g4 = new GroupModel();
            this.g4.range = new RangeModel(r4);

            this.g5 = new GroupModel();
            this.g5.range = new RangeModel(r5);
        });

        it('expects that ranges are NOT overlapping!', function(){
            expect(this.c1.areGroupsOverlapping()).toEqual(false);
        });

        it('expects that ranges are overlapping!', function(){
            this.c1.add(this.g3);
            expect(this.c1.areGroupsOverlapping()).toEqual(true);
        });

        it('expects that ranges are overlapping!', function(){
            this.c1.add(this.g4);
            expect(this.c1.areGroupsOverlapping()).toEqual(true);
        });

        it('expects that ranges are overlapping if range [1, 1] is out of collection & operation is "<="!', function(){
            this.c1.remove(this.g2);
            this.c1.add(this.g5);
            expect(this.c1.length).toEqual(2);
            expect(this.c1.areGroupsOverlapping()).toEqual(true);

            this.c1.remove(this.g5);
            expect(this.c1.length).toEqual(1);
            this.g5.range.set('valueMin', r5.valueMin-1);
            this.c1.add(this.g5);
            expect(this.c1.length).toEqual(2);
            expect(this.c1.areGroupsOverlapping()).toEqual(false);
        });

    });

});