var expect = require('chai').expect;
var Long = require('long');
var JSONLong = require('../index');
var JSONUnsignedLong = require('../index')({unsigned: true});

describe("Tests the Long support with unsigned long values", function() {
    it("tests the round-trip of unsigned Long values", function(done) {
        var unsignedLongObject = {value: Long.fromString("18446744073709551614", true)};
        var unsignedLongJsonString = '{"value":{"__longValue":18446744073709551614,"__unsigned":true}}';

        // Round-trip: object -> JSON -> object
        var stringifiedUnsignedLongObject = JSONUnsignedLong.stringify(unsignedLongObject);
        expect(stringifiedUnsignedLongObject).to.be.equal(unsignedLongJsonString);
        var stringifiedThenParsedUnsignedLongObject = JSONUnsignedLong.parse(stringifiedUnsignedLongObject);
        expect(stringifiedThenParsedUnsignedLongObject).to.be.deep.equal(unsignedLongObject);

        // Round-trip: JSON -> object -> JSON
        var parsedUnsignedLongJsonString = JSONUnsignedLong.parse(unsignedLongJsonString);
        expect(parsedUnsignedLongJsonString).to.be.deep.equal(unsignedLongObject);
        var parsedThenStringifiedUnsignedLongJsonString = JSONUnsignedLong.stringify(parsedUnsignedLongJsonString);
        expect(parsedThenStringifiedUnsignedLongJsonString).to.be.equal(unsignedLongJsonString);

        done();
    });
});
