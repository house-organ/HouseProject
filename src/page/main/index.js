import React from 'react'
import {
    Layout,  Breadcrumb, Icon,Button
} from 'antd';
import './index.less'
import Headers from '../../components/header';
import Footers from '../../components/footer'
import Menus from '../../components/menu'
import Home from '../modules/home'

const { Content, Sider } = Layout;



export default class main extends React.Component{
    state= {

    }
    render(){
        return (
            <Layout>

                <Headers></Headers>
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
                            <Home></Home>
                        </Content>
                        <Footers></Footers>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}