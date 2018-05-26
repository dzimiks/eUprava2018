var register = function (Handlebars) {
    var helpers = {
        // put all of your helpers inside this object
        formatDate: function (date) {

            var month = String(date.getMonth() + 1);
            var day = String(date.getDate());
            const year = String(date.getFullYear());

            if (month.length < 2) {
                month = '0' + month;
            }
            if (day.length < 2) {
                day = '0' + day;
            }

            return day + '.' + month + '.' + year;
        }
    };

    if (Handlebars && typeof Handlebars.registerHelper === "function") {
        // register helpers
        for (var prop in helpers) {
            Handlebars.registerHelper(prop, helpers[prop]);
        }
    } else {
        // just return helpers object if we can't register helpers here
        return helpers;
    }

};

module.exports.register = register;
module.exports.helpers = register(null);