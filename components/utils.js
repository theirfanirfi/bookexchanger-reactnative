import moment from 'moment'
import { getBaseUrl } from '../apis/index'


export const getImage = (type, image) => {
    if (image != null) {
        if (image.includes('http://') || image.includes('https://')) {
            return image
        }
        else {
            return getBaseUrl() + `/static/${type}/` + image
        }
    } else {
        return null;
    }
}

export const getMoment = date => {
    var now = moment(new Date());
    var then = moment(date, "YYYY-MM-DD HH:mm:ss");
    var timeDifferenceInSeconds = now.diff(then, 'seconds');
    var timeDifferenceInHours = now.diff(then, 'hours');
    var timeDifferenceInMinutes = now.diff(then, 'minutes');
    var timeDifferenceInDay = now.diff(then, 'days');
    if (timeDifferenceInDay > 0) {

        return timeDifferenceInHours + ' days ago on ' + date
    }
    else if (timeDifferenceInHours > 0) {
        let mH = timeDifferenceInHours > 1 ? 's' : ''
        return timeDifferenceInHours + ' hour' + mH + ' ago'
    }
    else if (timeDifferenceInMinutes > 0) {
        let mM = timeDifferenceInMinutes > 1 ? 's' : ''
        return timeDifferenceInMinutes + ' minute' + mM + ' ago'
    }
    else {
        return timeDifferenceInSeconds + ' seconds ago'
    }
}

export const timeSince = (date) => {

    var seconds = Math.floor((new Date() - new Date(date)) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
};