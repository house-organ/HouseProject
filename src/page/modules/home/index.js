import React from 'react'
import {Button,Table,Popconfirm,Row, Col,List} from 'antd';
import './index.less'
// import showMsg from "../../../components/notification";
import axios from "../../../axios";

export default class Home extends React.Component{
    state = {
        data:[],
    }
    componentWillMount() {
        // this.showMsg.error("网络异常,请稍后再试 ");

        this.fetch()
    }
    fetch=()=>{
        axios.get("general/all",null,
            result=> {
                console.log("控制面板--------->",result.result)
                let obj = result.result ||[];
                let data = []
                for (let i in obj) {
                    let o = {};
                    o[i] = obj[i];
                    data.push(o)
                }
                console.log("data",data)

                // this.setState({data:data ||[]})
            },
            result=> {

            }
        );
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
                // render: (text, record) => {
                //     return (
                //         <div>
                //             <Button type="primary" onClick={this.addOrUpdate.bind(this,record)}>修改</Button>
                //             <Popconfirm placement="topRight" title={"您确定要删除该数据吗?"} onConfirm={this.handleClose.bind(this,record)} okText="确定" cancelText="取消">
                //                 <Button type="primary" style={{marginLeft: "10px"}}>删除</Button>
                //             </Popconfirm>
                //         </div>
                //     )
                // }
            }
        ];
        return (
            <div className="admin-content">
                {/*<Table columns={columns} dataSource={this.state.data} size="small" rowKey={(record) => record.id} />*/}
                <Row>
                    <Col span={12}>
                        {/*<List className="row-tabl-r"*/}
                            {/*size="small"*/}
                            {/*header={<div>假装我是个列表1</div>}*/}
                            {/*// footer={<div>Footer</div>}*/}
                            {/*bordered*/}
                            {/*dataSource={}*/}
                            {/*renderItem={item => (<List.Item>{}</List.Item>)}*/}
                        {/*/>*/}
                    </Col>
                    {/*<Col span={12}>*/}
                        {/*<List className="row-tabl-l"*/}
                            {/*size="small"*/}
                            {/*header={<div>假装我是个列表2</div>}*/}
                            {/*// footer={<div>Footer</div>}*/}
                            {/*bordered*/}
                            {/*dataSource={this.state.data}*/}
                            {/*renderItem={item => (<List.Item>{item.max_execution_time}的{item.safe_mode}</List.Item>)}*/}
                        {/*/>*/}
                    {/*</Col>*/}
                </Row>
            </div>
        )
    }
}