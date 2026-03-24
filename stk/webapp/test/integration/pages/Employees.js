sap.ui.define([
    "sap/ui/test/Opa5", "sap/ui/test/actions/Press"
], function (Opa5, Press) {
    "use strict";
    const sViewName = "Performance";

    Opa5.createPageObjects({
        onTheEmployeesPage: {

            actions:{
         /*       iPressControl: function (sID) {
                    return this.waitFor({
                        controlType: "sap.m.Button",
                        id: sID,
                        viewName: sViewName,
                        actions: new Press(),
                        success: function () {
                            Opa5.assert.ok(true, `Successfully pressed ${sID}`);
                        },
                        errorMessage: `Could not find the control with ID ${sID}`
                    });
                }*/
},

            assertions: {
                iShouldSeeTheEmployeesList: function () {
                    return this.waitFor({
                        viewName: sViewName,
                        id: "Performance",
                        success: function () {
                            Opa5.assert.ok(true, "The " + sViewName + " view is displayed");
                        },
                        errorMessage: "Did not find the " + sViewName + " view"
                    });
                },
                iShouldSeeTheTable: function () {
                    return this.waitFor({
                        id: "Performance_Tab",
                        viewName: sViewName,
                        success: function (oTable) {
                            Opa5.assert.ok(true, "The table is displayed");
                            const iItemsCount = oTable.getItems().length;
                            Opa5.assert.notStrictEqual(iItemsCount, 0, `Table has : ${iItemsCount} items`);
                        },
                        errorMessage: "Did not find the table "
                    });
                },
                iShouldSeeTheColumn: function (sId) {
                    return this.waitFor({
                        id: sId,
                        viewName: sViewName,
                    success: function (){
                        Opa5.assert.ok(true, "The column is visible")
                    },
                    errorMessage: "Didn't find such a column"
                    });
                }   
            }
        }
    });
});