import React, {Component} from 'react';
import Datepicker from '../util/datepicker';
import $ from 'jquery';
import GoogleApiRequest from '../googleapi/googleApiRequest';

class Body extends Component {
    googleApiRequest = new GoogleApiRequest();
    merchantName = "Jens Company";
    appointmentLength = 60;
    appointmentFrom = 9;
    appointmentTill = 18;
    freeAppointments = [];

    updateAvailableAppointments(date) {
        $('#updateAppointmentsBtn').slideDown();
        $('#availableAppointments').slideUp();
        this.activeDate = date;
        // document.getElementsByTagName('input').onchange(this.updateAvailableAppointments())
        // $('#datepicker input').change(this.updateAvailableAppointments());
    }

    showAppointments() {
        $('#updateAppointmentsBtn').slideUp();
        $('#availableAppointments').slideDown();
        this.getAppointments();
    }

    getAppointments(){
        this.googleApiRequest.getAvailableEvents(this.activeDate).then(response => {
            console.log(response);
        });
    }

    addAppointment(){
        this.googleApiRequest.addEvent().then(response => {
           console.log(response);
        });
    }

    render() {
        this.googleApiRequest.getCalenderList().then(response => response.json()).then(response => {
            // console.log(response);
            this.googleApiRequest.setActiveCalendar(response.items[0].id);
        }).catch(e => console.log(e));
        return (
            <header className="masthead">
                <div className="container h-100 col-md-8 col-md-offset-2">
                    <div className="row h-100">
                        <div className="col-md-7 my-auto">
                            <h1>{this.merchantName}</h1>
                            <button className={'btn btn-primary'} onClick={() => this.addAppointment()}>Add appointment</button>
                        </div>
                        <div className="col-md-5 my-auto" style={{textAlign: 'center'}}>
                            <h2>Beschikbare data:</h2><br /><br />
                            <label className="col-md-4 displayInline">Kies datum</label>
                            <span className="col-md-4 displayInline datepicker" style={{width: 'auto'}}>
                                <Datepicker ref="datepicker" dateUpdated={(date) => this.updateAvailableAppointments(date)}/>
                            </span><br/><br/>
                            <button className={'btn btn-info'} id={'updateAppointmentsBtn'} style={{display: 'none'}} onClick={() => this.showAppointments()}>Bekijk beschikbare
                                afspraken
                            </button>
                            <span id={'availableAppointments'} style={{display: 'none'}}>
                                <select className={'form-control'} id="appointmentSelector">
                                    {
                                        this.freeAppointments.map(function(appointment){
                                          return <option value={appointment}>{appointment}</option>
                                        })
                                    }
                                </select>
                            </span>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Body;