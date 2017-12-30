import React, {Component} from 'react';
import './App.css';
import Navigation from './navigation';
import Header from './content/header';

class App extends Component {
    render() {
        return (
            <div>
                <Navigation/>
                <Header/>
            </div>
        );
    }
}

export default App;
