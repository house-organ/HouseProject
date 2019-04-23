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
                tabs:'Tab1',
                content:'WebSetup'
            },
            {
                tabs:'Tab2',
                content:'weChatSetup'
            },
            {
                tabs:'Tab3',
                content:'watermarkSetup'
            },
            {
                tabs:'Tab4',
                content:'envelopeSetup'
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