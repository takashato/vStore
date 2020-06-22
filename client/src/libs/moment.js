import moment from 'moment';

export const convertDateFormat = (data) => moment.utc(data).format('DD/MM/YYYY');
export const convertDatetimeFormat = (data) => moment.utc(data).format('HH:mm:ss DD/MM/YYYY');

const momentTz = (time) => moment(time);

export default momentTz;
