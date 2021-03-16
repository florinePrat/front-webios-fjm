import axios from "axios";
import {getCookie} from "../cookie/cookie";

export function addLeadInformation(email, tools) {
    let burl = process.env.VUE_APP_API;
    console.log(burl);
    return axios({
        method: 'get',
        url: burl + '/api/lead/add/',
        data:{
            email,
            tools
        },
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie("token")
        }
    })
}
