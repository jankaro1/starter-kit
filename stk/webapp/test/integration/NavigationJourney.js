/* global QUnit */

sap.ui.define([
    "sap/ui/test/opaQunit",
    "./pages/CustomersList",
    "./pages/Employees"
], function (opaTest) {
    "use strict";

    QUnit.module("Employees Journey");

    opaTest("Should see the initial page of the app, then go to Employees page and check it with elements", 
        function (Given, When, Then) {

        // --- Arrangements ---
        Given.iStartMyApp();

        // --- Assertions on Customers List page ---
        Then.onTheCustomersListPage.iShouldSeeTheCustomersList();
        Then.onTheCustomersListPage.iShouldFindTheEmployeesButton();

        // --- Actions on Customers List page ---
        When.onTheCustomersListPage.iPressControl("EmployeeMotivation");

        // --- Assertions on Employees page ---
        Then.onTheEmployeesPage.iShouldSeeTheEmployeesList();
        Then.onTheEmployeesPage.iShouldSeeTheTable("Performance_Tab");
        Then.onTheEmployeesPage.iShouldSeeTheColumn("nameID");
        Then.onTheEmployeesPage.iShouldSeeTheColumn("ordersID");
        Then.onTheEmployeesPage.iShouldSeeTheColumn("actionsID");

        // --- Cleanup ---
        Then.iTeardownMyApp();
    });
});
