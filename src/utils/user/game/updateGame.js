import axios from "axios";
import {getCookie} from "../../cookie/cookie";


export function updateGame(gameId, name, nbPlayersMin, nbPlayersMax, ageMin, duration, notice, prototypeGame, description) {
    let burl = process.env.VUE_APP_API;
    console.log(burl);
    return axios({
        method: 'put',
        url: burl + '/api/game/update/',
        data : {
            gameId, name, nbPlayersMin, nbPlayersMax, ageMin, duration, notice, prototypeGame, description
        },
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie("token")
        }
    })
}
