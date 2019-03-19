import React from 'react'
import './index.less'
import {Icon, Menu} from "antd";
// import {NavLink} from 'react-router-dom'
import MenuConfig from './menuConfig'
const SubMenu = Menu.SubMenu;

export default class Menus extends React.Component{
    state = {
    }
    componentWillMount(){
        this.readerMenu(MenuConfig)
    }
    readerMenu = (data)=>{
        console.log("menu---->",data)
        let that = this;
        let menuList =  data.map((item)=>{
            if(item.children){
                return (
                    <SubMenu key={item.key} title={<span>{item.title}</span>}>
                        {this.readerMenu(item.children)}
                    </SubMenu>
                )
            }
            return (
                <Menu.Item key={item.key} title={item.title}>
                    {/*<NavLink to={item.key}>{item.title}</NavLink>*/}
                    {item.title}
                </Menu.Item>
            )

        })
        this.setState({menuTreeNode:menuList})
        console.log("menuList---->",menuList)

    }
    render() {
        return (
            <Menu
                mode="inline"
                defaultSelectedKeys={['/page/modules/home']}
                style={{ height: '100%', borderRight: 0 }}
            >
                {this.state.menuTreeNode}
            </Menu>
        )
    }
}