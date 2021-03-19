import axios from "axios";
import {getCookie} from "../../cookie/cookie";


export function addContact(firstName, lastName, email, address, telMobile, telFixe, work, publisherId, mainContact) {
    let burl = process.env.VUE_APP_API;
    console.log(burl);
    return axios({
        method: 'post',
        url: burl + '/api/contact/add/',
        data : {
            firstName, lastName, email, address, telMobile, telFixe, work, publisherId, mainContact
        },
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie("token")
        }
    })
}
