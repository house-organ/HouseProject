import React from 'react'
// import { Redirect } from 'react-router-dom';
import {Card, Form, Input, Button, Checkbox,notification } from 'antd';
import './index.less'

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};
const formTailLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16, offset: 6 },
};

class login extends React.Component{
    state = {
        checkNick: true,
    }
    componentWillMount(){
        console.log("11")
        //location.href = 'main/index.html';
    }
    check = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // let { keyword } = values;
                // this.searchQuery(keyword);

                let params = {username:'admin',password:'123456'}
                if(params.username===values.username && params.password === values.password){
                     /*  <Redirect to={{
                        // pathname: '/index',
                        // search: '?utm=your+face',
                        // state: { referrer: currentLocation }

                    // }}/>*/
                        console.log("params-----",params)
                    window.location.href = '/#/home';
                }else {
                    notification.open({
                        message: '提示',
                        description: '帐号或密码错误！',
                        onClick: () => {
                            console.log('Notification Clicked!');
                        },
                    });
                }

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
                            <Form.Item {...formItemLayout} label="帐号">
                                {getFieldDecorator('username', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input your name',
                                    }],
                                })(
                                    <Input placeholder="Please input your name" />
                                )}
                            </Form.Item>
                            <Form.Item {...formItemLayout} label="密码">
                                {getFieldDecorator('password', {
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
                                <Button type="primary" onClick={this.check}>
                                    登录
                                </Button>
                            </Form.Item>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}
login = Form.create()(login);
export default login;