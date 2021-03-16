import axios from "axios";
import {getCookie} from "../cookie/cookie";

export function getSearchResults(searchId) {
    let burl = process.env.VUE_APP_API;
    return axios({
        method: 'get',
        url: burl + '/api/project/search/getResults?searchId='+searchId,
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie("token")
        }
    })
}
