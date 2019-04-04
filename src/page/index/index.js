import React from 'react'
import {
    Layout, Breadcrumb,
} from 'antd';
import './index.less'
import Headers from '../../components/header';
import Footers from '../../components/footer'
import Menus from '../../components/menu'

const {
     Content,  Sider,
} = Layout;
export default class Index extends React.Component{
    state = {
        collapsed: false,
        breadcrumb:[]
    };
    componentWillMount() {
        this.breadcrumb();
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    breadcrumb=()=>{
        let breadcrumb =["userCore", "userManage"]
        let breadcrumbItem = breadcrumb && breadcrumb.map((item)=>{
                                return (<Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>)
                            })
        this.setState({breadcrumb:breadcrumbItem})
    }
    render(){

        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                    className="menu-left"
                    style={{ background: '#fff', padding: 0 ,overflow: 'auto',position:'fixed',top:0, height: '100vh', }}
                >
                    <div className="logo" />
                    <Menus></Menus>
                </Sider>
                <Layout >
                    <Headers></Headers>
                    <Content style={{  marginTop: 64,marginLeft:200 }}>
                        <Breadcrumb style={{ margin: '6px 15px' }}>
                            {/*<Breadcrumb.Item>User</Breadcrumb.Item>*/}
                            {/*<Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
                            {this.state.breadcrumb}
                        </Breadcrumb>
                        <div className='modular-main'>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footers style={{ textAlign: 'center' }}></Footers>
                </Layout>
            </Layout>
        )
    }
}