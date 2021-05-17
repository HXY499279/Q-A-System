import React, { Component } from 'react'
import AdminTopbar from "../../../components/admin-topbar"
//? antd
import { Table, Modal, Input, Button, Select, DatePicker} from 'antd';

import { SearchOutlined, DownloadOutlined  } from '@ant-design/icons';
import './index.less'
import FeedbackContent from './feedback-content'
import InformContent from './inform-content'
export default class Feedback extends Component {
    state = {
        informIsModalVisible: false,
        feedbackIsModalVisible: false,
        informDataSource: [
            {
                index: '01',
                content: '我是举报内容',
                type: '我是举报类型',
                informanter: '我是被举报者',
                informant:'我是举报者',
                reason: '我是举报理由',
                time: '我是举报时间',
                status: '未处理',
            }
        ],
        feedbackDataSource: [
            {
                index: '01',
                content: '反馈内容',
                feedbackrater: 'aqiuya',
                time: '2020-3-4 19:00',
                agree: '23',
                status: '未处理'


            }
        ]
    }
    //?点击查看举报
    showInform = (e) => {
        this.setState({informIsModalVisible:true})
        console.log(e)
        console.log('我点击了提问者')
    }
    handleInform = () => {
        this.setState({informIsModalVisible:false})
    }
    cancelInform = () => {
        this.setState({informIsModalVisible:false})
    }

    //?点击查看反馈
    showFeedback = (e) => {
        this.setState({feedbackIsModalVisible:true})
        console.log(e)
        console.log('我点击了提问者')
    }
    handleFeedback = () => {
        this.setState({feedbackIsModalVisible:false})
    }
    cancelFeedback = () => {
        this.setState({feedbackIsModalVisible:false})
    }
    render() {
        const informColumns = [
            {
                title: '序号',
                dataIndex: 'index',
                align: 'center'
              },
            {
                title: '举报内容',
                dataIndex: 'content',
                align: 'center'
              },
              {
                title: '举报类型',
                dataIndex: 'type',
                align: 'center'
              },
              {
                title: '被举报者',
                dataIndex: 'informanter',
                align: 'center'
              },
              {
                title: '举报者',
                dataIndex: 'informant',
                align: 'center'
              },
              {
                title: '举报理由',
                dataIndex: 'reason',
                align: 'center'
              },
              {
                title: '举报时间',
                dataIndex: 'time',
                align: 'center'
              },
              {
                title: '状态',
                dataIndex: 'status',
                align: 'center'
              },
              {
                title: '操作',
                dataIndex: '',
                render: (e) => (<><a onClick={(e) => this.showInform(e)}>查看 </a><a> 警告 </a><a> 隐藏</a></>),
                align: 'center'
              }
          ]
        const feedbackColumns = [
            {
                title: '序号',
                dataIndex: 'index',
                align: 'center'
              },
            {
                title: '反馈内容',
                dataIndex: 'content',
                align: 'center'
              },
              {
                title: '反馈者',
                dataIndex: 'feedbackrater',
                align: 'center'
              },
              {
                title: '反馈时间',
                dataIndex: 'time',
                align: 'center'
              },
              {
                title: '点赞',
                dataIndex: 'agree',
                align: 'center'
              },
              {
                title: '状态',
                dataIndex: 'status',
                align: 'center'
              },
              {
                title: '操作',
                dataIndex: '',
                render: (e) => (<><a onClick={(e) => this.showFeedback(e)}>查看 </a><a> 解决 </a><a> 隐藏</a></>),
                align: 'center'
              }
        ]
        const {informIsModalVisible, feedbackIsModalVisible} = this.state;
        return (
            <div>
                 <div className="feedback-infrom-msg">
                    <AdminTopbar tag="举报管理" timeShow='false' />
                    <div className="feedback-infrom-msg-search">
                        <div>
                            <ul>
                                <li>举报内容：<Input style={{width:180}}/></li>
                                <li>举报类型：<Input style={{width:180}}/></li>
                                <li>被举报者：<Input style={{width:180}}/></li>
                            </ul>
                            <ul>
                               <li>举报者：<Input style={{width:180}}/></li>
                               <li>举报时间：<Input style={{width:180}}/></li>
                               <li>处理进度：<Input style={{width:180}}/></li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <Button type="primary" icon={<SearchOutlined />}>
                                    搜索
                                </Button>
                            </ul>
                            <ul>
                                <Button type="primary" icon={<DownloadOutlined />}>
                                    导出
                                </Button>
                            </ul>
                        </div>
                    </div>
                    <div className="feedback-infrom-msg-content">
                    <Table 
                    bordered
                    align="center"
                    pagination={{ pageSize: 10 }} 
                    dataSource={this.state.informDataSource}
                    columns={informColumns} 
                    rowKey="index"/>
                    </div>
                    <Modal title="举报详情" visible={informIsModalVisible} onOk={this.handleInform} onCancel={this.cancelInform}>
                        <InformContent/>
                    </Modal>
                 </div>
                 <div className="feedback-infrom-msg">
                    <AdminTopbar tag="反馈管理" timeShow='false' />
                    <div className="feedback-infrom-msg-search">
                        <div>
                            <ul>
                                <li>反馈内容：<Input style={{width:180}}/></li>
                                <li>反馈时间：<Input style={{width:180}}/></li>
                                <li>反馈者：<Input style={{width:180}}/></li>
                            </ul>
                            <ul>
                               <li>处理状态：<Input style={{width:180}}/></li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <Button type="primary" icon={<SearchOutlined />}>
                                    搜索
                                </Button>
                            </ul>
                            <ul>
                                <Button type="primary" icon={<DownloadOutlined />}>
                                    导出
                                </Button>
                            </ul>
                        </div>
                    </div>
                    <div className="feedback-infrom-msg-content">
                    <Table 
                    bordered
                    align="center"
                    pagination={{ pageSize: 10 }} 
                    dataSource={this.state.feedbackDataSource}
                    columns={feedbackColumns} 
                    rowKey="index"/>
                    </div>
                    <Modal title="反馈详情" visible={feedbackIsModalVisible} onOk={this.handleFeedback} onCancel={this.cancelFeedback}>
                        <FeedbackContent/>
                    </Modal>
                    </div>
                
            </div>
        )
    }
}
