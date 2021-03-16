import axios from "axios";


export function login(email, password) {
    let burl = process.env.VUE_APP_API;
    console.log(burl);
    return axios({
        method: 'post',
        url: burl + '/api/login/',
        data : {
            email,
            password
        },
        headers : {
            'Content-Type': 'application/json',
        }
    })
}
