const moment = require("moment");

const { dateTimeFormat } = require("../constants/dateTimeFormats");

module.exports.currentDateTime = function(format = dateTimeFormat) {
    return moment().format(format);
}