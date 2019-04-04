import React from 'react'
import {HashRouter,Route, Switch} from 'react-router-dom'
import App from '../App.js'
import Index from '../page/index'
import Login from '../page/login'
import Home from '../page/modules/home'
import NoFind from '../page/modules/noFind'
import UserManage from '../page/modules/userCore/userManage'
import PrivilegeManage from '../page/modules/userCore/privilegeManage'
import MenuManage from '../page/modules/userCore/menuManage'

export default class AdminRouter extends React.Component{
    render(){
        return(
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/login" exact={true} component={Login} />
                        <Route path="/" render={() =>
                            <Index>
                                <Switch>
                                    <Route path="/home" component={Home}/>
                                    <Route path="/userCore/userManage" component={UserManage}/>
                                    <Route path="/userCore/privilegeManage" component={PrivilegeManage}/>
                                    <Route path="/userCore/menuManage" component={MenuManage}/>
                                    <Route component={NoFind} />
                                </Switch>
                            </Index>
                        } />
                    </Switch>
                </App>
            </HashRouter>
        )
    }
}