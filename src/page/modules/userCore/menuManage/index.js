import React from 'react'
import {Button,Table,Popconfirm,} from 'antd';
import axios from "../../../../axios";
import {Link} from 'react-router-dom'
// import editModal from './editModal'

export default class MenuManage extends React.Component{
    state = {
        listData:[],
    }
    componentWillMount() {
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
        // console.log("11111",e)
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
        let that = this;
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
    render(){
        let columns = [
            { title: '编号',dataIndex: 'id', key: 'id', width: '6%'},
            { title: '标题', dataIndex: 'title', key: 'title', width: '25%',
                render: (text, record) => {
                    return (<Link to={"/userCore/menuManage/editModal/"+record['id']}>{record['title']}</Link>)
                }
            },
            { title: '作者', dataIndex: 'author.loginname', key: 'author.loginname', width: '6%',  },
            { title: '时间',  dataIndex: 'last_reply_at',key: 'last_reply_at', width: '25%',
                // render: (text, record) => {
                //     return (record['companyid'] && companyList &&  companyList[record['companyid']])
                // }
            },

            { title: '操作', key: '#', width: '20%',
                render: (text, record) => {
                    return (
                        <div>
                            <Button type="primary"  onClick={this.addOrUpdate.bind(this,record)}>修改</Button>
                            <Popconfirm placement="topRight" title={"您确定要删除该数据吗?"} onConfirm={this.handleClose.bind(this,record)} okText="确定" cancelText="取消">
                                <Button type="primary" style={{marginLeft: "10px"}}>删除</Button>
                            </Popconfirm>
                        </div>
                    )
                }
            }
        ];
        return(
            <div className="admin-content">
                <Table columns={columns} dataSource={this.state.listData} size="small" rowKey={(record) => record.id} />
            </div>
        )
    }
}
