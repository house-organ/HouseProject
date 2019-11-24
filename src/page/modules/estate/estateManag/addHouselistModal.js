import React from 'react'
import { Form,Switch,Input,Select,DatePicker,Tabs,Row, Col,Button } from 'antd'
import './index.less'
import axios from "../../../../axios";
import NotificationMixin from "../../../../components/notification";

const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
const { TextArea } = Input;
const { TabPane } = Tabs;
class AddHouselistModal extends React.Component{
    state = {
        item:this.props.location.state || {}
    }
    componentWillMount(){
        let item = this.props.location.state;
        // if(item){
        //     localStorage.setItem('addHouse', JSON.stringify(item));
        // }else {
        //     let addHouse = localStorage.getItem('addHouse', JSON.parse(addHouse));
        //     this.setState({item:addHouse})
        //     console.log("111",addHouse)
        // }
        this.setState({item:item})
        console.log('item--->', this.state.item)
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!!err) {
                console.log('Received values of form: ', values);
                return
            }
            let url = "floor/add";
            let param = values;


            if (this.props.item) {
                url = "floor/update";
                param.id = this.props.item.id;
                if(param.is_sys === !!param.is_sys){
                    param.is_sys ? param.is_sys = 1 : param.is_sys = 0
                }
            }
            this.postFile(url,param)
        });
    }
    postFile=(url,param)=>{
        axios.post(url,param,
            result=> {
                // console.log("修改成功--------->",result)
                NotificationMixin.success("保存成功！")
                this.props.history.push({pathname:'/houselist'})
            },result=>{
                NotificationMixin.error("保存失败！")
            }
        );
    }
    goBack=(modal,e)=>{
        this.props.history.push({pathname:'/houselist',state:modal})
    }
    render(){
        const {history}=this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
        const config = {
            rules: [{ type: 'object', required: false, message: 'Please select time!' }],
        };
        return (
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={18}>
                    <div className="form-box">
                        <Form layout="horizontal"  onSubmit={this.handleSubmit}>
                            <FormItem
                                {...formItemLayout}
                                label="楼盘名称"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('title', {
                                    initialValue: (this.state.item && this.state.item.title )|| '',
                                    rules: [{
                                        required: true,
                                        validator: (rule, value, callback) => {
                                            if (!value || (value && value.length > 50)) {
                                                callback(new Error('不能为空且长度不超过50!'));
                                                this.setState({tabsActiveKey:'1'})
                                            } else {
                                                callback();
                                            }
                                        }
                                    }],
                                })(
                                    <Input type="text"  placeholder="楼盘名称" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="销售状态"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('sale_status', {
                                    initialValue: (this.state.item && this.state.item.sale_status )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={(this.state.item && this.state.item.sale_status === '1' ) ? true:false} />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="开发商名称"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('developer_name', {
                                    initialValue: (this.state.item && this.state.item.developer_name )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="开发商名称" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="楼盘均价"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('price', {
                                    initialValue: (this.state.item && this.state.item.price )|| '',
                                    rules: [{
                                        required: true,
                                        validator: (rule, value, callback) => {
                                            if (!value || (value && value.length > 50)) {
                                                callback(new Error('不能为空且长度不超过50!'));
                                                this.setState({tabsActiveKey:'1'})
                                            } else {
                                                callback();
                                            }
                                        }
                                    }],
                                })(
                                    <Input type="text"  placeholder="楼盘均价" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="价格单位"
                                className="item-box"
                            >
                                {getFieldDecorator('price_unit', {
                                    initialValue: (this.state.item && this.state.item.price_unit )|| '',
                                    rules: [{
                                        required: true,
                                        message:'请选择价格单位'
                                    }],
                                })(
                                    <Select>
                                        <Option value=""> 请选择价格单位 </Option>
                                        <Option value="1"> 1-元/㎡ </Option>
                                        <Option value="2"> 2-万/套 </Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="经度"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('lng', {
                                    initialValue: (this.state.item && this.state.item.lng )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="经度" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="纬度"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('lat', {
                                    initialValue: (this.state.item && this.state.item.lat )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="纬度" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="开盘时间"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('opening_time',config)(
                                    <DatePicker showTime placeholder="Select Time" style={{width:'100%'}}  />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="开盘备注"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('opening_time_memo', {
                                    initialValue: (this.state.item && this.state.item.opening_time_memo )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="开盘备注" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="交房时间"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('complete_time', config)(
                                    <DatePicker showTime placeholder="Select Time" style={{width:'100%'}}  />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="交房备注"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('complete_time_memo', {
                                    initialValue: (this.state.item && this.state.item.complete_time_memo )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="交房备注" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="售楼电话"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('sale_phone', {
                                    initialValue: (this.state.item && this.state.item.sale_phone )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="售楼电话" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="是否是优惠楼盘"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('is_discount', {
                                    initialValue: (this.state.item && this.state.item.is_discount )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="是否是优惠楼盘" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="优惠内容"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('discount', {
                                    initialValue: (this.state.item && this.state.item.discount )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="优惠内容" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="红包金额"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('red_packet', {
                                    initialValue: (this.state.item && this.state.item.red_packet )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="红包金额" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="楼盘地址"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('address', {
                                    initialValue: (this.state.item && this.state.item.address )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="楼盘地址" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="售楼处地址"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('sale_address', {
                                    initialValue: (this.state.item && this.state.item.sale_address )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="售楼处地址" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="预售证"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('license_key', {
                                    initialValue: (this.state.item && this.state.item.license_key )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="预售证" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="浏览量"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('hits', {
                                    initialValue: (this.state.item && this.state.item.hits )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="浏览量" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="单位"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('unit', {
                                    initialValue: (this.state.item && this.state.item.unit )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="单位" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="涨幅比"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('ratio', {
                                    initialValue: (this.state.item && this.state.item.ratio )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="涨幅比" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="是否推荐"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('rec_position', {
                                    initialValue: (this.state.item && this.state.item.rec_position )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="是否推荐" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="全景图地址"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('pano_url', {
                                    initialValue: (this.state.item && this.state.item.pano_url )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="全景图地址" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="视频地址"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('video', {
                                    initialValue: (this.state.item && this.state.item.video )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="视频地址" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="语音讲房地址"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('audio', {
                                    initialValue: (this.state.item && this.state.item.audio )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="语音讲房音频地址" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="排序"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('ordid', {
                                    initialValue: (this.state.item && this.state.item.ordid )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="排序" />
                                )}
                            </FormItem>
                            <Form.Item className="item-btn-box">
                                <Button onClick={this.goBack.bind(this,'')}>
                                    返回
                                </Button>
                                <Button type="primary" htmlType="submit">
                                    提交
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
        )
    }
}
AddHouselistModal = Form.create()(AddHouselistModal);
export default AddHouselistModal;