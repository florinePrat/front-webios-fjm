import axios from "axios";
import {getCookie} from "../cookie/cookie";


export function signup(email, password, admin) {
    let burl = process.env.VUE_APP_API;
    console.log(burl);
    return axios({
        method: 'post',
        url: burl + '/api/signup/',
        data : {
            email,
            password,
            admin
        },
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie("token")
        }
    })
}
