import axios from "axios";
import {getCookie} from "../../cookie/cookie";


export function getExhibitorsByfestivaId(festivalId) {
    let burl = process.env.VUE_APP_API;
    console.log(burl);
    return axios({
        method: 'get',
        url: burl + '/api/exhibitor/festival/?festivalId=' + festivalId,
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie("token")
        }
    })
}
