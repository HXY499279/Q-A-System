import React, { Component } from 'react'

import {Input, Button} from 'antd';
export default class Rule extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li>R1: 每日登录，24:00 重置 <Input style={{width:50}}/></li>
                    <li>R2：提问一次，上限5次，24:00重置 <Input style={{width:50}}/></li>
                    <li>R3: 每日登录，24:00 重置 <Input style={{width:50}}/></li>
                    <li>R4：提问一次，上限5次，24:00重置 <Input style={{width:50}}/></li>
                    <li>R1: 每日登录，24:00 重置 <Input style={{width:50}}/></li>
                    <li>R2：提问一次，上限5次，24:00重置 <Input style={{width:50}}/></li>
                    <li>R3: 每日登录，24:00 重置 <Input style={{width:50}}/></li>
                    <li>R4：提问一次，上限5次，24:00重置 <Input style={{width:50}}/></li>
                </ul>
                <ul style={{backgroundColor:"#D2F1E3",padding:8,borderRadius:"3px"}}>
                    总积分 = <Input style={{width:50}}/> *R1 +
                             <Input style={{width:50}}/> *R1 +
                             <Input style={{width:50}}/> *R1 +
                             <Input style={{width:50}}/> *R1 
                </ul>
                <ul style={{textAlign:'center'}}>
                    <Button type="primary">保存</Button>
                    <Button type="primary" style={{marginLeft:'20px'}}>导出</Button>
                </ul>
            </div>
        )
    }
}
