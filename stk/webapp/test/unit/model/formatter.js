sap.ui.define([
    "stk/stk/model/formatter"
], function(formatter) {
    "use strict";
        QUnit.module("Name formatting cases");
        function formatNameTest(oOptions){
            //Act
            const sName = formatter.formatName(oOptions.sFirstName, oOptions.sLastName);
            //Assert
            oOptions.assert.strictEqual(sName, oOptions.expected, `The name was correctly formated ${sName}`);
        }
        QUnit.test(`Should format Andrzej Naczepa to A. Naczepa`, function (assert){
            formatNameTest.call(this, {
                assert: assert,
                sFirstName: "Andrzej",
                sLastName: "Naczepa",
                expected: "A. Naczepa"
            });
        });
        QUnit.test(`Should format Franchesco Colapinto to F. Colapinto`, function (assert){
            formatNameTest.call(this, {
                assert: assert,
                sFirstName: "Franchesco",
                sLastName: "Colapinto",
                expected: "F. Colapinto"
            });
        QUnit.test(`Should format Satoshi Nakamoto to S. Nakamoto`, function (assert){
            formatNameTest.call(this, {
                assert: assert,
                sFirstName: "Satoshi",
                sLastName: "Nakamoto",
                expected: "S. Nakamoto"
            });
        });
        QUnit.test(`Should format Antonio Lucio Vivaldi to A. L. Vivaldi`, function (assert){
            formatNameTest.call(this, {
                assert: assert,
                sFirstName: "Antonio Lucio",
                sLastName: "Vivaldi",
                expected: "A. L. Vivaldi"
            });
        });
        QUnit.test(`Should format Ruben Loftus-Check to R. Loftus-Check`, function (assert){
            formatNameTest.call(this, {
                assert: assert,
                sFirstName: "Ruben",
                sLastName: "Loftus-Check",
                expected: "R. Loftus-Check"
            });
        });
        });

});