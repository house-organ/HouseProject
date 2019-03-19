import React from 'react'
import {HashRouter as Router,Route , Switch} from 'react-router-dom'
import App from '../App.js'
// import Login from '../page/login'
import Main from '../page/main'
export default class adminRouter extends React.Component{
    render(){
        return(
            <Router>
                <App>
                    {/*<Router path="../page/login" component={Login} />*/}
                    <Router path="../page/main" component={Main} />
                </App>
            </Router>
        )
    }
}