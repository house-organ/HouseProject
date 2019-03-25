import React from 'react'
import {HashRouter,Route } from 'react-router-dom'
import App from '../App.js'
import Index from '../page/index'
import Login from '../page/login'
import Home from '../page/modules/home'
import NoFind from '../page/modules/noFind'
import UserManage from '../page/modules/userCore/userManage'
import PrivilegeManage from '../page/modules/userCore/privilegeManage'
export default class AdminRouter extends React.Component{
    render(){
        return(
            <HashRouter>
                <App>
                    <Route path="/" exact={true} component={Login} />
                    <Route path="/index" render={() =>
                        <Index>
                            <Route path="/" component={Home}/>
                            <Route path="../page/modules/userCore/userManage" component={UserManage}/>
							<Route path="../page/modules/userCore/privilegeManage" component={PrivilegeManage}/>
                            <Route component={NoFind}/>
                            {/*<Route path="/" component={Home}/>*/}
                        </Index>
                    } />
                </App>
            </HashRouter>
        )
    }
}