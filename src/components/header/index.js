import React from 'react'

import {
    Layout, Menu,Row, Col,Dropdown, Icon
} from 'antd';
import './index.less'



const { Header } = Layout;

export default class Headers extends React.Component{

    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <a  rel="noopener noreferrer" >1st menu item</a>
                </Menu.Item>
                <Menu.Item>
                    <a  rel="noopener noreferrer" >2nd menu item</a>
                </Menu.Item>
                <Menu.Item>
                    <a  rel="noopener noreferrer" href="#/login">退出</a>
                </Menu.Item>
            </Menu>
        );
        return (
            <Header className="header" style={{ background: '#fff', padding: 0 }}>
                <Row>

                    <Col span={12}>
                        <Menu
                            theme="light"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1">nav 1</Menu.Item>
                            <Menu.Item key="2">nav 2</Menu.Item>
                            <Menu.Item key="3">nav 3</Menu.Item>
                        </Menu>

                    </Col>
                    <Col span={12}>
                        <div className="user-info">
                            <Dropdown overlay={menu}>
                                <a className="ant-dropdown-link">
                                    HoverMe <Icon type="down" />
                                </a>
                            </Dropdown>
                        </div>
                    </Col>
                </Row>

            </Header>
        )
    }
}