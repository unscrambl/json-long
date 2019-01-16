var mocha  = require('mocha');
var assert = require('chai').assert;
var expect = require('chai').expect;
var Long = require('long');
var JSONLong = require('../index');

describe("Tests the Long support", function(){
    var input = '{"longMaxValue":9223372036854775807,"longMinValue":-9223372036854775807,"number":123}';

    it("tests the JSON parse and stringify functionality", function(done){
        var parsedObject = JSONLong.parse(input, {unsigned: true});
        expect(parsedObject.number.toString()).to.equal("123");
        expect(parsedObject.longMaxValue.toString()).to.equal("9223372036854775807");
        expect(parsedObject.longMaxValue).to.be.instanceof(Long);
        expect(parsedObject.longMinValue.toString()).to.equal("-9223372036854775807");
        expect(parsedObject.longMinValue).to.be.instanceof(Long);

        var expectedObject = JSONLong.stringify(parsedObject);
        expect(expectedObject).to.equal(input);
        done();
    });
});