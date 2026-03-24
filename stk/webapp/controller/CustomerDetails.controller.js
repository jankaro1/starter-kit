//const { Fragment } = require("react/jsx-runtime");

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "stk/stk/model/formatter"

], function (Controller, JSONModel, Fragment, Formatter) {
    "use strict";

    return Controller.extend("stk.stk.controller.CustomerDetails", {

      formatter: Formatter,

        onInit: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("CustomerDetails").attachPatternMatched(this._onPatternMatched, this);
        },

        _onPatternMatched: function (oEvent) {
            const sCustomerID = oEvent.getParameter("arguments").CustomerID;
            const oView = this.getView();
            const oModel = oView.getModel();
            
            oView.bindElement({
                path: `/Customers('${sCustomerID}')`
            });
        },
        showContactInfo: function(oEvent){
          
          var oView = this.getView();
          sap.m.MessageToast.show("BUTTON WORKS")
          if(!this.byId("contactDialog")){
            Fragment.load({
              controller: this,
              id: oView.getId(),
              name: "stk.stk.view.ContactInfoDialog"
            }).then(function (oDialog) {
              oView.addDependent(oDialog);
              oDialog.open();
            });
          } else {
            this.byId("contactDialog").open();
          }
        },
        onClose: function(){
          this.byId("contactDialog").close();
        }

    });
});

/*sap.ui.define([
    "sap/ui/core/mvc/Controller",
],

    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller 
     */
/*function (Controller) {
  "use strict";

return Controller.extend("stk.stk.controller.CustomerDetails", {
      onInit: function() {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.getRoute("CustomerDetails").attachPatternMatched(this._onPatternMatched, this);
      },
      _onPatternMatched: function (oEvent) {
        this.getView().bindElement({
          path: "/Customers('" + oEvent.getParameter("arguments").CustomerID + "')",
          parameters: {expand: "Orders, Orders/Order_Details"}
        });
      }
  });
});*/