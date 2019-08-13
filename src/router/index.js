import React from 'react'
import {HashRouter,Route, Switch} from 'react-router-dom'
import App from '../App.js'
import Index from '../page/index'
import Login from '../page/login'
import Home from '../page/modules/setUp/coreSetup/home' //控制台
import NoFind from '../page/modules/noFind'  //404
import UserManage from '../page/modules/setUp/coreSetup/userManage'  //用户设置
// import PrivilegeManage from '../page/modules/coreSetup/privilegeManage'
import MenuSetup from '../page/modules/setUp/coreSetup/menuSetup'  //导航设置
import NavSetup from '../page/modules/setUp/coreSetup/navSetup'  //导航设置
import WebsiteSetup from '../page/modules/setUp/coreSetup/websiteSetup'  //站点设置
// import MenuManageEditModal from '../page/modules/coreSetup/menuManage/editModal'

import RegionalManag from '../page/modules/modular/regionalManag' //区域管理
import AdvertManag from '../page/modules/modular/advertManag' //广告管理
import Recommend from '../page/modules/modular/recommend' //推荐位管理
import LinkManag from '../page/modules/modular/friendshipLinks/linkManag' //友情链接管理
import LinkType from '../page/modules/modular/friendshipLinks/linkType' //友情链接管理

import Screen from '../page/modules/modular/extendedAttributes/screen' //筛选条件 
import Attribute from '../page/modules/modular/extendedAttributes/attribute' //属性管理 


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


                                    <Route path="/region" exact component={RegionalManag}/>{/*区域管理*/}
                                    <Route path="/advert" exact component={AdvertManag}/>{/*广告管理*/}
                                    <Route path="/recommend" exact component={Recommend}/>{/*推荐位管理*/}
                                    <Route path="/link" exact component={LinkManag}/>{/*友情链接管理*/}
                                    <Route path="/linksort" exact component={LinkType}/>{/*友情链接管理*/}
                                    <Route path="/screen" exact component={Screen}/>{/*筛选条件*/}
                                    <Route path="/attribute" exact component={Attribute}/>{/*属性管理*/}
                                    
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