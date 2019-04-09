import React from 'react'
import './index.less'
import {Menu, Icon} from "antd";
import {NavLink} from 'react-router-dom'
import MenuConfig from './menuConfig'
const SubMenu = Menu.SubMenu;

export default class Menus extends React.Component{
    state = {
        curSelectedMenuKey:[]
    }
    componentWillMount(){
        let menuList = this.readerMenu(MenuConfig)
        this.setState({menuTreeNode:menuList})
    }
    onMenuClick = (key) =>{
        let breadcrumb = key.key;
        // breadcrumb = key.key.split("/");
        this.setState({
            curSelectedMenuKey:[breadcrumb]
        })
        console.log("11111111",breadcrumb)


        console.log("2222222",breadcrumb)
    }
    readerMenu = (data)=>{
        return  data.map((item)=>{
            if(item.children){
                return (
                    <SubMenu key={item.key} title={<span><Icon type="user" /><span>{item.title}</span></span>} >
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
            <Menu theme="light"
                  defaultSelectedKeys={['/home']}
                  selectedKeys={this.state.curSelectedMenuKey}
                  mode="inline"
                  onClick={this.onMenuClick}
                  style={{ border:'none',marginLeft: '-1px'}}
            >
                {this.state.menuTreeNode}
            </Menu>
        )
    }
}