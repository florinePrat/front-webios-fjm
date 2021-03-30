import axios from "axios";
import {getCookie} from "../../cookie/cookie";


export function addBookingGame(
    name, ageMin, duration, category, notice, prototype, nbPlayersMin, nbPlayersMax, description, exhibitorId, festivalId, bookingId, zoneId, qtExhib,
    qtSend, tombola, dotation, comment, putOnPlan, bringByExhibitor, gameIdSelected) {
    let burl = process.env.VUE_APP_API;
    console.log(burl);
    return axios({
        method: 'post',
        url: burl + '/api/gameBooking/add/',
        data : {
            name, ageMin, duration, category, notice, prototype, nbPlayersMin, nbPlayersMax, description, exhibitorId, festivalId, bookingId, zoneId, qtExhib,
            qtSend, tombola, dotation, comment, putOnPlan, bringByExhibitor, gameIdSelected
        },
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie("token")
        }
    })
}
