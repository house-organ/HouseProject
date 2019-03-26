import React from 'react'
import {
    Layout, Breadcrumb, Icon,
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
    };
    componentWillMount() {

    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render(){

        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                    className="menu-left"
                    style={{ background: '#fff', padding: 0 ,overflow: 'auto', height: '100vh', position: 'fixed', left: 0, }}
                >
                    <div className="logo" />
                    <div className="toggle">
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </div>
                    <Menus></Menus>
                </Sider>
                <Layout style={{ marginLeft: 200 }}>
                    <Headers></Headers>
                    <Content style={{  marginTop: 64 }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footers style={{ textAlign: 'center' }}></Footers>
                </Layout>
            </Layout>
        )
    }
}