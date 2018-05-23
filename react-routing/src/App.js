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
import Home from './Home/Home';
import Admin from './Admin/Admin';
import Add from './Add/Add';

class App extends Component {
    constructor() {
        super();

        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);

        this.state = {
            news: [],
            adminRights: false
        }
    };

    componentDidMount() {
        this.newsRequest();
    }

    async newsRequest() {
        let response = await fetch('data.json');
        let parsedResponse = await response.json();

        this.setState({news: parsedResponse});
    }

    signIn() {
        this.setState({ adminRights: true });
    }

    signOut() {
        this.setState({ adminRights: false });
        window.localStorage.clear();
    }

    render() {
        const { news, adminRights } = this.state;
        console.log(this.props)

        return (
            <div className="app">
                <Header/>
                <Router>
                    <div className='router'>
                        <Navigation adminRights={ adminRights } signOut={ this.signOut }/>
                        <div className="content">
                            <Switch>
                                <Route path="/" exact={ true } component={ Home } />
                                <Route path="/about" component={ About } />
                                <Route path="/contacts" component={ Contacts } />
                                <Route path="/news">
                                    <News data={ news }>
                                        <Route path="/news/add" component={ Add } />
                                    </News>
                                </Route>
                                <Route path="/signin" render={ () => <SignIn signIn={ this.signIn }/> }/>
                                <Route path="/admin" component={ Admin } />
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