import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import AdminTopbar from "../../../components/admin-topbar"

//?引入用户信息组件
import ProfileMsg from './profile-msg'

//?引入修改问题组件
import EditQuestion from './edit-question'

//? antd
import { Table, Modal, Input, Button, Select, DatePicker} from 'antd';

import { SearchOutlined, DownloadOutlined  } from '@ant-design/icons';
import './index.less'
const { Option } = Select;

export default class Question extends Component {
    state = {
        profileIsModalVisible: false,
        editIsModalVisible: false,
        questionDataSource: [
            {
                index: '01',
                title: '微积分怎么做',
                questioner: 'aqiuya',
                subject: '高数',
                academy: '经济管理学院',
                state: '未解决',
                time: '2020-1-20',
                answer: 'aqiiuya',
                collect: '23',
                inform: '01',
            },
            {
                index: '02',
                title: '微积分怎么做',
                questioner: 'aqiuya',
                subject: '高数',
                academy: '经济管理学院',
                state: '未解决',
                time: '2020-1-20',
                answer: 'aqiiuya',
                collect: '23',
                inform: '01',
            },
            {
                index: '03',
                title: '微积分怎么做',
                questioner: 'aqiuya',
                subject: '高数',
                academy: '经济管理学院',
                state: '未解决',
                time: '2020-1-20',
                answer: 'aqiiuya',
                collect: '23',
                inform: '01',
            },
            {
                index: '04',
                title: '微积分怎么做',
                questioner: 'aqiuya',
                subject: '高数',
                academy: '经济管理学院',
                state: '未解决',
                time: '2020-1-20',
                answer: 'aqiiuya',
                collect: '23',
                inform: '01',
            },
            {
                index: '05',
                title: '微积分怎么做',
                questioner: 'aqiuya',
                subject: '高数',
                academy: '经济管理学院',
                state: '未解决',
                time: '2020-1-20',
                answer: 'aqiiuya',
                collect: '23',
                inform: '01',
            },
            {
                index: '06',
                title: '微积分怎么做',
                questioner: 'aqiuya',
                subject: '高数',
                academy: '经济管理学院',
                state: '未解决',
                time: '2020-1-20',
                answer: 'aqiiuya',
                collect: '23',
                inform: '01',
            },
            {
                index: '07',
                title: '微积分怎么做',
                questioner: 'aqiuya',
                subject: '高数',
                academy: '经济管理学院',
                state: '未解决',
                time: '2020-1-20',
                answer: 'aqiiuya',
                collect: '23',
                inform: '01',
            },
            {
                index: '08',
                title: '微积分怎么做',
                questioner: 'aqiuya',
                subject: '高数',
                academy: '经济管理学院',
                state: '未解决',
                time: '2020-1-20',
                answer: 'aqiiuya',
                collect: '23',
                inform: '01',
            },
            {
                index: '09',
                title: '微积分怎么做',
                questioner: 'aqiuya',
                subject: '高数',
                academy: '经济管理学院',
                state: '未解决',
                time: '2020-1-20',
                answer: 'aqiiuya',
                collect: '23',
                inform: '01',
            },
            {
                index: '10',
                title: '微积分怎么做',
                questioner: 'aqiuya',
                subject: '高数',
                academy: '经济管理学院',
                state: '未解决',
                time: '2020-1-20',
                answer: 'aqiiuya',
                collect: '23',
                inform: '01',
            },
            {
                index: '11',
                title: '微积分怎么做',
                questioner: 'aqiuya',
                subject: '高数',
                academy: '经济管理学院',
                state: '未解决',
                time: '2020-1-20',
                answer: 'aqiiuya',
                collect: '23',
                inform: '01',
            }
        ],
        
    }

