import axios from "axios";
import {getCookie} from "../../cookie/cookie";


export function addExistingExhibitor(festivalId, exhibitorId) {
    let burl = process.env.VUE_APP_API;
    console.log(burl);
    return axios({
        method: 'post',
        url: burl + '/api/exhibitor/addExisting/',
        data : {
            festivalId,
            exhibitorId
        },
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie("token")
        }
    })
}
