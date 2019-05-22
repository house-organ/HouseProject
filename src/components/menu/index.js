import React from 'react'
import './index.less'
import {Menu, Icon} from "antd";
import {NavLink} from 'react-router-dom'
import MenuConfig from './menuConfig'
import axios from "../../axios";
import {connect} from "react-redux";
import Store from '../../redux/store'
import {switchMenu} from "../../redux/action";
const SubMenu = Menu.SubMenu;

class Menus extends React.Component{
    state = {
        defaultOpenKeys:['2'],//左侧菜单默认展开
        defaultSelectedKeys:['0'],//左侧菜单默认选中
        // curSelectedMenuKey:['3'],//左侧菜单默认选中
        data:[], //左侧菜单数据
        param:'', //左侧菜单接口请求参数
        menuTreeNode:[]
    }
    componentWillMount(){


        let {menuName} = this.props; //顶部菜单初始选中参数
        // console.log("左侧菜单默认加载参数----->",menuName)
        this.setState({
            param:menuName ||'',
        },this.fetch)
        // console.log("-----左侧导航加载--222----",this.state.menuTreeNode)
        // console.log("curSelectedMenuKey---",this.state.curSelectedMenuKey)
    }
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     let  menuNames = nextProps.menuName
    //     let {menuName} = this.props
    //     // console.log("redux菜单值-->",menuNames,menuName)
    //     if(menuName == menuNames){
    //         // console.log("11111111")
    //         return false
    //     }else {
    //         return true
    //         // this.fetch()
    //     }
    //     // console.log("---------->",menuName,nextState)
    // }
    fetch=()=>{
        axios.get("menu/"+this.state.param,null,
            result=> {
                let menuData = result.result ||[];
                let home = {}
                home.id = '0';
                home.title= "控制台";
                home.request_child= "home";
                home.request_method= "index";
                home.request_parent= null;

                menuData[0].leftChild.push(home)
                console.log("左侧菜单接口数据----",menuData)

                let menuList = this.readerMenu(menuData)
                console.log("menuList----11->",[menuData[0].leftChild[0].id])
                this.setState({
                    data:result.result ||[],
                    menuTreeNode:menuList,
                    defaultOpenKeys:[menuData[0].id],
                    defaultSelectedKeys:[menuData[0].leftChild[0].id]
                })
            },
            result=> {

            }
        );
    }
    onMenuClick = (key) =>{
        let breadcrumb = key.key;
        // console.log("breadcrumb",breadcrumb)
        // breadcrumb = key.key.split("/");
        // Store.dispatch(leftMenu(key))
        this.setState({
            defaultSelectedKeys:[breadcrumb]
        })


    }
    // menuTreeNode = () =>{
    //     let menuData = this.state.data;
    //     console.log("menuData----11->",menuData)
    //     let menuList = this.readerMenu(menuData)
    //     console.log("menuList----->",menuList)
    //     this.setState({
    //         menuTreeNode:menuList
    //     })
    // }
    readerMenu = (data)=>{
        return  data.map((item)=>{
            let html
            if(item.leftChild){
                return (
                    <SubMenu key={item.id} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>} >
                        {this.readerMenu(item.leftChild)}
                    </SubMenu>
                )
            }
            item.icon ? html = <span><Icon type={item.icon} /><span>{item.title}</span></span> : html = <span>{item.title}</span>
            return (
                <Menu.Item key={item.id} data-id={item.request_child}>
                    <NavLink to={item.request_child}>
                        {html}
                    </NavLink>
                </Menu.Item>
            )

        })

    }

    render() {
        return (
            <Menu theme="light"
                  defaultOpenKeys={this.state.defaultOpenKeys}
                  // selectedKeys={this.state.curSelectedMenuKey}
                  defaultSelectedKeys={this.state.defaultSelectedKeys}
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
    return {
        menuName:state.menuName,
        // list:state.list
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        changeInputValue(e){
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