sap.ui.define([
    "sap/ui/test/Opa5", "sap/ui/test/actions/Press"
], function (Opa5, Press) {
    "use strict";
    const sViewName = "CustomerList";

    Opa5.createPageObjects({
        onTheCustomersListPage: {

            actions:{
                iPressControl: function (sID) {
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
                }
},

            assertions: {
                iShouldSeeTheCustomersList: function () {
                    return this.waitFor({
                        viewName: sViewName,
                        id: "CustomerList",
                        success: function () {
                            Opa5.assert.ok(true, "The " + sViewName + " view is displayed");
                        },
                        errorMessage: "Did not find the " + sViewName + " view"
                    });
                },
                iShouldFindTheTable: function () {
                    return this.waitFor({
                        id: "customersTableId",
                        viewName: sViewName,
                        success: function (oTable) {
                            Opa5.assert.ok(true, "The table is displayed");
                            const iItemsCount = oTable.getItems().length;
                            Opa5.assert.notStrictEqual(iItemsCount, 0, `Table has : ${iItemsCount} items`);
                        },
                        errorMessage: "Did not find the table "
                    });
                },
                iShouldFindTheSortButton: function () {
                    return this.waitFor({
                        id: "SortCountryButton",
                        viewName: sViewName,
                        success: function () {
                            Opa5.assert.ok(true, "The button is displayed");
                        },
                        errorMessage: "Did not button the table"
                    });
                },
                iShouldFindTheEmployeesButton: function () {
                    return this.waitFor({
                        id: "EmployeeMotivation",
                        viewName: sViewName,
                        success: function (){
                            Opa5.assert.ok(true, "The button is displayed")
                        },
                        errorMessage: "Did not button the table"
                    });
                },
                iShouldFindTheExportButton: function () {
                    return this.waitFor({
                        id: "exportButton",
                        viewName: sViewName,
                        matchers: new sap.ui.test.matchers.i18nText({
                            propertyName: "text",
                            key: "lblExportCustomerData"
                        }),
                        success: function (){
                            Opa5.assert.ok(true, "The button is displayed");
                        },
                        errorMessage: "Did not button the table"
                    });
                }
        
                
            }
        }
    });
});