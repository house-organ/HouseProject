import React from 'react'
import {Button,Table,Popconfirm,Row, Col,List,Comment, Tooltip,} from 'antd';
import axios from "../../../../axios";

import moment from 'moment';
export default class editModal extends React.Component {
    state = {
        data:{},
        replies:[],
        authorName:''
    }
    componentWillMount() {
        // console.log("this.props.match.params-----",this.props)
        let id = this.props.match.params.id;
        if(id){
            this.setState({
                data:{},
                replies:[],
                authorName:''
            },this.fetch(id))
            // this.fetch(id)
        }
    }
    fetch=(id)=>{
        axios.get("topic/"+id,null,
            result=> {
                console.log("----11----->",result.data.replies)
                this.setState({
                    data:result.data ||{},
                    authorName:result.data.author.loginname || '',
                    replies:result.data.replies || [],
                })
            },
            result=> {

            }
        );
    }
    render() {
        const contents = this.state.replies && this.state.replies.map((item)=>{
            return (
                item.content = item.content
                // item.author.loginname = item.author.loginname
            )
        })
        {
            console.log("contents---",contents)
        }
        return(
            <div>
                <p>{this.props.match.params.id}</p>
                <h1>{this.state.data.title}</h1>
                <p>作者： {this.state.authorName}    发表于：{this.state.data.create_at}</p>
                <div dangerouslySetInnerHTML={{__html:this.state.data.content}}>
                </div>
                <List
                    className="comment-list"
                    header={`${this.state.replies.length} replies`}
                    itemLayout="horizontal"
                    dataSource={this.state.replies}
                    renderItem={item => (
                        <Comment
                            // actions={item.actions}
                            author={item.author.loginname}
                            avatar={item.author.avatar_url}
                            content={item.content}
                            // content={}
                            datetime={item.create_at}
                        />
                    )}
                />
            </div>
        )
    }
}