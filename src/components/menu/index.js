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
        curSelectedMenuKey:[],//左侧菜单默认选中
        data:[], //左侧菜单数据
        param:'' //左侧菜单接口请求参数
    }
    componentWillMount(){


        let {menuName} = this.props; //顶部菜单初始选中参数
        console.log("左侧菜单默认加载参数----->",menuName)
        this.setState({
            param:menuName ||'',
        },this.fetch)

    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        let  menuNames = nextProps.menuName
        let {menuName} = this.props
        console.log("redux菜单值-->",menuNames,menuName)
        if(menuName == menuNames){
            return false
        }else {
            // return true
            this.fetch()
        }
        console.log("---------->",menuName,nextState)
    }
    fetch=()=>{
        axios.get("menu/"+this.state.param,null,
            result=> {
                console.log("左侧菜单接口数据-----1111---->",result)
                let menuData = result.result ||[];
                console.log("111",menuData)
                let menuList = this.readerMenu(menuData)
                this.setState({
                    data:result.result ||[],
                })
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
        // console.log("11111111",breadcrumb)


    }
    menuData=()=>{

        let menuData = this.state.data;
        console.log("111",menuData)
        let menuList = this.readerMenu(menuData)
        console.log("menuList----->",menuList,menuData)
        this.setState({
            menuTreeNode:menuList
        })
    }
    readerMenu = (data)=>{
        // let data = this.state.data;
        console.log("data----->",data)
        return  data.map((item)=>{
            let html
            if(item.leftChild){
                return (
                    <SubMenu key={item.request_path} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>} >
                        {this.readerMenu(item.children)}
                    </SubMenu>
                )
            }
            item.icon ? html = <span><Icon type={item.icon} /><span>{item.title}</span></span> : html = <span>{item.title}</span>
            return (
                <Menu.Item key={item.request_path} data-id={item.request_path}>
                    <NavLink to={item.request_path}>
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