import moment from "moment";
import { ObjectPropertyFormat } from "../Components/Enums/ObjectPropertyFirmat";


export class DateTimeFormater {
    //TODO Localize it!
    public static getFormatedDate(format: ObjectPropertyFormat, fullDate: Date | undefined) {
        moment.locale('ru-RU');
        if (!fullDate) {
            return {
                date: undefined,
                time: undefined
            }
        }

        let time: string;
        let date: string;

        switch (format) {
            case ObjectPropertyFormat.ShortTime:
            case ObjectPropertyFormat.LongDateShortTime:
            case ObjectPropertyFormat.ShortDateShortTime:
            case ObjectPropertyFormat.CondensedDateTime:
                time = moment(fullDate).format("HH:mm")
                break;
            case ObjectPropertyFormat.LongTime:
            case ObjectPropertyFormat.LongDateLongTime:
            case ObjectPropertyFormat.ShortDateLongTime:
            case ObjectPropertyFormat.DateISO:
            case ObjectPropertyFormat.DateTimeISO:
                time = moment(fullDate).format("HH:mm:ss");
                break;
            default:
                time = moment(fullDate).format("HH:mm")
                break;

        }

        switch (format) {
            case ObjectPropertyFormat.ShortDate:
            case ObjectPropertyFormat.ShortDateShortTime:
            case ObjectPropertyFormat.ShortDateLongTime:
                date = moment(fullDate).format("L")
                break;
            case ObjectPropertyFormat.LongDate:
            case ObjectPropertyFormat.LongDateShortTime:
            case ObjectPropertyFormat.LongDateLongTime:
                date = moment(fullDate).format("LL")
                break;
            case ObjectPropertyFormat.CondensedDate:
            case ObjectPropertyFormat.CondensedDateTime:
                date = moment(fullDate).format("D MMM yyyy [г.]")
                break;
            case ObjectPropertyFormat.MonthDay:
                date = moment(fullDate).format("D MMMM")
                break;
            case ObjectPropertyFormat.YearMonth:
                date = moment(fullDate).format("MMMM yyyy")
                break;
            case ObjectPropertyFormat.DateISO:
            case ObjectPropertyFormat.DateTimeISO:
                date = moment(fullDate).format("yyyy-MM-DD")
                break;
            default:
                date = moment(fullDate).format("L")
                break;
        }
        return { date: date, time: time }
    }

}