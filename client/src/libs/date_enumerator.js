import moment from "moment";

var enumerateDaysBetweenDates = function(startDate, endDate) {
    var dates = [];

    var currDate = moment(startDate).startOf('day');
    var lastDate = moment(endDate).startOf('day');

    while(currDate.add(1, 'days').diff(lastDate) < 0) {
        if (dates.length > 1000) break;
        dates.push(currDate.clone());
    }

    return dates;
};

export default enumerateDaysBetweenDates;