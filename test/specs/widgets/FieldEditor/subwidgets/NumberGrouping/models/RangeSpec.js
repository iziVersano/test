/*!
 * Datapine
 * Range test specification
 * Copyright(c) 2012
 */

define([
    'widgets/FieldEditor/subwidgets/NumberGrouping/models/Range'
], function (
    RangeModel
) {

    var data = {
        r1: {
            min: 1,
            max: 1000,
            valueMin: 100,
            valueMax: 900
        }
        , r2: {
            min: 1,
            max: 1,
            valueMin: 1,
            valueMax: 1
        }
    };

    // Test suite
    describe('<RangeModel.getMinMaxRanges()> test suite', function () {

        beforeEach(function() {
            this.range1 = new RangeModel(data.r1);
            this.range2 = new RangeModel(data.r2);
        });

        describe('<btw> operation test', function () {
                      
            it("expects <btw> to generate 1 range if selected values are higher than <min> and lower than <max>", function() {
                var ranges = this.range1.getMinMaxRanges();
                expect(ranges.length).toEqual(1);
                expect(ranges[0]).toEqual( [data.r1.valueMin, data.r1.valueMax] );
            });

            it("expects <btw> to generate 1 range if <min> === <max> with both values set to same number", function() {
                var ranges = this.range2.getMinMaxRanges();
                expect(ranges.length).toEqual(1);
                expect(ranges[0]).toEqual( [data.r2.min, data.r2.max] );
            });

        });

        describe('Unary operations tests', function () {

            describe("'<' operation tests", function() {

                beforeEach(function() {
                    data.r1.operation = '<';
                    data.r2.operation = '<';
                    this.range1 = new RangeModel(data.r1);
                    this.range2 = new RangeModel(data.r2);
                });
                
                it("expects '<' to generate 1 range if selected value is between <min> && <max>", function() {
                    var ranges = this.range1.getMinMaxRanges();
                    expect(ranges.length).toEqual(1);
                    expect(ranges[0]).toEqual( [data.r1.min, data.r1.valueMin-1] );
                });

                it("expects '<' to generate 0 ranges if selected value is == to <min> && <max>", function() {
                    var ranges = this.range2.getMinMaxRanges();
                    expect(ranges.length).toEqual(0);
                });

            });

            describe("'<=' operation tests", function() {

                beforeEach(function() {
                    data.r1.operation = '<=';
                    data.r2.operation = '<=';
                    this.range1 = new RangeModel(data.r1);
                    this.range2 = new RangeModel(data.r2);
                });
                
                it("expects '<=' to generate 1 range if selected value is between <min> && <max>", function() {
                    var ranges = this.range1.getMinMaxRanges();
                    expect(ranges.length).toEqual(1);
                    expect(ranges[0]).toEqual( [data.r1.min, data.r1.valueMin] );
                });

                it("expects '<=' to generate 1 ranges if selected value is == to <min> && <max>", function() {
                    var ranges = this.range2.getMinMaxRanges();
                    expect(ranges.length).toEqual(1);
                    expect(ranges[0]).toEqual( [data.r2.min, data.r2.max] );
                });

            });


            describe("'>' operation tests", function() {

                beforeEach(function() {
                    data.r1.operation = '>';
                    data.r2.operation = '>';
                    this.range1 = new RangeModel(data.r1);
                    this.range2 = new RangeModel(data.r2);
                });
                
                it("expects '>' to generate 1 range if selected value is between <min> && <max>", function() {
                    var ranges = this.range1.getMinMaxRanges();
                    expect(ranges.length).toEqual(1);
                    expect(ranges[0]).toEqual( [data.r1.valueMin+1, data.r1.max] );
                });

                it("expects '>' to generate 0 ranges if selected value is == to <min> && <max>", function() {
                    var ranges = this.range2.getMinMaxRanges();
                    expect(ranges.length).toEqual(0);
                });

            });

            describe("'>=' operation tests", function() {

                beforeEach(function() {
                    data.r1.operation = '>=';
                    data.r2.operation = '>=';
                    this.range1 = new RangeModel(data.r1);
                    this.range2 = new RangeModel(data.r2);
                });
                
                it("expects '>=' to generate 1 range if selected value is between <min> && <max>", function() {
                    var ranges = this.range1.getMinMaxRanges();
                    expect(ranges.length).toEqual(1);
                    expect(ranges[0]).toEqual( [data.r1.valueMin, data.r1.max] );
                });

                it("expects '>=' to generate 0 ranges if selected value is == to <min> && <max>", function() {
                    var ranges = this.range2.getMinMaxRanges();
                    expect(ranges.length).toEqual(1);
                    expect(ranges[0]).toEqual( [data.r2.min, data.r2.min] );
                });

            });

            describe("'!=' operation tests", function() {

                beforeEach(function() {
                    data.r1.operation = '!=';
                    data.r2.operation = '!=';
                    this.range1 = new RangeModel(data.r1);
                    this.range2 = new RangeModel(data.r2);
                });
                
                it("expects '!=' to generate 2 ranges if selected value is between <min> && <max>", function() {
                    var ranges = this.range1.getMinMaxRanges();
                    expect(ranges.length).toEqual(2);
                    expect(ranges[0]).toEqual( [data.r1.min, data.r1.valueMin-1] );
                    expect(ranges[1]).toEqual( [data.r1.valueMin+1, data.r1.max] );
                });

                it("expects '!=' to generate 0 ranges if selected value is == to <min> && <max>", function() {
                    var ranges = this.range2.getMinMaxRanges();
                    expect(ranges.length).toEqual(0);
                });

                it("expects '!=' to generate 1 range if selected value is == to <min> value of the range", function() {
                    this.range1.set('valueMin', data.r1.min);
                    var ranges = this.range1.getMinMaxRanges();
                    expect(ranges.length).toEqual(1);
                    expect(ranges[0]).toEqual( [data.r1.min+1, data.r1.max] );
                });

                it("expects '!=' to generate 1 range if selected value is == to <max> value of the range", function() {
                    this.range1.set('valueMin', data.r1.max);
                    var ranges = this.range1.getMinMaxRanges();
                    expect(ranges.length).toEqual(1);
                    expect(ranges[0]).toEqual( [data.r1.min, data.r1.max-1] );
                });

            });

        });
        
    });

});