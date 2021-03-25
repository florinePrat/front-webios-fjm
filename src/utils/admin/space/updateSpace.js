import axios from "axios";
import {getCookie} from "../../cookie/cookie";


export function updateSpace(name, numberOfTable1, unitPriceOfTable1, m2Price1, numberOfTable2, unitPriceOfTable2, m2Price2, numberOfTable3, unitPriceOfTable3, m2Price3, spaceId) {
    let burl = process.env.VUE_APP_API;
    console.log(burl);
    return axios({
        method: 'put',
        url: burl + '/api/space/update/',
        data : {
            name, numberOfTable1, unitPriceOfTable1, m2Price1, numberOfTable2, unitPriceOfTable2, m2Price2, numberOfTable3, unitPriceOfTable3, m2Price3, spaceId
        },
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie("token")
        }
    })
}
