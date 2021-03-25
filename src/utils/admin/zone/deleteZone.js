import axios from "axios";
import {getCookie} from "../../cookie/cookie";


export function deleteZone(zoneId) {
    let burl = process.env.VUE_APP_API;
    console.log(burl);
    return axios({
        method: 'delete',
        url: burl + '/api/zone/delete/',
        data : {
            zoneId
        },
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie("token")
        }
    })
}
