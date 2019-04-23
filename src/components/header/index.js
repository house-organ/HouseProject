import React from 'react'

import {
    Layout, Menu,Row, Col,Dropdown, Icon
} from 'antd';
import './index.less'
import axios from "../../axios";



const { Header } = Layout;

export default class Headers extends React.Component{
    state = {
        data:[]
    }
    componentWillMount(){
        this.fetch()
    }
    fetch=()=>{
        axios.get("menu/all",null,
            result=> {
                console.log("顶部导航--------->",result)
                this.setState({data:result.result ||[]})
            },
            result=> {

            }
        );
    }
    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <a  rel="noopener noreferrer" href="#/">退出</a>
                </Menu.Item>
            </Menu>
        );
        return (
            <Header className="header header-box" >
                <Row>

                    <Col span={12}>
                        <Menu
                            theme="light"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{ lineHeight: '62px',border:'none' }}
                        >
                            {
                                this.state.data && this.state.data.map(item=>{
                                    return(<Menu.Item key={item.id}><span><Icon type={item.icon} /><span>{item.title}</span></span></Menu.Item>)
                                })
                            }
                        </Menu>

                    </Col>
                    <Col span={12}>
                        <div className="user-info">
                            <Dropdown overlay={menu}>
                                <span className="ant-dropdown-link">
                                    HoverMe <Icon type="down" />
                                </span>
                            </Dropdown>
                        </div>
                    </Col>
                </Row>

            </Header>
        )
    }
}