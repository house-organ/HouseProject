import React from 'react'
import {HashRouter,Route, Switch} from 'react-router-dom'
import App from '../App.js'
import Index from '../page/index'
import Login from '../page/login'
import Home from '../page/modules/home' //控制台
import NoFind from '../page/modules/noFind'  //404
import UserManage from '../page/modules/coreSetup/userManage'  //用户设置
// import PrivilegeManage from '../page/modules/coreSetup/privilegeManage'
import MenuSetup from '../page/modules/coreSetup/menuSetup'  //导航设置
import NavSetup from '../page/modules/coreSetup/navSetup'  //导航设置
import WebsiteSetup from '../page/modules/coreSetup/websiteSetup'  //站点设置
// import MenuManageEditModal from '../page/modules/coreSetup/menuManage/editModal'

export default class AdminRouter extends React.Component{
    render(){
        return(
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/" exact={true} component={Login} />
                        <Route path="/" render={() =>
                            <Index>
                                <Switch>
                                    <Route path="/home"  component={Home}/>{/*控制台*/}
                                    <Route path="/site" exact component={WebsiteSetup}/>{/*站点设置*/}
                                    <Route path="/cache" exact component={UserManage}/>{/*更新缓存*/}
                                    <Route path="/nav" component={NavSetup}/>{/*导航设置*/}
                                    <Route path="/menu" component={MenuSetup}/>{/*菜单设置*/}
                                    {/*<Route path="/MenuManage" exact component={MenuManage}/>*/}
                                    {/*<Route path="/coreSetup/menuManage/editModal/:id?" component={MenuManageEditModal}/>*/}

                                    {/*<Route path="/userCore/menuManage" render={() =>*/}
                                        {/*<Switch>*/}
                                            {/*<Route path="/userCore/menuManage" component={MenuManage}/>*/}
                                            {/*<Route path="/userCore/menuManage/editModal" component={MenuManageEditModal}/>*/}
                                        {/*</Switch>*/}
                                    {/*}/>*/}
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