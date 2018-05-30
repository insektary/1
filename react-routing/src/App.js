import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import './App.less';
import Header from './Header/Header';
import Navigation from './Navigation/Navigation';
import About from './About/About';
import Contacts from './Contacts/Contacts';
import News from './News/News';
import SignIn from './SignIn/SignIn';
import Error_404 from './Error_404/Error_404';
import Error_204 from './Error_204/Error_204';
import Home from './Home/Home';
import Admin from './Admin/Admin';
import Add from './Add/Add';
import Edit from './Edit/Edit';
import { CONST, CSS } from './CONST';

class App extends Component {
    constructor() {
        super();

        this.onSignIn = this.onSignIn.bind(this);
        this.onSignOut = this.onSignOut.bind(this);
        this.addOrChange = this.addOrChange.bind(this);
        this.cancelChanges = this.cancelChanges.bind(this);

        this.state = {
            news: [],
            adminRights: false
        };
        this.newsRequest();
    };

    generateID() {
        return new Date().getTime().toString().substr(5);
    }

    getDate() {
        const date = new Date();

        return `${ date.getDate() }.${ date.getMonth() }.${ date.getFullYear() }`;
    }

    async newsRequest() {
        let response = await fetch(CONST.DATA_PATH);
        let news = await response.json();

        this.setState({ news });
    }

    onSignIn() {
        this.setState({ adminRights: true });
    }

    onSignOut() {
        this.setState({ adminRights: false });
    }

    addOrChange(event) {
        const [ {value: title}, {value: content} ] = event.target.elements;
        const id = event.target.id || this.generateID();

        if (title.trim() && content.trim()) {
            this.setState(({ news }) => (news.find((news) => news.id === id) ? {
                news: news.map((news) => {
                    if (news.id === id) {
                        news.title = title;
                        news.content = content;
                    }

                    return news;
                })} : {
                    news: [{
                        title,
                        content,
                        id,
                        key: id,
                        date: this.getDate()
                    }, ...news]
                }
            ));

            this.props.history.push('/news');
        }

        event.preventDefault();
    }

    cancelChanges() {
        this.props.history.push('/news');
    }

    render() {
        const { news, adminRights } = this.state;

        return (
            <div className={ CSS.APP }>
                <Header/>
                <Navigation adminRights={ adminRights } onSignOut={ this.onSignOut }/>
                <div className={ CSS.CONTENT }>
                    <Switch>
                        <Route path="/" exact={ true } component={ Home }/>
                        <Route path="/about" component={ About }/>
                        <Route path="/contacts" component={ Contacts }/>
                        <Route path="/news" exact={ true } render={ () => <News data={ news }/>}/>
                        <Route path="/news/add" render={ () => <Add addOrChange={ this.addOrChange }/>}/>
                        <Route path="/news/:id/edit" render={ (props) => <Edit
                            addOrChange={ this.addOrChange }
                            cancelChanges={ this.cancelChanges } news={ news } {...props}/>}/>
                        <Route path="/signin" render={ () => <SignIn onSignIn={ this.onSignIn }/>}/>
                        <Route path="/admin" render={ () => <Admin adminRights={ adminRights } />}/>
                        <Route path="/error204" component={ Error_204 }/>
                        <Route path="*" component={ Error_404 }/>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default withRouter(App);