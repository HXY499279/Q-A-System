import React, { Component } from 'react'
import './index.less'
import AdminTopbar from "../../../components/admin-topbar";
import { Table, Modal, Input, Button} from 'antd';
import { DatePicker } from 'antd';
import { SearchOutlined, DownloadOutlined  } from '@ant-design/icons';
import EditLog from './edit-log'
export default class Log extends Component {
    state = {
        logIsModalVisible: false,
        logDataSource:[
            {
                index: '01',
                account: '1668220',
                action: '提问',
                actionContent: '怎么能够不无聊',
                time: '2021-01-18 11:20',
                ip: '202.202.45.12',
            },
            {
                index: '02',
                account: '1669243	',
                action: '删除',
                actionContent: '怎么能够过科二',
                time: '2021-03-18 16:23',
                ip: '202.202.13.12'
            },
            {
              index: '03',
              account: '1669243	',
              action: '回答',
              actionContent: '拜托拜托，明天半期了',
              time: '2021-01-23 9:23',
              ip: '202.202.41.12'
          },
          {
            index: '04',
            account: '1669243	',
            action: '删除',
            actionContent: '请问这道题该怎么做？',
            time: '2021-02-18 16:34',
            ip: '202.202.56.12'
        },
        {
          index: '05',
          account: '1669243	',
          action: '回答',
          actionContent: 'x＜0的极限怎么求',
          time: '2021-01-28 15:00',
          ip: '202.202.43.23'
      },
      {
        index: '06',
        account: '1669243	',
        action: '删除',
        actionContent: '有大佬教教嘛? ',
        time: '2021-02-18 13:34',
        ip: '202.202.43.22'
    },
    {
      index: '07',
      account: '1669243	',
      action: '提问',
      actionContent: '求解，想知道一下分子应该处理？',
      time: '2021-02-28 19:23',
      ip: '202.202.42.12'
  }
        ]
    }
    //?时间选择器回调函数
    onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
      }
      
    onOk = (value) => {
        console.log('onOk: ', value);
      }
    //? 点击查看日志或添加日志回调函数
   showEditLog = (e) => {
    this.setState({logIsModalVisible:true})
    console.log(e)
    console.log('我点击了查看日志')
   }
   handleEdit = () => {
    this.setState({logIsModalVisible:false})
    }
    cancelEdit = () => {
        this.setState({logIsModalVisible:false})
    }
    render() {
        const logColumns = [
            {
                title: '序号',
                dataIndex: 'index',
                align: 'center'
              },
            {
                title: '账户',
                dataIndex: 'account',
                align: 'center'
              },
              {
                title: '动作',
                dataIndex: 'action',
                align: 'center'
              },
              {
                title: '动作内容',
                dataIndex: 'actionContent',
                align: 'center'
              },
              {
                title: '时间',
                dataIndex: 'time',
                align: 'center'
              },
              {
                title: 'IP',
                dataIndex: 'ip',
                align: 'center'
              },
              {
                title: '操作',
                dataIndex: '',
                render: (e) => (<a onClick={(e) => this.showEditLog(e)}>查看</a>),
                align: 'center'
              }
        ]
        const {logIsModalVisible} = this.state
        return (
            <div className="log-search">
                <AdminTopbar tag="学科管理" timeShow='false' />
                <div className="log-search-top">
                    <ul>
                        <li>账户：<Input style={{width:200}}/></li>
                        <li>动作：<Input style={{width:200}}/></li>
                        <li>时间： <DatePicker style={{width:200}} showTime onChange={this.onChange} onOk={this.onOk} /></li>
                    </ul>
                    <ul>
                        <Button type="primary" icon={<SearchOutlined />}>
                            搜索
                        </Button>
                        <Button type="primary" icon={<DownloadOutlined />} style={{marginLeft:30}}>
                            导出
                        </Button>   
                        <Button type="primary" icon={<DownloadOutlined />} style={{marginLeft:30}} onClick={(e) => this.showEditLog(e)}>
                            添加
                        </Button>   
                    </ul>    
                </div>
                <div className="log-search-list">
                  <Table 
                  bordered
                  align="center"
                  pagination={{ pageSize: 10 }} 
                  dataSource={this.state.logDataSource}
                  columns={logColumns} 
                  rowKey="index"/>
                </div>
                <Modal title="日志" visible={logIsModalVisible} onOk={this.handleEdit} onCancel={this.cancelEdit}>
                    <EditLog/>
                </Modal>
            </div>
        )
    }
}
