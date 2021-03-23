import axios from "axios";
import {getCookie} from "../../cookie/cookie";


export function addZone(name, festivalId) {
    let burl = process.env.VUE_APP_API;
    console.log(burl);
    return axios({
        method: 'post',
        url: burl + '/api/zone/add/',
        data : {
            name, festivalId
        },
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie("token")
        }
    })
}
