var expect = require('chai').expect;
var Long = require('long');
var JSONLong = require('../index');

describe("Tests the Long support", function() {
    var input = '{"longMaxValue":9223372036854775807,"longMinValue":-9223372036854775807,"number":123}';

    it("tests the JSON parse and stringify functionality", function(done) {
        var parsedObject = JSONLong.parse(input);
        expect(parsedObject.number.toString()).to.equal("123");
        expect(parsedObject.longMaxValue.toString()).to.equal("9223372036854775807");
        expect(parsedObject.longMaxValue).to.be.instanceof(Long);
        expect(parsedObject.longMinValue.toString()).to.equal("-9223372036854775807");
        expect(parsedObject.longMinValue).to.be.instanceof(Long);

        var expectedObject = JSONLong.stringify(parsedObject);
        expect(expectedObject).to.equal(input);
        done();
    });

    it("tests round-trip of Long values", function(done) {
        var longObject = {value: Long.fromString("9007199254740993")};
        var longJsonString = '{"value":9007199254740993}';

        // Round-trip object -> JSON -> object
        var stringifiedLongObject = JSONLong.stringify(longObject);
        expect(stringifiedLongObject).to.be.equal(longJsonString);
        var stringifiedThenParsedLongObject = JSONLong.parse(stringifiedLongObject);
        expect(stringifiedThenParsedLongObject).to.be.deep.equal(longObject);

        // Round-trip: JSON -> object -> JSON
        var parsedLongJsonString = JSONLong.parse(longJsonString);
        expect(parsedLongJsonString).to.be.deep.equal(longObject);
        var parsedThenStringifiedLongJsonString = JSONLong.stringify(parsedLongJsonString);
        expect(parsedThenStringifiedLongJsonString).to.be.equal(longJsonString);

        done();
    });

    it("tests round-trip of JS-safe Long values", function(done) {
        var longObject = {value: Long.fromString("42")};
        var longJsonString = '{"value":42}';
        var afterRoundTrip = {value: 42};  // The numbers are JS-safe, they are deserialized as JS numbers

        // Round-trip object -> JSON -> object
        var stringifiedLongObject = JSONLong.stringify(longObject);
        expect(stringifiedLongObject).to.be.equal(longJsonString);
        var stringifiedThenParsedLongObject = JSONLong.parse(stringifiedLongObject);
        expect(stringifiedThenParsedLongObject).to.be.deep.equal(afterRoundTrip);

        // Round-trip: JSON -> object -> JSON
        var parsedLongJsonString = JSONLong.parse(longJsonString);
        expect(parsedLongJsonString).to.be.deep.equal(afterRoundTrip);
        var parsedThenStringifiedLongJsonString = JSONLong.stringify(parsedLongJsonString);
        expect(parsedThenStringifiedLongJsonString).to.be.equal(longJsonString);

        done();
    });
});