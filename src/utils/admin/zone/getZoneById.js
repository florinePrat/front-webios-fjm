import axios from "axios";
import {getCookie} from "../../cookie/cookie";


export function getZoneById(zoneId) {
    let burl = process.env.VUE_APP_API;
    console.log(burl);
    return axios({
        method: 'get',
        url: burl + '/api/zone/id/?zoneId='+zoneId,
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie("token")
        }
    })
}
