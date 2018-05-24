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
import Home from './Home/Home';
import Admin from './Admin/Admin';
import Add from './Add/Add';
import Edit from './Edit/Edit';
import { CONST, CSS } from './CONST';

class App extends Component {
    constructor() {
        super();

        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
        this.addNews = this.addNews.bind(this);
        this.cancelChanges = this.cancelChanges.bind(this);
        this.submitChanges = this.submitChanges.bind(this);

        this.state = {
            news: [],
            adminRights: false
        }
    };

    static generateID() {
        return Number(new Date().getTime().toString().substr(5));
    }

    static getDate() {
        const date = new Date();

        return `${ date.getDate() }.${ date.getMonth() }.${ date.getFullYear() }`;
    }

    componentWillMount() {
        this.newsRequest();
    }

    async newsRequest() {
        let response = await fetch(CONST.DATA_PATH);
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

    addNews(event) {
        const [ {value: title}, {value: content} ] = event.target.elements;

        if (!title.trim() || !content.trim()) {
            event.preventDefault();

            return;
        }

        this.setState(({ news }) => ({
            news: [{
                title,
                content,
                key: App.generateID(),
                date: App.getDate()
            }, ...news]
        }));

        event.preventDefault();
        this.props.history.push('/news');
    }

    submitChanges(event) {
        const [ {value: newTitle}, {value: newContent} ] = event.target.elements;
        const id = event.target.id;

        if (!newTitle.trim() || !newContent.trim()) {
            event.preventDefault();

            return;
        }

        this.setState(({ news }) => ({
            news: news.map((news) => {
                if (news.key === Number(id)) {
                    news.title = newTitle;
                    news.content = newContent;
                }

                return news;
            })
        }));

        event.preventDefault();
        this.props.history.push('/news');
    }

    cancelChanges() {
        this.props.history.push('/news');
    }

    render() {
        const { news, adminRights } = this.state;

        return (
            <div className={ CSS.APP }>
                <Header/>
                <Navigation adminRights={ adminRights } signOut={ this.signOut }/>
                <div className={ CSS.CONTENT }>
                    <Switch>
                        <Route path="/" exact={ true } component={ Home }/>
                        <Route path="/about" component={ About }/>
                        <Route path="/contacts" component={ Contacts }/>
                        <Route path="/news" exact={ true } render={ () => <News data={ news }/>}/>
                        <Route path="/news/add" render={ () => <Add addNews={ this.addNews }/>}/>
                        <Route path="/news/edit/:id" render={ (props) =>
                            <Edit submitChanges={ this.submitChanges } cancelChanges={ this.cancelChanges } data={ news } {...props}/>}/>
                        <Route path="/signin" render={ () => <SignIn signIn={ this.signIn }/>}/>
                        <Route path="/admin" component={ Admin }/>
                        <Route path="*" component={ Error_404 }/>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default withRouter(App);