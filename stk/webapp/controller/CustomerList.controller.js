sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Sorter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/export/library",
    "sap/ui/export/Spreadsheet"
],

function (Controller, Sorter, Filter, FilterOperator, exportLibrary, Spreadsheet) {
  "use strict";

return Controller.extend("stk.stk.controller.CustomerList", {
      /*onInit: function() {
      },*/
      onInit: function() {
            const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("Default").attachPatternMatched(this._onPatternMatched, this); // route - sprawdzić, dlaczego u mnie RouteMaster, a w kicie było "Customer"
        },
        onCustomerPress: function(oEvent){
          //debugger
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
          oRouter.navTo("CustomerDetails", {
            CustomerID: oEvent.getSource().getBindingContext().getObject().CustomerID
          });
        },
        _onPatternMatched: async function () {
          const oModel = this.getOwnerComponent().getModel();
          const oCustomersModel = this.getOwnerComponent().getModel("CustomersProperties");

          
const oTable = this.byId("customersTableId");
  if (!oTable) {
    console.warn("Table not ready yet");
    return;
  }

  
          const iTableRows = this.getNoCustomers();
          oCustomersModel.setProperty("/noCustomers", iTableRows);
        },
        getNoCustomers: function() {
          return this.byId("customersTableId").getItems().length;
        },
        onSortByCountry: function() {
        const oTable = this.byId("customersTableId");
        let aSorter = [];
        const oBinding = oTable.getBinding("items");
        const bOppositeValue = oBinding.aSorters[0] ? !oBinding.aSorters[0].bDescending : true;
        const oSorter = new Sorter(`Country`, bOppositeValue);

       
        aSorter.push(oSorter);
        oBinding.sort(aSorter);
      },
      setCompanyFilter: function(oEvent){
        let aFilters = [];
        const oTable = this.getView().byId("customersTableId");
        const oBinding = oTable.getBinding("items");
        const sCompanyName = oEvent.getSource().getValue();
        const oFilter = new Filter("CompanyName", FilterOperator.Contains, sCompanyName);
        aFilters.push(oFilter);
        oBinding.filter(aFilters);
        const iTableRows = this.getNoCustomers();
        oCustomersModel.setProperty("/noCustomers", iTableRows);
      },
      onPressGenerateExcelReport: function(){
        sap.m.MessageToast.show("BUTTON WORKS")
        const oModel = this.getOwnerComponent().getModel();
       // const oServiceUrl = this.getView().getModel().getServiceUrl(); - dlaczego to nie zadziałało? 
       const oServiceUrl = this.getOwnerComponent().getModel().sServiceUrl;
        const oEntity = oModel
        .getServiceMetadata()
        .dataServices.schema[0].entityType
        .find((oEntity) => oEntity.name === "Customer").property;
        const aCols = oEntity.map((oProp) => ({
          label: oProp.name,
          type: oProp.type,
          property: oProp.name
        }));
        const oSettings = {
          workbook: { columns: aCols },
          dataSource: {
            type: "OData",
            dataUrl: `${oServiceUrl}/Customers`,
            serviceUrl: oServiceUrl,
            headers: {
              Accept: "application/json",
              "Accept-Language": "en",
              "sap-cancel-on-close": "true",
              DataServiceVersion: "2.0",
              Connection: "keep-alive"
            }
          },
          fileName: "Customers.xlsx",
          worker: true,
          sizeLimit: 500
        };
        const oSheet = new Spreadsheet(oSettings);
        oSheet.build().finally(function(){
          oSheet.destroy();
        })
      },
      createNew: function(oEvent){
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("CreateCustomer");
      },
      showEmployees: function(oEvent){
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("Performance")
        }
  });
});