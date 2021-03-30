import axios from "axios";
import {getCookie} from "../../cookie/cookie";


export function updateSuivi(suiviId, present, statusTraking) {
    let burl = process.env.VUE_APP_API;
    console.log(burl);
    return axios({
        method: 'put',
        url: burl + '/api/suivi/update/',
        data : {
            suiviId, present, statusTraking
        },
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie("token")
        }
    })
}
