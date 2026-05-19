
sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], function (Controller, MessageToast) {
  "use strict";

  return Controller.extend("stk.stk.controller.CreateCustomer", {

    onMotivate: function (oEvent) {
      var oEmployee = oEvent.getSource().getBindingContext().getObject();
      var sEmail = "jan.karotki@capgemini.com";
      var sSubject = "Ты работаешь мало, хреново и неправильно";
      var sBody = "Если будешь так дальше работать - тебя отколотят палкой, заберут кофе и выкинут на улицу. И это не угроза!";
      sap.m.URLHelper.triggerEmail(sEmail, sSubject, sBody);
    },

    onFire: function (oEvent) {
      const oModel = this.getView().getModel("evil");

      fetch("https://evilinsult.com/generate_insult.php?lang=en&type=json")
        .then(response => response.json())
        .then(data => {
          // кладём данные в модель
          oModel.setData(data);

          // показываем во всплывашке
          MessageToast.show(data.insult);
        })
        .catch(() => {
          MessageToast.show("Failed to generate insult");
        });
    }

  });
});
