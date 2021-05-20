import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import AdminTopbar from "../../../components/admin-topbar";
//? antd
import { Table, Input, Button, DatePicker} from 'antd';
import { SearchOutlined, DownloadOutlined  } from '@ant-design/icons';
import './index.less'
const { TextArea } = Input;
export default class Message extends Component {
    state = {
        msgDataSource:[
            {
                index: '01',
                title: '开学季，迎新生',
                author: 'aqiuya',
                time: '2020-1-20',
                pageView: '489',
            }
        ]
    }
    //? 时间选择器回调函数
    onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
      }
    onOk = (value) => {
        console.log('onOk: ', value);
      }

      //?修改编辑的回调函数
      showEditMsg = (e) => {
        console.log(e)
        console.log('我点击了修改资讯')
      }

      //?查看资讯详情的回调函数
      goMsgDetail = (e) => {
          console.log(e)
      }
    render() {
        const msgColumns = [
            {
                title: '序号',
                dataIndex: 'index',
                width: '7%',
                align: 'center'
              },
            {
                title: '标题',
                dataIndex: 'title',
                render: (text) => (<Link to="/admin/messageDetail" onClick={(e) => this.goMsgDetail(e)}>{text}</Link>),
                align: 'center'
              },
              {
                title: '浏览量',
                dataIndex: 'pageView',
                width: '7%',
                align: 'center'
              },
              {
                title: '作者',
                dataIndex: 'author',
                width: '10%',
                align: 'center'
              },
              {
                title: '操作',
                dataIndex: '',
                width: '10%',
                render: (e) => (<><a onClick={(e) => this.showEditMsg(e)}>修改</a> <a>删除</a></>),
                align: 'center'
              }
        ];
        return (
            <div>
                <div className="msg-edit">
                    <AdminTopbar tag="资讯编辑" timeShow='false' />
                    <div className="msg-edit-content">
                        <ul>
                            <li>标题：<Input style={{width:600}}/></li>
                            <li>作者：<Input style={{width:180}}/></li>
                            <li><div>正文：</div><TextArea autoSize style={{width:'90%',margin:'-20px 0px 0px 40px'}}/></li>
                        </ul>
                        <div style={{textAlign:"center",padding:'30px'}}>
                            <Button type="primary">发布</Button>
                        </div>
                            
                    </div>
                </div>
                <div className="msg-search">
                    <AdminTopbar tag="资讯列表" timeShow='false' />
                    <div className="msg-search-top">
                        <ul>
                            <li>标题：<Input style={{width:200}}/></li>
                            <li>发布者：<Input style={{width:200}}/></li>
                            <li>时间：<DatePicker showTime onChange={this.onChange} onOk={this.onOk}/></li>  
                        </ul>
                        <ul>
                            <Button type="primary" icon={<SearchOutlined />}>
                                搜索
                            </Button>
                            <a href="http://202.202.43.250:8080/admin/exportExcel?type=3">
                                <Button type="primary" icon={<DownloadOutlined />}>
                                    导出
                                </Button>
                            </a> 
                        </ul>    
                    </div>
                    <div className="msg-search-list">
                    <Table 
                    bordered
                    align="center"
                    pagination={{ pageSize: 10 }} 
                    dataSource={this.state.msgDataSource}
                    columns={msgColumns} 
                    rowKey="index"/>
                    </div>
                         
                </div>
            </div>
        )
    }
}
