/*!
 * Datapine
 * Mediator test specification
 * Copyright(c) 2012
 */

define([
    'lib/utils',
    'lib/constants'
], function (
    utils,
    constants
) {

    // Test suite
    describe('utils', function () {

        describe('_isTypeIn suite', function () {
          // TODO: add tests here ...
        });

        describe('isNumber suite', function () {
          
            it('expects all <constants.numberTypes> to be numbers!', function(){
               for(var i = 0, total = constants.numberTypes.length, type; i < total; i++) {
                   type = constants.numberTypes[i];
                   expect(utils.isNumber(type)).toEqual(true);
               }
            });

            it('expects <constants.dateTypes> not to be of number type!', function(){
               for(var i = 0, total = constants.dateTypes.length, type; i < total; i++) {
                   type = constants.dateTypes[i];
                   expect(utils.isNumber(type)).toNotEqual(true);
               }
            });

            it('expects <constants.textTypes> not to be of number type!', function(){
               for(var i = 0, total = constants.textTypes.length, type; i < total; i++) {
                   type = constants.textTypes[i];
                   expect(utils.isNumber(type)).toNotEqual(true);
               }
            });

            it("expects <DOUBLE PERCISION> to be of number type", function() {
                expect(utils.isNumber('DOUBLE PERCISION')).toEqual(true);
            });

            it("expects <FLOAT UNSIGNED> to be of number type", function() {
                expect(utils.isNumber('FLOAT UNSIGNED')).toEqual(true);
            });

        });

        describe('isText suite', function () {
          
            it('expects all <constants.textTypes> to be of text type!', function(){
               for(var i = 0, total = constants.textTypes.length, type; i < total; i++) {
                   type = constants.textTypes[i];
                   expect(utils.isText(type)).toEqual(true);
               }
            });

            it('expects <constants.dateTypes> not to be of text type!', function(){
               for(var i = 0, total = constants.dateTypes.length, type; i < total; i++) {
                   type = constants.dateTypes[i];
                   expect(utils.isText(type)).toNotEqual(true);
               }
            });

            it('expects <constants.numberTypes> not to be of text type!', function(){
               for(var i = 0, total = constants.numberTypes.length, type; i < total; i++) {
                   type = constants.numberTypes[i];
                   expect(utils.isText(type)).toNotEqual(true);
               }
            });

            it("expects <MEDIUMTEXT CHARACTER_SET> to be of text type", function() {
                expect(utils.isText('MEDIUMTEXT CHARACTER_SET')).toEqual(true);
            });

        });

        describe('isTime suite', function () {
          
            it('expects all <constants.dateTypes> to be of time type!', function(){
               for(var i = 0, total = constants.dateTypes.length, type; i < total; i++) {
                   type = constants.dateTypes[i];
                   expect(utils.isTime(type)).toEqual(true);
               }
            });
            
            it('expects <constants.textTypes> not to be of time type!', function(){
               for(var i = 0, total = constants.textTypes.length, type; i < total; i++) {
                   type = constants.textTypes[i];
                   expect(utils.isTime(type)).toNotEqual(true);
               }
            });

            it('expects <constants.numberTypes> not to be of time type!', function(){
               for(var i = 0, total = constants.numberTypes.length, type; i < total; i++) {
                   type = constants.numberTypes[i];
                   expect(utils.isTime(type)).toNotEqual(true);
               }
            });

        });
        
    });

});