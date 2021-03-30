import axios from "axios";
import {getCookie} from "../../cookie/cookie";


export function deleteZone(zoneId, festivalId) {
    let burl = process.env.VUE_APP_API;
    console.log(burl);
    return axios({
        method: 'delete',
        url: burl + '/api/zone/delete/',
        data : {
            zoneId, festivalId
        },
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie("token")
        }
    })
}
