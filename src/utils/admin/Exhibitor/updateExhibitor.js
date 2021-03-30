import axios from "axios";
import {getCookie} from "../../cookie/cookie";


export function updateExhibitor(exhibitorId, name, publisherOnly) {
    let burl = process.env.VUE_APP_API;
    console.log(burl);
    return axios({
        method: 'put',
        url: burl + '/api/exhibitor/update/',
        data : {
            exhibitorId, name, publisherOnly
        },
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie("token")
        }
    })
}
