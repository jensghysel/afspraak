import React, {Component} from 'react';
import './App.css';
import Navigation from './navigation';
import Body from './content/body';

class App extends Component {
    render() {
        return (
            <div>
                <Navigation/>
                <Body/>
            </div>
        );
    }
}

export default App;
