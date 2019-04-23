import React from 'react'
import { Tabs} from 'antd'
import './index.less'

import Basic from './basic'
import senior from './senior'

const TabPane = Tabs.TabPane;

export default class webSetup extends  React.Component{
    callback=(e)=>{

    }
    render() {

        return(
            <div className="tabs-box">
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="基本设置" key="1"><Basic></Basic></TabPane>
                    <TabPane tab="高级设置" key="2"><senior></senior></TabPane>
                </Tabs>
            </div>
        )
    }
}
