import {logEvent} from "firebase/analytics";
import {analytics} from "./firebase";

export const onAnalytics = (eventName: string, eventParams?: object) => {
    logEvent(analytics, eventName, eventParams);
}