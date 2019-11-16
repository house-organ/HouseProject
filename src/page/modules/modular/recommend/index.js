import React from 'react'
import {Form,Button,Table,Popconfirm,Switch,Badge} from 'antd';
import axios from "../../../../axios";
import NotificationMixin from "../../../../components/notification";
import AddOrUpdateModal from './editModal'
import AddOrUpdateModalChild from './editModalChild'
import ModalWrapper from "../../../../components/modalwrapper";

const FormItem = Form.Item;
const createForm = Form.create;
let expandedRowRender;
//广告位管理
class MenuManage extends React.Component{
    state = {
        data:[],
    }
    componentWillMount() {
        this.fetch()

    }
    fetch=()=>{
        /**
         * 说明：广告位列表接口方法
         * */
        axios.get("/poster_space/list",null,
            result=> {
                result.result && result.result.map((item)=>{
                    item.advertisingType = '0' //给广告位打上标识，区分广告还是广告位
                })
                console.log('--->',result.result)
                this.setState({
                    data:result.result ||[]
                },this.nestedTable())
            },
        );
    }
    addOrUpdate=(modal,e)=> {
        /**
         * 说明：广告位新增或编辑弹窗
         * */
        e && e.preventDefault() ;
        e && e.stopPropagation();

        new ModalWrapper(AddOrUpdateModal, "addOrUpdateModal", ()=> {
            this.fetch();
        }, null, {
            title:  modal && modal.id  ? '编辑广告位' : '新增广告位',
            item: modal && modal.id ? modal : {},
            isEdit: modal && modal.id  ? true : false,
        }).show();
    }
    addOrUpdateChild=(modal,e)=>{
        /**
         * 说明：广告新增或编辑弹窗
         * */
        e && e.preventDefault() ;
        e && e.stopPropagation();
        new ModalWrapper(AddOrUpdateModalChild, "addOrUpdateModalChild", ()=> {
            this.fetch();
        }, null, {
            title: modal.advertisingType === '1'  ? '编辑广告' : '新增广告',
            item: modal.advertisingType === '1' ? modal : {},
            isEdit: modal.advertisingType === '1'  ? true : false,
        }).show();
    }
    handleDelete=(record)=> {
        /**
         * 说明：广告位删除方法
         * */
        let param = {};
        param.id=record.id;
        console.log("record---",record);
        axios.delete("poster_space",param,
            result=> {
                NotificationMixin.success("删除成功！")
            },
            result=> {

            }
        );
    }
    handleDeleteChild=(record)=> {
        /**
         * 说明：广告删除方法
         * */
        let param = {};
        param.id=record.id;
        axios.delete("poster",param,
            result=> {
                NotificationMixin.success("删除成功！")
            },
            result=> {

            }
        );
    }
    handleSubmit=()=>{
        /**
         * 说明：表头表单事件
         * */
    }
    statusChange=(record,checked)=>{
        /**
         * 说明：广告位是否预置菜单状态方法
         * */
        let param = {}
        param.id = record.id
        param.status = checked ? "1":"0"
        this.postFile("poster_space/update",param)

    }
    statusChangeChild=(record,checked)=>{
        /**
         * 说明：广告是否预置菜单状态方法
         * */
        let param = {}
        param.id = record.id
        param.status = checked ? "1":"0"
        this.postFile("poster",param)

    }
    postFile=(url,param)=>{
        axios.post(url,param,
            result=> {
                NotificationMixin.success("修改成功！")
            },
            result=> {

            }
        );
    }
    onExpand=(expanded, record)=>{
        console.log("expanded",expanded,record)
        if(expanded=== false){
            this.setState({
                subTabData:[]
            });
        }else{
            axios.get("/poster/look/"+record.id,null,
                result=> {
                    result.result && result.result.map((item)=>{
                        item.advertisingType = '1' //给广告打上标识，区分广告还是广告位
                    })
                    console.log("1----->",result.result)
                    this.setState({
                        subTabData: result.result || []
                    },this.nestedTable)
                }
            );
        }
    }
    nestedTable=()=>{
        expandedRowRender = (rowList) => {
            const columns = [
                { title: '编号',dataIndex: 'id', key: 'id'},
                { title: '广告名称', dataIndex: 'names', key: 'names' },
                { title: '类型', dataIndex: 'type_name', key: 'type_name' },
                { title: '城市', dataIndex: 'city_name', key: 'city_name' },
                { title: '广告位', dataIndex: 'poster_space_name', key: 'poster_space_name' },
                { title: '有效期开始时间', dataIndex: 'start_time', key: 'start_time' },
                { title: '有效期结束时间', dataIndex: 'end_time', key: 'end_time' },
                { title: '排序', dataIndex: 'ordid', key: 'ordid' },
                { title: '状态', dataIndex: 'status', key: 'status',
                    render:(text, record)=>{
                        return (<Switch checkedChildren="开" unCheckedChildren="关" onChange={this.statusChangeChild.bind(this,record)} defaultChecked={record['status']==='1' ? true:false} />)
                    }
                },
                {
                    title: '操作',
                    key: '#',
                    render: (text, record) =>{
                        let html = <Popconfirm placement="topRight" title={"您确定要删除该数据吗?"} onConfirm={this.handleDelete.bind(this,record)} okText="确定" cancelText="取消"><Button type="primary" style={{marginLeft: "10px"}}>删除</Button></Popconfirm>
                        return (
                            <div>
                                <Button type="primary"  onClick={this.addOrUpdateChild.bind(this,record)}>修改</Button>
                                {html}
                            </div>
                        )
                    }
                },
            ];
            return <Table columns={columns} dataSource={this.state.subTabData} pagination={false} rowKey={(record) => record.id} />;
        }

    }