    //? 时间选择器回调函数
    onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
      }
    onOk = (value) => {
        console.log('onOk: ', value);
      }

    //?状态回调函数
    handleChange = (value) => {
        console.log(`selected ${value}`);
      }

    //?点击提问者
    showProfile = (e) => {
        this.setState({profileIsModalVisible:true})
        console.log(e)
        console.log('我点击了提问者')
    }
    handleProfile = () => {
        this.setState({profileIsModalVisible:false})
    }
    cancelProfile = () => {
        this.setState({profileIsModalVisible:false})
    }

    //?点击修改问题
    showEditQuesion = (e) => {
        this.setState({editIsModalVisible:true})
        console.log(e)
        console.log('我点击了修改问题')
    }
    handleEdit = () => {
        this.setState({editIsModalVisible:false})
    }
    cancelEdit = () => {
        this.setState({editIsModalVisible:false})
    }

    //?跳转问题详情页
    goQuestionDetail = (e) => {
        console.log(e)
        
    }

    
    render() {
        const questionColumns = [
            {
                title: '序号',
                dataIndex: 'index',
                align: 'center'
              },
            {
                title: '标题',
                dataIndex: 'title',
                align: 'center'
              },
              {
                title: '提问者',
                dataIndex: 'questioner',
                render: (text) => (<a onClick={(e) => this.showProfile(e)}>{text}</a>),
                align: 'center'
              },
              {
                title: '学科',
                dataIndex: 'subject',
                align: 'center'
              },
              {
                title: '学科所属学院',
                dataIndex: 'academy',
                align: 'center'
              },
              {
                title: '状态',
                dataIndex: 'state',
                align: 'center'
              },
              {
                title: '时间',
                dataIndex: 'time',
                align: 'center'
              },
              {
                title: '回答',
                dataIndex: 'answer',
                align: 'center'
              },
              {
                title: '收藏',
                dataIndex: 'collect',
                align: 'center'
              },
              {
                title: '举报',
                dataIndex: 'inform',
                align: 'center'
              },
              {
                title: '操作',
                dataIndex: '',
                render: (question) => (<><Link to="/admin/questionDetail" onClick={(e) => this.goQuestionDetail(e)}>查看</Link><a onClick={(e) => this.showEditQuesion(e)}>修改</a> <a>隐藏</a></>),
                align: 'center'
              }
          ]
        const {profileIsModalVisible, editIsModalVisible} = this.state
          
        return (
            <div className="question-msg">
                <AdminTopbar tag="问题管理" timeShow='false' />
                <div className="question-msg-search">
                    <div>
                        <ul>
                            <li>标题：<Input style={{width:180}}/></li>
                            <li>学科：<Input style={{width:180}}/></li>
                            <li>学院：<Input style={{width:180}}/></li>
                            <li>提问者：<Input style={{width:180}}/></li>
                        </ul>
                        <ul>
                            <li>状态： <Select  style={{ width: 180 }} onChange={this.handleChange}>
                                        <Option value="已解决">已解决</Option>
                                        <Option value="未解决">未解决</Option>
                                       </Select>
                            </li>
                            <li>时间： <DatePicker showTime onChange={this.onChange} onOk={this.onOk} /></li>
                            <li>回答者：<Input style={{width:180}}/></li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <Button type="primary" icon={<SearchOutlined />}>
                                搜索
                            </Button>
                        </ul>
                        <Button type="primary" icon={<DownloadOutlined />}>
                            导出
                        </Button>
                    </div>
                </div>
                <div className="question-msg-content">
                <Table 
                bordered
                align="center"
                pagination={{ pageSize: 10 }} 
                dataSource={this.state.questionDataSource}
                columns={questionColumns} 
                rowKey="index"/>
                </div>
                <Modal title="用户信息" visible={profileIsModalVisible} onOk={this.handleProfile} onCancel={this.cancelProfile}>
                  <ProfileMsg/>
                </Modal>
                <Modal title="修改问题" visible={editIsModalVisible} onOk={this.handleEdit} onCancel={this.cancelEdit}>
                    <EditQuestion/>
                </Modal>
               
            </div>
        )
    }
}
