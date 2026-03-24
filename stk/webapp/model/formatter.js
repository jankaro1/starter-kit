sap.ui.define([], function (){
    "use-strict";
    return {
        formatName: function (sFirstName, sLastName) {
            if (sFirstName.includes(" ")){
                const names = sFirstName.split(" ");
                let short = "";
                
                names.forEach(function (element) {
                    short += element[0] + ". ";
                });

            return short + sLastName;
            }
            else{
            return sFirstName[0] + ". " + sLastName;
            }
        }
    };
});