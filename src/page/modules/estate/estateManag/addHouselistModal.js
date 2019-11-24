import React from 'react'
import { Form,Switch,Input,Select,DatePicker,Tabs } from 'antd'

const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
const { TextArea } = Input;
const { TabPane } = Tabs;
class AddHouselistModal extends React.Component{
    state = {
        tabsActiveKey:'1',
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
        this.setState({item: item})
        console.log('item--->', this.state.item)
    }
    callback=(key)=>{
        this.setState({tabsActiveKey:key})
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
        return (
            <div>
                <Form layout="horizontal" >

                    <Tabs defaultActiveKey="1" activeKey={this.state.tabsActiveKey}  onChange={this.callback} >
                        <TabPane tab="楼盘信息" key="1">
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
                            {/*<FormItem*/}
                                {/*{...formItemLayout}*/}
                                {/*label="状态"*/}
                                {/*colon={true}*/}
                                {/*className="item-box"*/}
                            {/*>*/}
                                {/*{getFieldDecorator('status', {*/}
                                    {/*initialValue: (this.state.item && this.state.item.status )|| '',*/}
                                    {/*rules: [{*/}
                                        {/*required: false,*/}
                                    {/*}],*/}
                                {/*})(*/}
                                    {/*<Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={this.state.item.status ==='1' ? true:false} />*/}
                                {/*)}*/}
                            {/*</FormItem>*/}
                            <FormItem
                                {...formItemLayout}
                                label="所属区域"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('names', {
                                    initialValue: (this.state.item && this.state.item.names )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="所属区域" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="价格"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('price', {
                                    initialValue: (this.state.item && this.state.item.price )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="广告位高度" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="价格单位"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('price_unit', {
                                    initialValue: (this.state.item && this.state.item.price_unit )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="价格单位" />
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
                                    <Input type="text"  placeholder="销售状态" />
                                )}
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="开发商"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('developer_id', {
                                    initialValue: (this.state.item && this.state.item.developer_id )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="开发商" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="经纪人"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('broker_id', {
                                    initialValue: (this.state.item && this.state.item.broker_id )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="经纪人" />
                                )}
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="缩略图"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('img', {
                                    initialValue: (this.state.item && this.state.item.img )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="缩略图" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="坐标"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('lng', {
                                    initialValue: (this.state.item && this.state.item.lng )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="坐标" />
                                )}
                            </FormItem>
                            {/*<FormItem*/}
                                {/*{...formItemLayout}*/}
                                {/*label="开盘时间"*/}
                                {/*colon={true}*/}
                                {/*className="item-box"*/}
                            {/*>*/}
                                {/*{getFieldDecorator('opening_time', {*/}
                                    {/*initialValue: (this.state.item && this.state.item.opening_time )|| '',*/}
                                    {/*rules: [{*/}
                                        {/*required: false,*/}
                                    {/*}],*/}
                                {/*})(*/}
                                    {/*// <Input type="text"  placeholder="开盘时间" />*/}
                                    {/*<DatePicker showTime placeholder="Select Time" style={{width:'100%'}}  />*/}
                                {/*)}*/}
                            {/*</FormItem>*/}
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
                            {/*<FormItem*/}
                                {/*{...formItemLayout}*/}
                                {/*label="交房时间"*/}
                                {/*colon={true}*/}
                                {/*className="item-box"*/}
                            {/*>*/}
                                {/*{getFieldDecorator('complete_time', {*/}
                                    {/*initialValue: (this.state.item && this.state.item.complete_time )|| '',*/}
                                    {/*rules: [{*/}
                                        {/*required: false,*/}
                                    {/*}],*/}
                                {/*})(*/}
                                    {/*<DatePicker showTime placeholder="Select Time" style={{width:'100%'}}  />*/}
                                {/*)}*/}
                            {/*</FormItem>*/}
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
                                label="已报名看房人数"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('see_number', {
                                    initialValue: (this.state.item && this.state.item.see_number )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="已报名看房人数" />
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
                        </TabPane>
                        <TabPane tab="配套信息" key="2">
                            <FormItem
                                {...formItemLayout}
                                label="楼盘介绍"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('audio', {
                                    initialValue: (this.state.item && this.state.item.audio )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="楼盘介绍" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="楼盘介绍"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('audio', {
                                    initialValue: (this.state.item && this.state.item.audio )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="楼盘介绍" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="楼盘介绍"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('audio', {
                                    initialValue: (this.state.item && this.state.item.audio )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="楼盘介绍" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="楼盘介绍"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('audio', {
                                    initialValue: (this.state.item && this.state.item.audio )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="楼盘介绍" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="楼盘介绍"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('audio', {
                                    initialValue: (this.state.item && this.state.item.audio )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="楼盘介绍" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="楼盘介绍"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('audio', {
                                    initialValue: (this.state.item && this.state.item.audio )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="楼盘介绍" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="楼盘介绍"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('audio', {
                                    initialValue: (this.state.item && this.state.item.audio )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="楼盘介绍" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="楼盘介绍"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('audio', {
                                    initialValue: (this.state.item && this.state.item.audio )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="楼盘介绍" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="楼盘介绍"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('audio', {
                                    initialValue: (this.state.item && this.state.item.audio )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="楼盘介绍" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="楼盘介绍"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('audio', {
                                    initialValue: (this.state.item && this.state.item.audio )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="楼盘介绍" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="楼盘介绍"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('audio', {
                                    initialValue: (this.state.item && this.state.item.audio )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="楼盘介绍" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="楼盘介绍"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('audio', {
                                    initialValue: (this.state.item && this.state.item.audio )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="楼盘介绍" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="楼盘介绍"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('audio', {
                                    initialValue: (this.state.item && this.state.item.audio )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="楼盘介绍" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="楼盘介绍"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('audio', {
                                    initialValue: (this.state.item && this.state.item.audio )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="楼盘介绍" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="楼盘介绍"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('audio', {
                                    initialValue: (this.state.item && this.state.item.audio )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="楼盘介绍" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="楼盘介绍"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('audio', {
                                    initialValue: (this.state.item && this.state.item.audio )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="楼盘介绍" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="楼盘介绍"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('audio', {
                                    initialValue: (this.state.item && this.state.item.audio )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="楼盘介绍" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="楼盘介绍"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('audio', {
                                    initialValue: (this.state.item && this.state.item.audio )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="楼盘介绍" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="楼盘介绍"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('audio', {
                                    initialValue: (this.state.item && this.state.item.audio )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="楼盘介绍" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="楼盘介绍"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('audio', {
                                    initialValue: (this.state.item && this.state.item.audio )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="楼盘介绍" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="楼盘介绍"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('audio', {
                                    initialValue: (this.state.item && this.state.item.audio )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="楼盘介绍" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="楼盘介绍"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('audio', {
                                    initialValue: (this.state.item && this.state.item.audio )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="楼盘介绍" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="楼盘介绍"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('audio', {
                                    initialValue: (this.state.item && this.state.item.audio )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="楼盘介绍" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="楼盘介绍"
                                colon={true}
                                className="item-box"
                            >
                                {getFieldDecorator('audio', {
                                    initialValue: (this.state.item && this.state.item.audio )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="楼盘介绍" />
                                )}
                            </FormItem>
                        </TabPane>
                    </Tabs>
                </Form>
            </div>
        )
    }
}
AddHouselistModal = Form.create()(AddHouselistModal);
export default AddHouselistModal;