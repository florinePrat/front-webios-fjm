import axios from "axios";
import {getCookie} from "../../cookie/cookie";


export function updateCurrentFestival(festivalId, current) {
    let burl = process.env.VUE_APP_API;
    console.log(burl);
    return axios({
        method: 'put',
        url: burl + '/api/festival/update/',
        data : {
            festivalId,
            current
        },
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie("token")
        }
    })
}
