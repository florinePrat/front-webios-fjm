import axios from "axios";
import {getCookie} from "../../cookie/cookie";


export function addBooking(nbTableSpace1, nbTableSpace2, nbTableSpace3, nbM2Space1, nbM2Space2, nbM2Space3, animatorNeeded, festivalId, exhibitorId) {
    let burl = process.env.VUE_APP_API;
    console.log(burl);
    return axios({
        method: 'post',
        url: burl + '/api/booking/add/',
        data : {
            nbTableSpace1, nbTableSpace2, nbTableSpace3, nbM2Space1, nbM2Space2, nbM2Space3, animatorNeeded, festivalId, exhibitorId
        },
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie("token")
        }
    })
}
