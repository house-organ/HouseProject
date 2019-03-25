import React from 'react'
import {HashRouter,Route, Switch,Redirect} from 'react-router-dom'
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
                            <Switch>
                                <Route  path="/" component={Home}/>
                                <Route  path="/userCore/userManage" component={UserManage}/>
                                <Route  path="/userCore/privilegeManage" component={PrivilegeManage}/>
                                <Route component={NoFind}/>
                            </Switch>
                        </Index>
                    } />
                </App>
            </HashRouter>
        )
    }
}