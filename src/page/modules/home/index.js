import React from 'react'
import {Button,Table,Popconfirm,Row, Col,List} from 'antd';
import './index.less'
// import showMsg from "../../../components/notification";
import axios from "../../../axios";

let dataList =[
    {id:'1',title:'测试内容库1',companyid:'测试公司1',state:'0',},
    {id:'2',title:'测试内容库2',companyid:'测试公司2',state:'1',},
    {id:'3',title:'测试内容库3',companyid:'测试公司3',state:'0',},
    {id:'4',title:'测试内容库4',companyid:'测试公司4',state:'1',},
    {id:'5',title:'测试内容库5',companyid:'测试公司5',state:'0',},
]
export default class Home extends React.Component{
    state = {
        data:dataList || [],
        listData:[],
        param:{}
    }
    componentWillMount() {
        // this.showMsg.error("网络异常,请稍后再试 ");
        axios.get("topics",this.state.param,
            result=> {
                console.log("--------->",result)
                this.setState({listData:result.data ||[]})
            },
            result=> {

            }
        );
    }
    addOrUpdate=(e)=> {  //提交
        console.log("11111",e)
        return false
        // e && e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log("11111",values)
            if (!err) {
                // let { keyword } = values;
                // this.searchQuery(keyword);

                let params = {}
                params.title = values.title
                params.companyid = values.companyid
                console.log("values---",params);
                this.setState({param: params},this.fetch);
            }
        });
    }
    handleClose(record) {
        var that = this;
        if (!record) return;
        console.log("record---",record);
        return false
        this.post({
            url: "c509bd90a82719a3569291e12c24a6f1af4bac",
            param: {
                id: record.id
            },
            noLoading: true
        }).then(result=> {
            if (result.result) {
                that.success("操作成功");
                that.fetch();
            }
        });
    }
    render() {
        let columns = [
            { title: '编号',dataIndex: 'id', key: 'id', width: '6%'},
            { title: '内容库名称', dataIndex: 'title', key: 'title', width: '25%',  },
            { title: '公司名称',  dataIndex: 'companyid',key: 'companyid', width: '25%',
                // render: (text, record) => {
                //     return (record['companyid'] && companyList &&  companyList[record['companyid']])
                // }
            },
            { title: '状态', key: 'state', width: '10%',
                render: (text, record) => {
                    return (record.state===0 ? '启用 ':'未启用')
                }
            },
            { title: '操作', key: '#', width: '20%',
                render: (text, record) => {
                    return (
                        <div>
                            <Button type="primary" onClick={this.addOrUpdate.bind(this,record)}>修改</Button>
                            <Popconfirm placement="topRight" title={"您确定要删除该数据吗?"} onConfirm={this.handleClose.bind(this,record)} okText="确定" cancelText="取消">
                                <Button type="primary" style={{marginLeft: "10px"}}>删除</Button>
                            </Popconfirm>
                        </div>
                    )
                }
            }
        ];
        return (
            <div className="admin-content">
                <Table columns={columns} dataSource={this.state.data} size="small" rowKey={(record) => record.id} />
                <Row>
                    <Col span={12}>
                        <List className="row-tabl-r"
                            size="small"
                            header={<div>假装我是个列表1</div>}
                            // footer={<div>Footer</div>}
                            bordered
                            dataSource={this.state.listData}
                            renderItem={item => (<List.Item>{item.title}</List.Item>)}
                        />
                    </Col>
                    <Col span={12}>
                        <List className="row-tabl-l"
                            size="small"
                            header={<div>假装我是个列表2</div>}
                            // footer={<div>Footer</div>}
                            bordered
                            dataSource={this.state.data}
                            renderItem={item => (<List.Item>{item.title}的{item.companyid}</List.Item>)}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}