    render(){
        const { getFieldDecorator } = this.props.form;
        let columns = [
            { title: '编号',dataIndex: 'id', key: 'id'},
            { title: '广告位名称', dataIndex: 'names', key: 'names', },
            { title: '广告类型', dataIndex: 'type', key: 'type' },
            { title: '广告位宽度', dataIndex: 'width', key: 'width'},
            { title: '广告位高度', dataIndex: 'height', key: 'height' },
            { title: '广告数量', dataIndex: 'items', key: 'items' },
            { title: '显示数量', dataIndex: 'display_num', key: 'display_num'},
            { title: '状态', dataIndex: 'status', key: 'status',
                render:(text, record)=>{
                    return (<Switch checkedChildren="开" unCheckedChildren="关" onChange={this.statusChange.bind(this,record)} defaultChecked={record['status']==='1' ? true:false} />)
                }
            },
            { title: '操作', key: '#',
                render: (text, record) => {
                    let html = <Popconfirm placement="topRight" title={"您确定要删除该数据吗?"} onConfirm={this.handleDelete.bind(this,record)} okText="确定" cancelText="取消"><Button type="primary" style={{marginLeft: "10px"}}>删除</Button></Popconfirm>
                    return (
                        <div>
                            <Button type="primary"  onClick={this.addOrUpdate.bind(this,record)} style={{marginLeft: "10px"}}>修改</Button>
                            <Button type="primary"  onClick={this.addOrUpdateChild.bind(this,record)} style={{marginLeft: "10px"}}>添加广告</Button>
                            {
                                // record.is_sys === '0' ? html :''
                                html
                            }

                        </div>
                    )
                }
            }
        ];
        return(
            <div className="admin-content">
                <div className="form-search">
                    <Form layout="inline" onSubmit={this.handleSubmit} autoComplete="off">
                        {/*<FormItem>*/}
                        {/*{*/}
                        {/*getFieldDecorator('title')(*/}
                        {/*<Input placeholder="请输入内容库名称" />*/}
                        {/*)*/}
                        {/*}*/}
                        {/*</FormItem>*/}
                        {/*<FormItem>*/}
                        {/*<Button type="primary" htmlType="submit">导航查询</Button>*/}
                        {/*</FormItem>*/}

                        <Button type="primary" onClick={this.addOrUpdate.bind(this,'')}>添加推荐位</Button>
                    </Form>
                </div>
                <Table
                    columns={columns}
                    expandedRowRender={expandedRowRender}
                    onExpand={this.onExpand}
                    bordered
                    rowKey={(record) => record.id}
                    dataSource={this.state.data}
                />
            </div>
        )
    }
}
MenuManage = Form.create()(MenuManage);
export default MenuManage;