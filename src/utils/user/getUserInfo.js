//import axios from "axios";
import axiosInterceptor from "../../middleware/interceptors";
import {getCookie} from "../../utils/cookie/cookie.js";


export function getUserInfo() {
    let burl = process.env.VUE_APP_API;
    console.log(axiosInterceptor)
    console.log(burl);
    return axiosInterceptor({
        method: 'get',
        url: burl + '/api/user/',
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie("token")
        }
    })
}
