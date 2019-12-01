import React from 'react'
import {Modal, TreeSelect,Form,Input,Select,Icon} from 'antd';
import axios from "../../../../../axios";
import NotificationMixin from "../../../../../components/notification";

const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
const { TextArea } = Input;
const { TreeNode } = TreeSelect;

class editModal extends React.Component {
    state = {
        item:this.props.item || {},
        data:[
            {id:'0', title: '楼盘资讯', key: '01'},
            {id:'1', title: '购房宝典', key: '02'},
            {id:'2', title: '房产百科', key: '03'},
            {id:'3', title: '楼盘导购', key: '04'},
            {id:'4', title: '优惠活动', key: '05'},
            {id:'5', title: '购房知识', key: '06'},
        ],
        value: undefined,
    }
    componentWillMount() {
        // this.fetch()
    }
    treeSelectChange = value => {
        console.log(value);
        this.setState({ value });

    };
    fetch=()=>{
        /**
         * 说明：文章分裂父级树状选择器数据接口
         * */
        axios.get("menu/list",null,
            result=> {
                this.setState({data:result.result ||[]})
            },
            result=> {
            }
        );
    }
    hideModal=()=> {
        /**
         * 说明：弹窗关闭事件
         * */
        this.props.onCancel && this.props.onCancel();
    }
    handleSubmit=()=>{
        /**
         * 说明：表单提交事件
         * */
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            let url = "nav";
            let param = values;
            if (this.props.item.id) {
                url = "nav";
                param.id = this.props.item.id;
                if(param.is_sys === !!param.is_sys){
                    param.is_sys ? param.is_sys = 1 : param.is_sys = 0
                }
            }
            this.postFile(url,param)
        })
    }
    postFile=(url,param)=>{
        axios.post(url,param,
            result=> {
                NotificationMixin.success("修改成功！")
                this.props.onManualClose && this.props.onManualClose();
            },result=>{
                NotificationMixin.error("修改失败！")
            }
        );

    }
    treeNodeOne=(dataList)=>{
        /**
         * 说明：父级ID树选择器方法
         * */
        let treeNodeOne = [];
         dataList.map(item=>{
             if(item.children){
                 treeNodeOne.push(
                     <TreeNode value={item.id} title={item.title} key={item.id} >
                         {this.treeNodeOne(item.children)}
                     </TreeNode>
                 )
             }else {
                 treeNodeOne.push(<TreeNode value={item.id} title={item.title} key={item.id} />)
             }
        })
        return treeNodeOne
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 18 },
        };

        return(
            <Modal
                title={this.props.title}
                visible={true}
                maskClosable={false}
                onOk={this.handleSubmit}
                onCancel={this.hideModal}
                width={680}
            >
                <Form  layout="horizontal" >
                    <FormItem
                        {...formItemLayout}
                        label="分类名称："
                    >
                        {getFieldDecorator('names', {
                            initialValue: (this.state.item && this.state.item.names) || '',
                            rules: [{
                                required: true,
                                validator: (rule, value, callback) => {
                                    if (!value || (value && value.length > 50)) {
                                        callback(new Error('不能为空且长度不超过50!'));
                                    } else {
                                        callback();
                                    }
                                }
                            }],
                        })(
                            <Input type="text"  placeholder="分类名称" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="分类别名："
                    >
                        {getFieldDecorator('alias', {
                            initialValue: (this.state.item && this.state.item.alias) || '',
                            rules: [{
                                required: true,
                                validator: (rule, value, callback) => {
                                    if (!value || (value && value.length > 50)) {
                                        callback(new Error('不能为空且长度不超过50!'));
                                    } else {
                                        callback();
                                    }
                                }
                            }],
                        })(
                            <Input type="text"  placeholder="分类别名" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="父id："
                    >
                        {getFieldDecorator('pid', {
                            initialValue: (this.state.item && this.state.item.id) || '',
                            rules: [{
                                required: true,
                                message:'请选择父id'
                            }],
                        })(
                            <TreeSelect
                                showSearch
                                style={{ width: '100%' }}
                                // value={this.state.value}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                placeholder="Please select"
                                allowClear
                                treeDefaultExpandAll
                                onChange={this.onChange}
                            >
                                <TreeNode value="" title="请选择父id" key="0" />
                                {this.treeNodeOne(this.state.data)}
                            </TreeSelect>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="所有父级id"
                    >
                        {getFieldDecorator('spid', {
                            initialValue: (this.state.item && this.state.item.spid) || '',
                            rules: [{
                                required: true,
                                message:'请选择父id'
                            }],
                        })(
                            <TreeSelect
                                showSearch
                                style={{ width: '100%' }}
                                // value={this.state.value}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                placeholder="Please select"
                                allowClear
                                treeDefaultExpandAll
                                onChange={this.onChange}
                            >
                                <TreeNode value="" title="请选择父id" key="0" />
                                {this.treeNodeOne(this.state.data)}
                            </TreeSelect>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="seo标题："
                    >
                        {getFieldDecorator('seo_title', {
                            initialValue: (this.state.item && this.state.item.seo_title )|| '',
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Input type="text"  placeholder="seo标题" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="seo关键词"
                    >
                        {getFieldDecorator('seo_keys', {
                            initialValue: (this.state.item && this.state.item.seo_keys )|| '',
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Input type="text"  placeholder="seo关键词" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="seo描述"
                    >
                        {getFieldDecorator('seo描述', {
                            initialValue: (this.state.item && this.state.item.seo描述 )|| '',
                            rules: [{
                                required: false,
                            }],
                        })(
                            <TextArea rows={4} placeholder="SEO描述" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="排序："
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
                </Form>
            </Modal>
        )
    }
}
editModal = createForm()(editModal);
export default editModal;