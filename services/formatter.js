const moment = require('moment');

const toDate = (dateInput) => {
    return moment(dateInput).format("DD-MM-YYYY");
};


const toTime = (timeInput) => {
    return moment(timeInput).format('HH:mm:ss');
};

module.exports = {
  toDate,
  toTime
}