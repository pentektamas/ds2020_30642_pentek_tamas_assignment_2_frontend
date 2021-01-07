import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


function doTheLogin(account, callback) {
    let request = new Request(HOST.backend_api + '/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(account)
    });

    console.log("URL is : " + request.url);
    RestApiClient.performRequest(request, callback);
    console.log("Daaa")
}



export {
    doTheLogin,
};
