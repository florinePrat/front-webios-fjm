import axios from "axios";
import {getCookie} from "../cookie/cookie";

export function deleteSearch(searchId,projectId) {
    let burl = process.env.VUE_APP_API;
    return axios({
        method: 'put',
        url: burl + '/api/project/search/delete?searchId='+searchId+'&projectId='+projectId,
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie("token")
        }
    })
}
