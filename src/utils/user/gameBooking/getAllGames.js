import axios from "axios";


export function getAllGames() {
    let burl = process.env.VUE_APP_API;
    console.log(burl);
    return axios({
        method: 'get',
        url: burl + '/api/gameBooking/allGames',
        headers : {
            'Content-Type': 'application/json'
        }
    })
}
