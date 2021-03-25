import axios from "axios";
import {getCookie} from "../../cookie/cookie";


export function updateBooking(bookingId, nbTableSpace1,nbTableSpace2,nbTableSpace3,nbM2Space1,nbM2Space2,nbM2Space3,animatorNeeded,crSended,invoiceSended,paymentOk,putOnPlan) {
    let burl = process.env.VUE_APP_API;
    console.log(burl);
    return axios({
        method: 'put',
        url: burl + '/api/booking/update/',
        data : {
            bookingId, nbTableSpace1,nbTableSpace2,nbTableSpace3,nbM2Space1,nbM2Space2,nbM2Space3,animatorNeeded,crSended,invoiceSended,paymentOk,putOnPlan
        },
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie("token")
        }
    })
}
