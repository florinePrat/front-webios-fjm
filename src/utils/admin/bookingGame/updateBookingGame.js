import axios from "axios";
import {getCookie} from "../../cookie/cookie";


export function updateBookingGame(gameBookingId, zone, qtExhib, qtSend, received, putOnPlan, tombola, dotation, isCallback, isCallbackDone, callbackPrice, comment, bringByExhibitor, dateAdd) {
    let burl = process.env.VUE_APP_API;
    console.log(burl);
    return axios({
        method: 'put',
        url: burl + '/api/gameBooking/update/',
        data : {
            gameBookingId, zone, qtExhib, qtSend, received, putOnPlan, tombola, dotation, isCallback, isCallbackDone, callbackPrice, comment, bringByExhibitor, dateAdd
        },
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie("token")
        }
    })
}
