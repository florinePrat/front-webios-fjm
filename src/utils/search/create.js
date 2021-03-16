import axios from "axios";
import {getCookie} from "../cookie/cookie";

export function createSearch(projectId, primaryWord, secondaryWord, locationWord, volumeMin, country) {
    let burl = process.env.VUE_APP_API;
    console.log(burl);
    return axios({
        method: 'post',
        url: burl + '/api/project/search/add_search',
        data : {projectId, primaryWord, secondaryWord, locationWord, volumeMin, country},
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie("token")
        }
    })
}
