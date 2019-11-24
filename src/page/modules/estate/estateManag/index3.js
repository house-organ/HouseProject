import React from 'react'
import {Form,Button,Table,Popconfirm,Switch,Badge} from 'antd';
import axios from "../../../../axios";
import NotificationMixin from "../../../../components/notification";
import AddOrUpdateModal from './editModal' 
import AddOrUpdateModalChild from './editModalChild'
import ModalWrapper from "../../../../components/modalwrapper";
import './index.less'

const FormItem = Form.Item;
const createForm = Form.create;
let expandedRowRender;
//楼盘|户型管理
class MenuManage extends React.Component{
    state = {
        data:[],
    }
    componentWillMount() {
        this.fetch()
        
    }
    fetch=()=>{
        /**
         * 说明：楼盘列表接口方法
         * */
        axios.get("floor/list",null,
            result=> {
                result.result && result.result.map((item)=>{
                    item.advertisingType = '0' //给楼盘打上标识，区分楼盘还是户型
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
         * 说明：楼盘新增或编辑弹窗
         * */
        // e && e.preventDefault() ;
        // e && e.stopPropagation();
        //
        // new ModalWrapper(AddOrUpdateModal, "addOrUpdateModal", ()=> {
        //     this.fetch();
        // }, null, {
        //     title:  modal && modal.id  ? '编辑楼盘' : '新增楼盘',
        //     item: modal && modal.id ? modal : {},
        //     isEdit: modal && modal.id  ? true : false,
        // }).show();
        this.props.history.push({pathname:'/houseadd',state:modal})
    }
    addOrUpdateChild=(modal,e)=>{
        /**
         * 说明：户型新增或编辑弹窗
         * */
        e && e.preventDefault() ;
        e && e.stopPropagation();
        console.log("modal---->", modal)
        new ModalWrapper(AddOrUpdateModalChild, "addOrUpdateModalChild", ()=> {
            this.fetch();
        }, null, {
            title: modal.advertisingType === '1'  ? '编辑户型' : '新增户型',
            item: modal.advertisingType === '1' ? modal : {},
            isEdit: modal.advertisingType === '1'  ? true : false,
            house_title: modal.advertisingType === '1'?  modal.house_title : modal.title
        }).show();
    }
    goDetil=(modal,e)=>{
        let url = '/houselist/' + e
        this.props.history.push({pathname:url,state:modal})
    }
    handleDelete=(record)=> {
        /**
         * 说明：楼盘删除方法
         * */
        let param = {};
        param.id=record.id;
        console.log("record---",record);
        axios.delete("floor",param,
            result=> {
                NotificationMixin.success("删除成功！")
            },
            result=> {

            }
        );
    }
    handleDeleteChild=(record)=> {
        /**
         * 说明：户型删除方法
         * */
        let param = {};
        param.id=record.id;
        axios.delete("floor/type",param,
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
         * 说明：楼盘状态方法
         * */
        let param = {}
        param.id = record.id
        param.status = checked ? "1":"0"
        this.postFile("floor/update",param)

    }
    statusChangeChild=(record,checked)=>{
        /**
         * 说明：户型状态方法
         * */
        let param = {}
        param.id = record.id
        param.status = checked ? "1":"0"
        this.postFile("floor/type/update",param)

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
            axios.get("floor/type/list/"+record.id,null,
                result=> {
                    result.result && result.result.map((item)=>{
                        item.advertisingType = '1' //给户型打上标识，区分楼盘还是户型
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
                { title: '楼盘名称', dataIndex: 'house_title', key: 'house_title' },
                { title: '户型名称', dataIndex: 'title', key: 'title' },
                { title: '面积', dataIndex: 'acreage', key: 'acreage' },
                { title: '售价', dataIndex: 'price', key: 'price' },
                { title: '排序', dataIndex: 'ordid', key: 'ordid' },
                { title: '状态', dataIndex: 'status', key: 'status',
                    render:(text, record)=>{
                        return (<Switch checkedChildren="开" unCheckedChildren="关" onChange={this.statusChangeChild.bind(this,record)} defaultChecked={record['status']==='1' ? true:false} />)
                    }
                },
                { title: '状态名称', dataIndex: 'status_name', key: 'status_name', width: '6%',  },
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
            { title: '编号',dataIndex: 'id', key: 'id', width: '6%'},
            { title: '楼盘名称', dataIndex: 'title', key: 'title', width: '6%',  },
            { title: '所属区域', dataIndex: 'names', key: 'names', width: '6%',  },
            { title: '价格', dataIndex: 'price', key: 'price', width: '6%',  },
            { title: '价格单位', dataIndex: 'price_unit', key: 'price_unit', width: '6%',  },
            { title: '更新时间', dataIndex: 'update_time', key: 'update_time', width: '6%',  },
            { title: '排序', dataIndex: 'ordid', key: 'ordid', width: '6%',  },
            { title: '状态', dataIndex: 'status', key: 'status', width: '6%',
                render:(text, record)=>{
                    return (<Switch checkedChildren="开" unCheckedChildren="关" onChange={this.statusChange.bind(this,record)} defaultChecked={record['is_sys']==='1' ? true:false} />)
                }
            },
            { title: '状态名称', dataIndex: 'status_name', key: 'status_name', width: '6%',  },
            { title: '操作', key: '#', 
                render: (text, record) => {
                    let html = <Popconfirm placement="topRight" title={"您确定要删除该数据吗?"} onConfirm={this.handleDelete.bind(this,record)} okText="确定" cancelText="取消"><Button type="primary" style={{marginLeft: "10px"}}>删除</Button></Popconfirm>
                    return (
                        <div>
                            <Button type="primary"  onClick={this.goDetil.bind(this,record,'album')} style={{marginLeft: "10px"}}>相册</Button>
                            <Button type="primary"  onClick={this.goDetil.bind(this,record,'dynamic')} style={{marginLeft: "10px"}}>动态</Button>
                            <Button type="primary"  onClick={this.goDetil.bind(this,record,'sandTable')} style={{marginLeft: "10px"}}>沙盘</Button>
                            <Button type="primary"  onClick={this.addOrUpdate.bind(this,record)} style={{marginLeft: "10px"}}>修改</Button>
                            <Button type="primary"  onClick={this.addOrUpdateChild.bind(this,record)} style={{marginLeft: "10px"}}>添加户型</Button>
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

                        <Button type="primary" onClick={this.addOrUpdate.bind(this,'')}>添加楼盘</Button>
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