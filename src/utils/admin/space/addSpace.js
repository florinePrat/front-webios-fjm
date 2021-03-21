import axios from "axios";
import {getCookie} from "../../cookie/cookie";


export function addSpace(name, festivalId, numberOfTable1, unitPriceOfTable1, m2Price1, numberOfTable2, unitPriceOfTable2, m2Price2, numberOfTable3, unitPriceOfTable3, m2Price3) {
    let burl = process.env.VUE_APP_API;
    console.log(burl);
    return axios({
        method: 'post',
        url: burl + '/api/space/add/',
        data : {
            name, festivalId, numberOfTable1, unitPriceOfTable1, m2Price1, numberOfTable2, unitPriceOfTable2, m2Price2, numberOfTable3, unitPriceOfTable3, m2Price3
        },
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie("token")
        }
    })
}
