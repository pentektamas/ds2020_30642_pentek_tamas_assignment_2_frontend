import React from 'react';
import {withRouter} from "react-router-dom";
import {
    Button,
    Card,
    CardHeader,
    Col, FormGroup, Input, Label,
    Row
} from 'reactstrap';
import * as API_CAREGIVER from "./api/caregiver-api";
import CaregiversPatientTable from "./components/caregiversPatient-table";
import SockJsClient from "react-stomp";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {HOST} from '../commons/hosts';

class CaregiverContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentCaregiver: null,
            isCaregiverLoaded: false,
            medicationPlans: "-",
            errorStatus: 0,
            error: null,
        };
        this.getPatients = this.getPatients.bind(this);
        this.medications = "";
    }

    componentDidMount() {
        if (this.props.location.state === undefined) {
            this.props.history.push("/error");
        } else
            this.fetchCaregiver();
    }

    getPatients() {
        return this.state.currentCaregiver.patients;
    }

    fetchCaregiver() {
        return API_CAREGIVER.getCaregiverById(this.props.location.state.currentID, (result, status, err) => {
            if (result !== null && status === 200) {
                this.setState({
                    currentCaregiver: result,
                    isCaregiverLoaded: true

                });
                this.medications = this.medicationPrettyPrint();
                this.setState({medicationPlans: this.medicationPrettyPrint()});
                if (this.state.currentCaregiver.patients[0] !== undefined) {
                    console.log("Pacient ID:" + this.state.currentCaregiver.patients[0].id);
                }
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    medicationPrettyPrint() {
        let result = "";
        for (let i = 0; i < this.state.currentCaregiver.patients.length; i++) {
            let row = "";
            row += "Patient's name: " + this.state.currentCaregiver.patients[i].name + "\n" + "Treatment period: " + this.state.currentCaregiver.patients[i].medicationPlan.treatmentPeriod + "\n";
            for (let j = 0; j < this.state.currentCaregiver.patients[i].medicationPlan.medications.length; j++) {
                let med = this.state.currentCaregiver.patients[i].medicationPlan.medications[j];
                row += "Medication name: " + med.name + ", side effects: " + med.sideEffects + ", dosage: " + med.dosage + "\n";
            }
            result += row + "\n\n";
        }
        return result;
    }

    createNotification = (message) => {
        NotificationManager.error(message, 'Warning!', 5000);
    }

    sendCurrentCaregiver = () => {
        this.clientRef.sendMessage(HOST.backend_api + '/caregiverInfo', JSON.stringify({'caregiverID': this.state.currentCaregiver.id}));
    }


    render() {
        return (
            <div>
                <NotificationContainer/>
                <CardHeader>
                    <strong> {'Caregiver\'s personal page'} </strong>
                    <Button className="btn navbar-btn btn-danger" name="logout" id="logout"
                            value="Log Out"
                            onClick={() => this.props.history.push({
                                pathname: '/'
                            })}>
                        Log Out
                    </Button>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 2}}>
                            {this.state.isCaregiverLoaded &&
                            <CaregiversPatientTable tableData={this.state.currentCaregiver.patients}/>}

                        </Col>
                    </Row>

                    <Row>
                        <Col sm={{size: '8', offset: 2}}>

                            <Label> </Label>
                            <Label style={{fontSize: '20px'}}> <b>Medication plans</b> </Label>
                            <Label> </Label>

                            <FormGroup id='medications'>
                                <Input name='medications' id='medicationsField'
                                       value={this.state.medicationPlans}
                                       type='textarea'
                                       rows="10"
                                       cols="150"
                                       readOnly={true}
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                </Card>

                <SockJsClient url={HOST.backend_api + '/api/caregiverWebsocket/'}
                              topics={['/queue/caregiver']}
                              onConnect={() => {
                                  console.log("WebSocket connected");
                                  this.sendCurrentCaregiver();
                              }}
                              onDisconnect={() => {
                                  console.log("WebSocket disconnected");
                              }}
                              onMessage={(msg) => {
                                  this.createNotification(msg);
                              }}
                              ref={(client) => {
                                  this.clientRef = client
                              }}/>

            </div>
        )
    }
}

export default withRouter(CaregiverContainer)
