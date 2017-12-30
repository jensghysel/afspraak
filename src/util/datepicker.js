import React, {Component} from 'react';
import './datepicker.css';
import Datetime from 'react-datetime'

class Datepicker extends Component {
    render(){
        return(
            <Datetime timeFormat={false} inputProps={{placeholder: 'Kies een datum'}} dateFormat={"DD/MM/YYYY"} onChange={this.props.dateUpdated} />
        );
    }
}

export default Datepicker;