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
                    <SubMenu key={item.key} title={<span>{item.title}</span>}>
                        {this.readerMenu(item.children)}
                    </SubMenu>
                )
            }
            return (
                <Menu.Item key={item.key} data-id={item.key}>
                    <NavLink to={item.key}>{item.title}</NavLink>
                    {/*{item.title}*/}
                </Menu.Item>
            )

        })

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