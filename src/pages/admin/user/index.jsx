import React, { Component } from 'react'
import AdminTopbar from "../../../components/admin-topbar";
import { Table, Modal, Input, Button, Select, DatePicker} from 'antd';


import { SearchOutlined, DownloadOutlined  } from '@ant-design/icons';
import './index.less'
const { Option } = Select;
export default class User extends Component {
    state = {
        identity: '超级管理员',
        userDataSource: [
            {
                index: '01',
                name: 'aqiuya',
                academy: '经济管理学院',
                role: '志愿者',
            }
        ]
    }
    handleChange = (value) => {
        console.log(`selected ${value}`);
      }
    render() {
        const userColumns = [
            {
                title: '序号',
                dataIndex: 'index',
                align: 'center'
              },
            {
                title: '姓名',
                dataIndex: 'name',
                align: 'center'
              },
              {
                title: '所属学院',
                dataIndex: 'academy',
                align: 'center'
              },
              {
                title: '角色',
                dataIndex: 'role',
                render: (text) => {
                    if (this.state.identity == "超级管理员") {
                        return (
                            <>
                            <Select defaultValue={text} style={{ width: 120 }} onChange={this.handleChange}>
                               <Option value="教师">教师</Option>
                               <Option value="管理员">管理员</Option>
                               <Option value="志愿者">志愿者</Option>
                           </Select>
                       </>
                        )
                    } else {
                        return (<a>{text}</a>)
                    }
                },
                align: 'center'
              },
              {
                title: '操作',
                dataIndex: '',
                render: (e) => (<><a>刷新</a> <a>删除</a></>),
                align: 'center'
              }
        ]
        return (
            <div className="user-search">
                <AdminTopbar tag="学科管理" timeShow='false' />
                <div className="user-search-top">
                    <ul>
                        <li>学科名称：<Input style={{width:200}}/></li>
                        <li>所属学院：<Input style={{width:200}}/></li>
                    </ul>
                    <ul>
                        <Button type="primary" icon={<SearchOutlined />}>
                            搜索
                        </Button>
                        <Button type="primary" icon={<DownloadOutlined />} style={{marginLeft:30}}>
                            导出
                        </Button>    
                    </ul>    
                </div>
                <div className="user-search-list">
                <Table 
                bordered
                align="center"
                pagination={{ pageSize: 10 }} 
                dataSource={this.state.userDataSource}
                columns={userColumns} 
                rowKey="index"/>
                </div>
            </div>
        )
    }
}
