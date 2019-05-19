import React from 'react'
// import { Redirect } from 'react-router-dom';
import {Card, Form, Input, Button, Checkbox,notification } from 'antd';
import './index.less'
import axios from "../../axios";

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};
const formTailLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18, offset: 6 },
};

class login extends React.Component{
    state = {
        checkNick: true, //是否记住帐号状态
    }
    componentWillMount(){
        //location.href = 'main/index.html';
    }
    handleSubmit = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log("values---",values)









            if (!err) {
                // let { keyword } = values;
                // this.searchQuery(keyword);
                axios.post("token/app",values,
                    result=> {
                        console.log("登录--------->",result)
                        if(result.result){
                            let token = result.result.token;
                            localStorage.setItem('token', JSON.stringify(token)); //token缓存
                            window.location.href = '/#/home';
                        }

                    },
                    result=> {
                        notification.open({
                            message: '提示',
                            description: '帐号或密码错误！',
                            onClick: () => {
                                console.log('Notification Clicked!');
                            },
                        });
                    }
                );






                // this.setState({pagination: pager,param: params},this.fetch);
            }
        });
    }

    handleChange = (e) => {
        this.setState({
            checkNick: e.target.checked,
        }, () => {
            this.props.form.validateFields(['nickname'], { force: true });

        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <div className='login-con'>
                <div className='login-main'>
                    <div className='login-box'>
                        <Card title="测试" className='login-box' bordered={false}>
                            <Form onSubmit={this.handleSubmit} autoComplete="off">
                                <Form.Item {...formItemLayout} label="帐号">
                                    {getFieldDecorator('ac', {
                                        rules: [{
                                            required: true,
                                            message: 'Please input your name',
                                        }],
                                    })(
                                        <Input placeholder="Please input your name" />
                                    )}
                                </Form.Item>
                                <Form.Item {...formItemLayout} label="密码">
                                    {getFieldDecorator('se', {
                                        rules: [{
                                            required: this.state.checkNick,
                                            message: 'Please input your password',
                                        }],
                                    })(
                                        <Input type="password" placeholder="Please input your nickname" />
                                    )}
                                </Form.Item>
                                <Form.Item {...formTailLayout}>
                                    <Checkbox
                                        checked={this.state.checkNick}
                                        onChange={this.handleChange}
                                    >
                                        记住登录状态
                                    </Checkbox>
                                </Form.Item>
                                <Form.Item {...formTailLayout}>
                                    <Button type="primary" htmlType="submit" >
                                        登录
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}
login = Form.create()(login);
export default login;