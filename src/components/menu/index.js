import React from 'react'
import './index.less'
import {Menu, Icon} from "antd";
import {NavLink} from 'react-router-dom'
import MenuConfig from './menuConfig'
import axios from "../../axios";
import {connect} from "react-redux";
import Store from '../../redux/store'
const SubMenu = Menu.SubMenu;

class Menus extends React.Component{
    state = {
        curSelectedMenuKey:[],
        data:[]
    }
    componentWillMount(){
        let menuList = this.readerMenu(MenuConfig)
        this.setState({menuTreeNode:menuList})
        // this.fetch()
        let {menuName} = this.props;
        console.log("99999999999999----->",menuName)
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        let  menuNames = nextProps.menuName
        let {menuName} = this.props
        console.log("99999999999999---888888-->",menuNames,menuName)
        if(menuName == menuNames){
            return false
        }else {
            this.fecth()
            return true

        }
        console.log("---------->",menuName,nextState)
    }
    fetch=()=>{
        axios.get("menu/all",null,
            result=> {
                console.log("控制面板--------->",result)
                this.setState({data:result.result ||[]})
            },
            result=> {

            }
        );
    }
    onMenuClick = (key) =>{
        let breadcrumb = key.key;
        // breadcrumb = key.key.split("/");
        this.setState({
            curSelectedMenuKey:[breadcrumb]
        })
        console.log("11111111",breadcrumb)


    }
    readerMenu = (data)=>{
        return  data.map((item)=>{
            let html
            if(item.children){
                return (
                    <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>} >
                        {this.readerMenu(item.children)}
                    </SubMenu>
                )
            }
            item.icon ? html = <span><Icon type={item.icon} /><span>{item.title}</span></span> : html = <span>{item.title}</span>
            return (
                <Menu.Item key={item.key} data-id={item.key}>
                    <NavLink to={item.key}>
                        {html}
                    </NavLink>
                </Menu.Item>
            )

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
const mapStateToProps =(state)=>{
    console.log("ssssssssss",state)
    return {
        menuName:state.menuName,
        // list:state.list
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        changeInputValue(e){
            console.log("1111111",e)
            // const action=changeValue(e.target.value)
            // dispatch(action)
        },
        //新增数据
        handleAddClick(){
            // const action =additem()
            // dispatch(action)
        },
        //删除数据
        handleDelete(index){
            // const action=deleteItem(index)
            // dispatch(action)
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Menus);