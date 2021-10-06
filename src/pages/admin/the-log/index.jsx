import React, { Component } from 'react'
import './index.less'
import AdminTopbar from "../../../components/admin-topbar";
import { Table, Modal, Input, Button,Select,Space} from 'antd';
import { DatePicker } from 'antd';
import { SearchOutlined, DownloadOutlined  } from '@ant-design/icons';
//?引入redux
import {logIdStore} from '@/redux/store' 
import {logId} from '@/redux/action'
//?引入请求函数
import {reqListLog,reqGetLogById} from '@/api/index'
import EditLog from './edit-log'
const { Option } = Select;
export default class Log extends Component {
    state = {
        timeType:"year",
        pageSize:10,
        total:null,
        logName:null,
        logTime:null,
        type:null,
        logIsModalVisible: false,
        logDataSource:[]
    }

    componentDidMount =  ()=> {
        let param = {
          currentPage:1,
          pageSize:this.state.pageSize
      }
      this.initLogTable(param)
    }


    //?初始化日志列表
    async initLogTable (param) {
      const res = await reqListLog(param);
      // console.log(res)
      const {list} = res.data;
      const {totalRows} = res.data.pageInfo
      this.setState({logDataSource:list,total:totalRows})
  }

  //?监听查询条件的变化
  logName = (e) => {
        if(e.target.value == ""){
                this.setState({
                    logName: null
                })
            }else{
                this.setState({
                    logName: e.target.value
                })
            } 
            // console.log(this.state.informContent)

    }

   //?动作类型
   handleChange = (value) => {
    if(value == ''){
        this.setState({
            type: null
        })
    }else{
        this.setState({
            type:Number(value)
        })
    }  
    console.log(`selected ${value}`);
  }

   //?设置时间选择器类型
     setType = (e) => {
        this.setState({
            timeType:e
        })
    }
    //? 时间选择器回调函数
    onChange = (date, dateStrings) => {
        console.log(dateStrings)
        if(dateStrings == '') {
            this.setState({
                logTime:null
            })
        }else{
            this.setState({
                logTime:dateStrings
            })
        }  
    }
    //?实现分页
    handleChangeLog = (value) => {
        const {
            logName,
            logTime,
            type
            } = this.state;
        let param = {
            currentPage:value.current,
            pageSize:value.pageSize,
            logName,
            logTime,
            type
        }
        this.initLogTable(param)
    }
    
    //?实现搜索
    logSearch = () => {
        const {
            pageSize,
            logName,
            logTime,
            type
            } = this.state;
        let param = {
            currentPage:1,
            pageSize,
            logName,
            logTime,
            type
        }
        this.initLogTable(param)

    }

    //? 点击查看日志或添加日志回调函数
   showEditLog = (e) => {
    logIdStore.dispatch(logId(e)) 
    this.setState({logIsModalVisible:true})
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
                title: '账户',
                dataIndex: 'adminName',
                align: 'center'
              },
              {
                title: '动作',
                dataIndex: 'type',
                render: (type) => (<span>{ type == 1 ? "增加" : type == 2 ? "删除" : type == 3 ? "修改" : "无" }</span>),
               
                align: 'center'
              },
              {
                title: '动作内容',
                render:text=>(<p dangerouslySetInnerHTML={{__html:text.substring(0,20)+"..."}}></p>),
                dataIndex: 'content',
                align: 'center'
              },
              {
                title: '时间',
                dataIndex: 'logTime',
                align: 'center'
              },
              {
                title: 'IP',
                dataIndex: 'ip',
                align: 'center'
              },
              {
                title: '操作',
                dataIndex: 'logId',
                render: (logId) => (<a onClick={() => this.showEditLog(logId)}>查看</a>),
                align: 'center'
              }
        ]
        const {logIsModalVisible,timeType,pageSize,total} = this.state
        return (
            <div className="log-search">
                <AdminTopbar tag="日志管理" timeShow='false' />
                <div className="log-search-top">
                    <ul>
                        <li>账户：<Input onChange={ e => this.logName(e)} style={{width:180}}/></li>
                        <li>动作：
                            <Select  style={{ width: 180 }} onChange={this.handleChange}>
                                <Option value="1">增加</Option>
                                <Option value="2">删除</Option>
                                <Option value='3'>修改</Option>
                                <Option value=''>全部</Option>
                            </Select>
                        </li>
                        <li>时间： 
                          <Space>
                                <Select defaultValue={timeType} onChange={this.setType}>
                                  <Option value="date">Date</Option>
                                  <Option value="month">Month</Option>
                                  <Option value="year">Year</Option>
                                </Select>               
                                <DatePicker picker={timeType} onChange={this.onChange} />
                          </Space>
                        </li>
                    </ul>
                    <ul>
                        <li>
                        <Button type="primary" onClick={this.logSearch} icon={<SearchOutlined />}>
                            搜索
                        </Button>
                        </li>
                        <a href="https://xscqa.cqupt.edu.cn/question/admin/exportExcel?type=7">
                            <Button type="primary" icon={<DownloadOutlined />}>
                              导出
                            </Button>
                        </a>    
                    </ul>    
                </div>
                <div className="log-search-list">
                  <Table 
                  bordered
                  align="center"
                  onChange={this.handleChangeLog}
                  pagination={{ "pageSize": pageSize,"total":total }} 
                  dataSource={this.state.logDataSource}
                  columns={logColumns} 
                  rowKey="logId"/>
                </div>
                <Modal title="日志" destroyOnClose footer={null} visible={logIsModalVisible} onOk={this.handleEdit} onCancel={this.cancelEdit}>
                    <EditLog/>
                </Modal>
            </div>
        )
    }
}
