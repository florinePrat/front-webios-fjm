import axios from "axios";
import {getCookie} from "../cookie/cookie";

export function updateName(projectId, newName) {
    let burl = process.env.VUE_APP_API;
    return axios({
        method: 'put',
        url: burl + '/api/project/changeName?projectId='+projectId,
        data:{newName},
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie("token")
        }
    })
}
