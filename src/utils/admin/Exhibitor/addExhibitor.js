import axios from "axios";
import {getCookie} from "../../cookie/cookie";


export function addExhibitor(exhibitorName, publisherOnly ,festivalId) {
    let burl = process.env.VUE_APP_API;
    console.log(burl);
    return axios({
        method: 'post',
        url: burl + '/api/exhibitor/add/',
        data : {
            exhibitorName,
            publisherOnly,
            festivalId
        },
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie("token")
        }
    })
}
