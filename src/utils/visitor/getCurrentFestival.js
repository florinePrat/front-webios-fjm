import axios from "axios";


export function getCurrentFestival() {
    let burl = process.env.VUE_APP_API;
    console.log(burl);
    return axios({
        method: 'get',
        url: burl + '/api/festival/current',
        headers : {
            'Content-Type': 'application/json',
        }
    })
}
