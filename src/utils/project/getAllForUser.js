import axios from "axios";
import {getCookie} from "../cookie/cookie";

export function getAllUserProject() {
    let burl = process.env.VUE_APP_API;
    return axios({
        method: 'get',
        url: burl + '/api/project/projects',
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie("token")
        }
    })
}
