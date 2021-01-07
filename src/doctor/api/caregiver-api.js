import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    doctor: '/doctor/',
    caregiver: 'caregiver/'
};

function getCaregivers(callback) {
    let request = new Request(HOST.backend_api + endpoint.doctor + "caregivers", {
        method: 'GET',
        headers: new Headers({'Authorization': 'Bearer ' + localStorage.getItem('JWTtoken'),}),
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getCaregiverById(caregiverId, callback) {
    let request = new Request(HOST.backend_api + endpoint.doctor + endpoint.caregiver + caregiverId, {
        method: 'GET',
        headers: new Headers({'Authorization': 'Bearer ' + localStorage.getItem('JWTtoken'),}),
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function insertCaregiver(caregiver, callback) {
    let request = new Request(HOST.backend_api + endpoint.doctor + endpoint.caregiver + 'insert', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('JWTtoken'),
        },
        body: JSON.stringify(caregiver)
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

function updateCaregiver(caregiver, id, callback) {
    let request = new Request(HOST.backend_api + endpoint.doctor + endpoint.caregiver + 'update/' + id, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('JWTtoken'),
        },
        body: JSON.stringify(caregiver)
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

function deleteCaregiver(caregiverID, callback) {
    let request = new Request(HOST.backend_api + endpoint.doctor + endpoint.caregiver + "delete/" + caregiverID, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('JWTtoken'),
        },
        body: JSON.stringify(caregiverID)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}


export {
    getCaregiverById,
    insertCaregiver,
    updateCaregiver,
    getCaregivers,
    deleteCaregiver
};
