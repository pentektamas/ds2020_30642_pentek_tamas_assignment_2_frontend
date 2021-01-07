import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    doctor: '/doctor/',
    patient: 'patient/'
};

function getPersons(callback) {
    let request = new Request(HOST.backend_api + endpoint.doctor, {
        method: 'GET',
        headers: new Headers({'Authorization': 'Bearer ' + localStorage.getItem('JWTtoken'),}),
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getPatients(callback) {
    let request = new Request(HOST.backend_api + endpoint.doctor + "patients", {
        method: 'GET',
        headers: new Headers({'Authorization': 'Bearer ' + localStorage.getItem('JWTtoken'),}),
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getPatientById(patientId, callback) {
    let request = new Request(HOST.backend_api + endpoint.doctor + endpoint.patient + patientId, {
        method: 'GET',
        headers: new Headers({'Authorization': 'Bearer ' + localStorage.getItem('JWTtoken'),}),
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function insertPatient(patient, callback) {
    let request = new Request(HOST.backend_api + endpoint.doctor + endpoint.patient + 'insert', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('JWTtoken'),
        },
        body: JSON.stringify(patient)
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

function updatePatient(patient, id, callback) {
    let request = new Request(HOST.backend_api + endpoint.doctor + endpoint.patient + 'update/' + id, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('JWTtoken'),
        },
        body: JSON.stringify(patient)
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

function deletePatient(patientID, callback) {
    let request = new Request(HOST.backend_api + endpoint.doctor + endpoint.patient + "delete/" + patientID, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('JWTtoken'),
        },
        body: JSON.stringify(patientID)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}


export {
    getPersons,
    getPatientById,
    insertPatient,
    updatePatient,
    getPatients,
    deletePatient
};
