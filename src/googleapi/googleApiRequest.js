import {Component} from 'react';
import moment from 'moment';

export default class GoogleApiRequest extends Component {
    googleAuth = require('google-auto-auth');
    key = require('./afspraakonline-2556298bcf2b.json');

    constructor() {
        super();
        this.initAuthConfig();
    }

    getCalenderList() {
        return this.getActiveToken().then(response => {
            return fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList?access_token=' + response, {
                method: 'GET'
            });
        });
    }

    setActiveCalendar(id) {
        this.activeCalendar = id;
    }

    getAvailableEvents(date) {
        return this.getActiveToken().then(response => {
            return fetch('https://www.googleapis.com/calendar/v3/calendars/' + this.activeCalendar + '/events?access_token=' + response + '&timeMin=' + date.format('YYYY-MM-DDTHH:mm:ss') + 'Z' + '&timeMax=' + date.add(1, 'days').format('YYYY-MM-DDTHH:mm:ss') + 'Z', {
                method: 'GET'
            });
        });
    }

    addEvent() {
        return this.getActiveToken().then(response => {
            let json = {
                'start': {'dateTime': moment().format('YYYY-MM-DDTHH:mm:ss') + 'Z', 'timeZone': 'Europe/Zurich'},
                'end': {'dateTime': moment().add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss') + 'Z', 'timeZone': 'Europe/Zurich'},
                description: 'Test'
            };
            let object = {
                'calendarId': this.activeCalendar,
                'resource': {
                    'end': {
                        'dateTime': '2014-07-28T23:00:00',//end,
                        'timeZone': 'Europe/Brussels'
                    },
                    'start': {
                        'dateTime': '2014-07-28T18:00:00',//start,
                        'timeZone': 'Europe/Brussels'
                    }
                }
            };

            let event = {
                'summary': 'Google I/O 2015',
                'location': '800 Howard St., San Francisco, CA 94103',
                'description': 'A chance to hear more about Google\'s developer products.',
                'start': {
                    'dateTime': '2015-05-28T09:00:00-07:00',
                    'timeZone': 'America/Los_Angeles'
                },
                'end': {
                    'dateTime': '2015-05-28T17:00:00-07:00',
                    'timeZone': 'America/Los_Angeles'
                },
                'recurrence': [
                    'RRULE:FREQ=DAILY;COUNT=2'
                ],
                'attendees': [
                    {'email': 'lpage@example.com'},
                    {'email': 'sbrin@example.com'}
                ],
                'reminders': {
                    'useDefault': false,
                    'overrides': [
                        {'method': 'email', 'minutes': 24 * 60},
                        {'method': 'popup', 'minutes': 10}
                    ]
                }
            };
            console.log(json);
            return fetch('https://www.googleapis.com/calendar/v3/calendars/' + this.activeCalendar + '/events?access_token=' + response, {
                method: 'POST',
                header: {
                    'Authorization': 'Bearer '+response,
                    'content-type': 'application/json'
                },
                body: JSON.stringify(json)
            });
        });
    }

    getActiveToken() {
        //Api Url: https://developers.google.com/google-apps/calendar/v3/reference/calendarList/list
        // Auth plugin Url: https://www.npmjs.com/package/google-auto-auth
        let self = this;
        return new Promise((resolve, reject) => {
            self.auth.getToken(function (err, token) {
                if (err !== undefined && err !== null) {
                    reject(err);
                }
                resolve(token);
            });
        });
    }

    initAuthConfig() {
        if (this.authConfig === undefined) {
            this.authConfig = {};
            this.authConfig.credentials = {
                client_email: this.key.client_email,
                private_key: this.key.private_key
            };
            this.authConfig.scopes = ['https://www.googleapis.com/auth/calendar'];
            this.auth = this.googleAuth(this.authConfig);
        }
    }
}