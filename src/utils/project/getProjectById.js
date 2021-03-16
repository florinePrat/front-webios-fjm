import axios from "axios";
import {getCookie} from "../cookie/cookie";

export function getProjectById(idProject) {
    let burl = process.env.VUE_APP_API;
    return axios({
        method: 'get',
        url: burl + '/api/project/project?idProject='+idProject,
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie("token")
        }
    })
}
