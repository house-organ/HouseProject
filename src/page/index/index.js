import React from 'react'
import {Layout, Breadcrumb} from 'antd';
import './index.less'
import Headers from '../../components/header';
import Footers from '../../components/footer'
import Menu from '../../components/menu'

const {Content,  Sider} = Layout;
export default class Index extends React.Component{
    state = {
        collapsed: false,
        temperature:[], //标题
        breadcrumb:[],  //面包屑
        headItemKey:[] //顶部导航选中值
    };
    componentWillMount() {
    }
    toggle = () => { //左侧菜单缩放
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    handleTemp=(temperature)=> {
        let breadcrumb = temperature.map(item=>{
            return <Breadcrumb.Item key={item.key}>{item.title}</Breadcrumb.Item>
        })
        this.setState({
            breadcrumb:breadcrumb,
            temperature:temperature
        })
    }
    headItemSwitch(con){ //顶部导航模块切换
        console.log("handleTemp-->",con)
    }
    render(){

        return (
            <div>
                <Layout className="components-layout-demo-custom-trigger">
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}
                        className="left-box"
                    >
                        <div className="logo" >后台管理系统</div>
                        <Menu onMenuChange={this.handleTemp}  collapsed={this.state.collapsed} headItemSwitchKey={this.state.headItemKey}></Menu>
                    </Sider>
                    <Layout >

                        <Content className="main-content">
                            <Headers collapsed={this.state.collapsed} toggle={this.toggle} onSwitch={this.headItemSwitch.bind(this)}></Headers>
                            <Breadcrumb  className="breadcrumb-box">
                                {this.state.breadcrumb.length > 1 ? this.state.breadcrumb : <Breadcrumb.Item >控制台</Breadcrumb.Item> }
                            </Breadcrumb>
                            <div className="content-box" >
                                <div className="main-title">{this.state.temperature.length>1 ? this.state.temperature[1].title : '控制台'}</div>
                                <div className="main-box">
                                    {this.props.children}
                                </div>

                            </div>
                        </Content>
                        <Footers style={{ textAlign: 'center' }}></Footers>
                    </Layout>
                </Layout>
            </div>
        )
    }
}