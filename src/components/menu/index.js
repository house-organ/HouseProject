import React from 'react'
import './index.less'
import {Menu, Icon} from "antd";
import {NavLink} from 'react-router-dom'
import MenuConfig from './menuConfig'
const SubMenu = Menu.SubMenu;

export default class Menus extends React.Component{
    state = {
    }
    componentWillMount(){
        let menuList = this.readerMenu(MenuConfig)
        this.setState({menuTreeNode:menuList})
    }
    readerMenu = (data)=>{
        return  data.map((item)=>{
            if(item.children){
                return (
                    <SubMenu key={item.key} title={<span><Icon type="user" /><span>{item.title}</span></span>}>
                        {this.readerMenu(item.children)}
                    </SubMenu>
                )
            }
            if(item.hierarchy){
                return (
                    <Menu.Item key={item.key} data-id={item.key}>
                        <NavLink to={item.key}><span><Icon type="user" /><span>{item.title}</span></span></NavLink>
                    </Menu.Item>
                )
            }else{
                return (
                    <Menu.Item key={item.key} data-id={item.key}>
                        <NavLink to={item.key}>{item.title}</NavLink>
                    </Menu.Item>
                )
            }

        })

    }

    render() {
        return (
            <Menu theme="light" defaultSelectedKeys={['/home']} mode="inline" style={{ border:'none'}} >
                {this.state.menuTreeNode}
            </Menu>
        )
    }
}