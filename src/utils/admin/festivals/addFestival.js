import axios from "axios";
import {getCookie} from "../../cookie/cookie";


export function addFestival(name) {
    let burl = process.env.VUE_APP_API;
    console.log(burl);
    return axios({
        method: 'post',
        url: burl + '/api/festival/add/',
        data : {
            name
        },
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie("token")
        }
    })
}
