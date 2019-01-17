var expect = require('chai').expect;
var Long = require('long');
var JSONLong = require('../index');
var JSONLongUnsigned = require('../index')({unsigned: true});
var JSONLongSigned = require('../index')({unsigned: false});

describe("Tests the Long support with unsigned long values", function(){

    it("tests the JSON parse and stringify functionality with unsigned long values", function(done){
        var jsonString = '{"longValue":18446744073709551614}';
        var overflowedJsonString = '{"longValue":-2}';

        var unsignedParsedObject = JSONLongUnsigned.parse(jsonString);
        expect(unsignedParsedObject.longValue.toString()).to.be.equal("18446744073709551614");
        expect(unsignedParsedObject.longValue).to.be.instanceof(Long);

        var signedParsedObject = JSONLongSigned.parse(jsonString);
        expect(signedParsedObject.longValue.toString()).to.be.equal("-2");
        expect(signedParsedObject.longValue).to.be.instanceof(Long);

        var defaultParsedObject = JSONLong.parse(jsonString);
        expect(defaultParsedObject.longValue.toString()).to.be.equal("-2");
        expect(defaultParsedObject.longValue).to.be.instanceof(Long);

        var unsignedExpectedObject = JSONLongUnsigned.stringify(unsignedParsedObject);
        expect(unsignedExpectedObject).to.equal(jsonString);

        var signedExpectedObject = JSONLongSigned.stringify(signedParsedObject);
        expect(signedExpectedObject).to.equal(overflowedJsonString);

        var defaultExpectedObject = JSONLong.stringify(defaultParsedObject);
        expect(defaultExpectedObject).to.equal(overflowedJsonString);

        done();
    });
});
