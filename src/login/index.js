import React from 'react'
import {Card, Form, Input, Button, Checkbox} from 'antd';
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
    check = () => {
        this.props.form.validateFields(
            (err) => {
                if (!err) {
                    console.info('success');
                }
            },
        );
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
            <div className='login-main'>
                <div className='login-box'>
                    <Card title="测试" className='login-box' bordered={false}>
                        <Form.Item {...formItemLayout} label="Name">
                            {getFieldDecorator('username', {
                                rules: [{
                                    required: true,
                                    message: 'Please input your name',
                                }],
                            })(
                                <Input placeholder="Please input your name" />
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Nickname">
                            {getFieldDecorator('nickname', {
                                rules: [{
                                    required: this.state.checkNick,
                                    message: 'Please input your nickname',
                                }],
                            })(
                                <Input placeholder="Please input your nickname" />
                            )}
                        </Form.Item>
                        <Form.Item {...formTailLayout}>
                            <Checkbox
                                checked={this.state.checkNick}
                                onChange={this.handleChange}
                            >
                                Nickname is required
                            </Checkbox>
                        </Form.Item>
                        <Form.Item {...formTailLayout}>
                            <Button type="primary" onClick={this.check}>
                                Check
                            </Button>
                        </Form.Item>
                    </Card>
                </div>
            </div>
        )
    }
}
login = Form.create()(login);
export default login;