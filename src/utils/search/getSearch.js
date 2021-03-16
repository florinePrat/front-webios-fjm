import axios from "axios";
import {getCookie} from "../cookie/cookie";

export function getSearchByProjectId(idProject) {
    let burl = process.env.VUE_APP_API;
    return axios({
        method: 'get',
        url: burl + '/api/project/search/getSearchs?projectId='+idProject,
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie("token")
        }
    })
}
