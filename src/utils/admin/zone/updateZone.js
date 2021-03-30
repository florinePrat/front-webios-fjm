import axios from "axios";
import {getCookie} from "../../cookie/cookie";


export function updateZone(zoneId, name) {
    let burl = process.env.VUE_APP_API;
    console.log(burl);
    return axios({
        method: 'put',
        url: burl + '/api/zone/update/',
        data : {
            name, zoneId
        },
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie("token")
        }
    })
}
