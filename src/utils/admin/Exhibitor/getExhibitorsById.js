import axios from "axios";
import {getCookie} from "../../cookie/cookie";


export function getExhibitorsById(exhibitorId) {
    let burl = process.env.VUE_APP_API;
    console.log(burl);
    return axios({
        method: 'get',
        url: burl + '/api/exhibitor/exhibitor/?exhibitorId=' + exhibitorId,
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie("token")
        }
    })
}
