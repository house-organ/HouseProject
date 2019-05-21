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
        defaultOpenKeys:[],//左侧菜单默认展开
        curSelectedMenuKey:[],//左侧菜单默认选中
        data:[], //左侧菜单数据
        param:'', //左侧菜单接口请求参数
        menuTreeNode:[]
    }
    componentWillMount(){


        let {menuName} = this.props; //顶部菜单初始选中参数
        console.log("左侧菜单默认加载参数----->",menuName)
        this.setState({
            param:menuName ||'',
        },this.fetch)
        console.log("-----左侧导航加载--222----",this.state.menuTreeNode)
        console.log("curSelectedMenuKey---",this.state.curSelectedMenuKey)
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        let  menuNames = nextProps.menuName
        let {menuName} = this.props
        console.log("redux菜单值-->",menuNames,menuName)
        if(menuName == menuNames){
            console.log("11111111")
            return true
        }else {
            // return true
            this.fetch()
        }
        console.log("---------->",menuName,nextState)
    }
    fetch=()=>{
        axios.get("menu/"+this.state.param,null,
            result=> {
                let menuData = result.result ||[];
                console.log("左侧菜单接口数据----",menuData)

                let menuList = this.readerMenu(menuData)
                console.log("menuList----11->",[menuData[0].leftChild[0].id])
                this.setState({
                    data:result.result ||[],
                    menuTreeNode:menuList,
                    defaultOpenKeys:[menuData[0].id],
                    curSelectedMenuKey:[menuData[0].leftChild[0].id]
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
                  // defaultSelectedKeys={['/home']}
                  selectedKeys={this.state.curSelectedMenuKey}
                  defaultSelectedKeys={['3']}
                  mode="inline"
                  onClick={this.onMenuClick}
                  style={{ border:'none',marginLeft: '-1px'}}
            >
                {this.state.menuTreeNode}
                {
                    console.log("-----左侧导航加载---111---",this.state.menuTreeNode)

                }
                {
                    console.log("-----左侧导航加载---333---",this.state.defaultOpenKeys)
                }
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