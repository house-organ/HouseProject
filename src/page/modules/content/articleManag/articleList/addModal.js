import React from 'react'
import {Form, Radio, Input, Select, Modal, Tabs, Row, Col, Button, Icon, message, Upload} from 'antd'
import axios from "../../../../../axios";
import NotificationMixin from "../../../../../components/notification";

const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
const { TextArea } = Input;
const { TabPane } = Tabs;
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="Create a new collection"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="Title">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Description">
                            {getFieldDecorator('description')(<Input type="textarea" />)}
                        </Form.Item>
                        <Form.Item className="collection-create-form_last-form-item">
                            {getFieldDecorator('modifier', {
                                initialValue: 'public',
                            })(
                                <Radio.Group>
                                    <Radio value="public">Public</Radio>
                                    <Radio value="private">Private</Radio>
                                </Radio.Group>,
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);

class CollectionsPage extends React.Component{
    state = {
        item:this.props.location.state || {},
        data: [],
        visible: false,
        typeData:[
            {id:'0', title: '楼盘资讯', key: '01'},
            {id:'1', title: '购房宝典', key: '02'},
            {id:'2', title: '房产百科', key: '03'},
            {id:'3', title: '楼盘导购', key: '04'},
            {id:'4', title: '优惠活动', key: '05'},
            {id:'5', title: '购房知识', key: '06'},
        ],
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
        this.fetch()
    }
    fetch=(id)=>{
        axios.get("floor/list",null,
            result=> {
                this.setState({
                    data:result.result || [],
                })
            },
            result=> {

            }
        );
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
        this.props.history.push({pathname:'/list'})
    }
    showModal = () => {
        console.log(111)
        this.setState({ visible: true });
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }

    handleCreate = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    }
    render(){
        const {history}=this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        const config = {
            rules: [{ type: 'object', required: false, message: 'Please select time!' }],
        };
        return (
            <Row>
                <Col xs={24} sm={24} md={24} lg={20} xl={16}>
                    <div className="form-box">
                        <Form layout="horizontal"  onSubmit={this.handleSubmit}>
                            <FormItem
                                {...formItemLayout}
                                label="楼盘名称"
                                colon={true}
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
                                    <Row>
                                        <Col span={18}><Input type="text"  placeholder="楼盘名称" /></Col>
                                        <Col span={6}><Button type="primary" onClick={this.showModal}>选择楼盘</Button></Col>
                                    </Row>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="所属分类"
                            >
                                {getFieldDecorator('price_unit', {
                                    initialValue: (this.state.item && this.state.item.price_unit )|| '',
                                    rules: [{
                                        required: true,
                                        message:'请选择价格单位'
                                    }],
                                })(
                                    <Select>
                                        <Option value=""> 所有 </Option>
                                        {
                                            this.state.typeData && this.state.typeData.map((item, index) => {
                                                return (<Option value={item.id} key={item.id}> {item.title} </Option>)
                                            })
                                        }
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="标题"
                                colon={true}
                            >
                                {getFieldDecorator('title', {
                                    initialValue: (this.state.item && this.state.item.title )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <Input type="text"  placeholder="标题" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="简介"
                                colon={true}
                            >
                                {getFieldDecorator('description', {
                                    initialValue: (this.state.item && this.state.item.description )|| '',
                                    rules: [{
                                        required: false,
                                    }],
                                })(
                                    <TextArea rows={4} placeholder="简介" />
                                )}
                            </FormItem>
                            <Form.Item
                                {...formItemLayout}
                                label="缩略图"
                                colon={true}
                            >
                                {getFieldDecorator('img', {
                                    initialValue: (this.state.data && this.state.data.img) || '',
                                    rules: [{
                                        // required: true,
                                        // validator: (rule, value, callback) => {
                                        //     if (!value || (value && value.length > 50)) {
                                        //         callback(new Error('不能为空且长度不超过50!'));
                                        //     } else {
                                        //         callback();
                                        //     }
                                        // }
                                    }],
                                })(
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        beforeUpload={beforeUpload}
                                        onChange={this.handleChange}
                                    >
                                        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                                    </Upload>
                                )}
                            </Form.Item>
                            <Form.Item>
                                <CollectionCreateForm
                                    wrappedComponentRef={this.saveFormRef}
                                    visible={this.state.visible}
                                    onCancel={this.handleCancel}
                                    onCreate={this.handleCreate}
                                />
                            </Form.Item>
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
CollectionsPage = Form.create()(CollectionsPage);
export default CollectionsPage;