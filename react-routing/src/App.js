import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.less';
import Header from './Header/Header';
import Navigation from './Navigation/Navigation';
import About from './About/About';
import Contacts from './Contacts/Contacts';
import News from './News/News';
import SignIn from './SignIn/SignIn';
import Error_404 from './Error_404/Error_404';

class App extends Component {
    render() {
        return (
            <div className="app">
                <Header/>
                <Router>
                    <div className='router'>
                        <Navigation/>
                        <div className="content">
                            <Switch>
                                <Route path="/about" component={ About } />
                                <Route path="/contacts" component={ Contacts } />
                                <Route path="/news" component={ News } />
                                <Route path="/signin" component={ SignIn } />
                                <Route path="*" component={ Error_404 } />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </div>
        )
    }
}

export default App;