import * as moment from "moment";

export const inputProperties = {
    maxInputLength: 15,
    minDate: moment([new Date().getFullYear() - 120, 0, 1]).toDate(),
    maxDate: new Date()
}