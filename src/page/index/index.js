import React from 'react'
import {
    Layout,  Breadcrumb,
} from 'antd';
import './index.less'
import Headers from '../../components/header';
import Footers from '../../components/footer'
import Menus from '../../components/menu'
// import Home from '../modules/home'

const { Content, Sider } = Layout;


export default class Index extends React.Component{
    state= {

    }
    componentWillMount() {

    }

    render(){

        return (
            <Layout>
                <Headers>2323232</Headers>
                <Layout className='main-box'>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menus></Menus>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content style={{
                            background: '#fff', padding: 24, margin: 0, minHeight: 280,
                        }}
                        >
                            {/*<Home></Home>*/}
                            {this.props.children}
                        </Content>
                        <Footers></Footers>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}