import axios from "axios";
import {getCookie} from "../../cookie/cookie";


export function updateFestival(festivalId, name) {
    let burl = process.env.VUE_APP_API;
    console.log(burl);
    console.log(name + festivalId)
    return axios({
        method: 'put',
        url: burl + '/api/festival/update/',
        data : {
            festivalId,
            name
        },
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie("token")
        }
    })
}
