import React from 'react'
import { Modal, Input, Button,Table ,Tabs } from 'antd';
import './index.less'
import WebSetup from './webSetup'
import WeChatSetup from './weChatSetup'
import WatermarkSetup from './watermarkSetup'
import EnvelopeSetup from './envelopeSetup'

const TabPane = Tabs.TabPane;

export default class UserManage extends React.Component{
    state = {
        headerTabs:[
            {
                tabs:'站点设置',
                content:'WebSetup'
            },
            {
                tabs:'短信设置',
                content:'weChatSetup'
            },
            {
                tabs:'水印设置',
                content:'watermarkSetup'
            },
            {
                tabs:'微信设置',
                content:'envelopeSetup'
            },
            {
                tabs:'云存储设置',
                content:''
            },
        ]
    };

    callback=(key)=> {
        console.log(key);
    }

    render(){

        return(
            <div className="admin-content">
                <Tabs onChange={this.callback} type="card">
                    {
                        this.state.headerTabs && this.state.headerTabs.map((item,index)=>{
                            let content
                            if(item.content=='WebSetup'){
                                content = <WebSetup></WebSetup>
                            }else if(item.content=='weChatSetup'){
                                content = <WeChatSetup></WeChatSetup>
                            }else if(item.content=='watermarkSetup'){
                                content = <WatermarkSetup></WatermarkSetup>
                            }else if(item.content=='envelopeSetup'){
                                content = <EnvelopeSetup></EnvelopeSetup>
                            }
                            return(
                                <TabPane tab={item.tabs} key={index}>{content}</TabPane>
                            )
                        })
                    }
                </Tabs>
            </div>
        )
    }
}