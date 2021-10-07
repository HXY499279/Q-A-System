import React, { Component } from 'react'
import AdminTopbar from "../../../components/admin-topbar"
//? antd
import { Table, Modal, Input, Button, Select, DatePicker,Space, message } from 'antd';

import { SearchOutlined, DownloadOutlined  } from '@ant-design/icons';

//?引入localstorage模块
import storageUtils from '@/utils/storageUtils'

//?引入请求
import {reqWarnAccount,reqUpdateReportState,reqListReport,reqListFeedback,reqDeleteReportById,reqDeleteFeedbackById,reqUpdateFeedbackState} from '@/api/index'

//?引入redux
import {reportIdStore,feedbackIdStore} from '@/redux/store' 
import {reportId,feedbackId} from '@/redux/action' 

import './index.less'
import FeedbackContent from './feedback-content'
import InformContent from './inform-content'
const { Option } = Select;
export default class Feedback extends Component {
    state = {
        adminId:null,
        timeType:"year",
        pageSize:5,
        state:null,
        time:null,
        informIsModalVisible: false,
        informTotal:null,
        informContent:null,
        informType:null,
        informedName:null,
        informName:null,
        feedbackIsModalVisible: false,
        feedbackTotal:null,
        feedbackContent:null,
        feedbackName:null,
        informDataSource: [
        ],
        feedbackDataSource: [
        ]
    }
    componentDidMount = () => {
        //?获取管理者ID
        const adminId = storageUtils.getUser().adminId;
        // const {adminId} = memoryUtils.user;
        this.setState({adminId})
        let param = {
            currentPage:1,
            pageSize:this.state.pageSize
        }
        //?初始化举报列表
        this.initInformTable(param)

        //?初始化反馈列表
        this.initFeedbackTable(param)
    }

    //?举报列表请求
    async initInformTable (param) {
        const res = await reqListReport(param);
        console.log(res)
        const {list} = res.data;
        const {totalRows} = res.data.pageInfo
        this.setState({informDataSource:list,informTotal:totalRows})
    }
    //?反馈列表请求
    async initFeedbackTable (param) {
        const res = await reqListFeedback(param);
        // console.log(res)
        const {list} = res.data;
        const {totalRows} = res.data.pageInfo
        this.setState({feedbackDataSource:list,feedbackTotal:totalRows})
    }
    //?实现举报分页
    handleChangeInform = (value) =>{
        const {
            informContent,
            informType,
            informedName,
            informName,
            state,
            time} = this.state;
            console.log(informContent)
        let param = {
            currentPage:value.current,
            pageSize:value.pageSize,
            content:informContent,
            reportTime:time,
            reportAccountName:informName,
            reportedAccountName:informedName,
            state,
            type:informType,
        }

        this.initInformTable(param)
    }

    //?监听举报查询条件变化
    informContent = (e) => {
        if(e.target.value == ""){
                this.setState({
                    informContent: null
                })
            }else{
                this.setState({
                    informContent: e.target.value
                })
            } 
            // console.log(this.state.informContent)

    }
    informType = (value) => {
        if(value == ''){
            this.setState({
                informType: null
            })
        }else{
            this.setState({
                informType:Number(value)
            })
        }  
        // console.log(`selected ${value}`);
       
      }
    informedName = (e) => {
        if(e.target.value == ""){
                this.setState({
                    informedName: null
                })
            }else{
                this.setState({
                    informedName: e.target.value
                })
            } 

    }
    informName = (e) => {
        if(e.target.value == ""){
                this.setState({
                    informName: null
                })
            }else{
                this.setState({
                    informName: e.target.value
                })
            } 

    }

    //?搜索举报
    informSearch = () => {
        // console.log("我点击了搜索")
        const {
            informContent,
            informType,
            informedName,
            informName,
            state,
            time} = this.state;
            // console.log(informContent)
        let param = {
            currentPage:1,
            pageSize:this.state.pageSize,
            content:informContent,
            reportTime:time,
            reportAccountName:informName,
            reportedAccountName:informedName,
            state,
            time,
            type:informType,
        }
        this.initInformTable(param)
       
    }

    //?点击查看举报
    showInform = (e) => {
        //存储举报id到redux
        reportIdStore.dispatch(reportId(e))
        this.setState({informIsModalVisible:true})
    }
    handleInform = () => {
        this.setState({informIsModalVisible:false})
    }
    cancelInform = () => {
        this.setState({informIsModalVisible:false})
    }
    //?隐藏举报
    // disapperInform = (e) => {
    //     let param = {
    //         adminId:this.state.adminId,
    //         reportId:Number(e)
    //     }
    //     reqDeleteReportById(param)
    //     .then(res=>{
    //         if(res.data){
    //             message.success("隐藏成功")
    //             this.informSearch()
    //         }else{
    //             message.error("隐藏失败")
    //         }
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //         message.error("发生错误")
    //     })
        
    // }
    //?解决举报
    solveInform = (e) => {
        let param = {
            adminId:this.state.adminId,
            reportId:Number(e)
        }
        reqUpdateReportState(param)
        .then(res=>{
            if(res.data.code == 1){
                message.success("成功解决")
                this.informSearch()
            }else{
                message.error("解决失败")
            }
        
        })
        .catch(err=>{
            console.log(err)
            message.error("发生错误")
        })
    }
    //?对被举报者进行警告
    warnInform = (e) => {
        let param = {
            adminId:this.state.adminId,
            reportId:Number(e)
        }
        reqWarnAccount(param)
        .then(res=>{
            if(res.data){
                message.success("警告成功")
                this.informSearch()
            }else{
                message.error("警告失败")
            }
           
        })

    }
    //?点击查看反馈
    showFeedback = (e) => {
        console.log(e)
        //存储反馈id到redux
        feedbackIdStore.dispatch(feedbackId(e))
    
        this.setState({feedbackIsModalVisible:true})
        // console.log(e)
        // console.log('我点击了提问者')
    }
    handleFeedback = () => {
        this.setState({feedbackIsModalVisible:false})
    }
    cancelFeedback = () => {
        this.setState({feedbackIsModalVisible:false})
    }


    //?实现反馈分页
    handleChangeFeedback = (value) => {
         // console.log(value)
         const {
            feedbackContent,
            feedbackName,
            state,
            time} = this.state;
           
        let param = {
            currentPage:value.current,
            pageSize:value.pageSize,
            content:feedbackContent,
            feedbackTime:time,
            accountName:feedbackName,
            state,
        }

        this.initFeedbackTable(param)
    }

    //?搜索反馈
    feedbackSearch = ()=> {
        const {
            pageSize,
            feedbackContent,
            feedbackName,
            state,
            time} = this.state;
           
        let param = {
            currentPage:1,
            pageSize,
            content:feedbackContent,
            feedbackTime:time,
            accountName:feedbackName,
            state,
        }

        this.initFeedbackTable(param)
    }

    //?隐藏反馈
    // disapperFeedback = (e) => {
    //     let param = {
    //         adminId:this.state.adminId,
    //         feedbackId:Number(e)
    //     }
    //     reqDeleteFeedbackById(param)
    //     .then(res=>{
    //         if(res.code == 1){
    //             message.success("隐藏成功")
    //             this.feedbackSearch()
    //         }
    //     })
    // }
    //?解决反馈
    solveFeedback = (e) => {
        let param = {
            adminId:this.state.adminId,
            feedbackId:Number(e)
        }
        reqUpdateFeedbackState(param)
        .then(res=>{
            if(res.code == 1){
                message.success("已解决")
                this.feedbackSearch()
            }
        })
    }

    //?监听反馈查询条件变化
    feedbackContent = (e) => {
        if(e.target.value == ""){
                this.setState({
                    feedbackContent: null
                })
            }else{
                this.setState({
                    feedbackContent: e.target.value
                })
            } 
    }
    feedbackName = (e) => {
        if(e.target.value == ""){
                this.setState({
                    feedbackName: null
                })
            }else{
                this.setState({
                    feedbackName: e.target.value
                })
            } 
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
                time:null
            })
        }else{
            this.setState({
                time:dateStrings
            })
        }  
    }
    //?处理状态
    handleChange = (value) => {
        if(value == ''){
            this.setState({
                state: null
            })
        }else{
            this.setState({
                state:Number(value)
            })
        }  
        console.log(`selected ${value}`);
       
      }

    render() {
        const informColumns = [
            {
                title: '举报内容',
                dataIndex: 'content',
                // dangerouslySetInnerHTML = {{__html:text.substring(0,35)+"..."}}
                render:text=>(<p dangerouslySetInnerHTML = {{__html:text.substring(0,35)+"..."}}></p>),
                align: 'center'
              },
              {
                title: '举报类型',
                dataIndex: 'type',
                render: (text) => (<span>{text == 1 ? "问题" : text == 2 ? "回答" :  "评论" }</span> ),
                align: 'center'
              },
              {
                title: '被举报者',
                dataIndex: 'reportedAccountName',
                align: 'center'
              },
              {
                title: '举报者',
                dataIndex: 'reportAccountName',
                align: 'center'
              },
              {
                title: '举报理由',
                dataIndex: 'reason',
                align: 'center'
              },
              {
                title: '举报时间',
                dataIndex: 'reportTime',
                align: 'center'
              },
              {
                title: '状态',
                dataIndex: 'state',
                render: (text) => (<span>{text == 0? "未解决" : "已解决"}</span> ),
                align: 'center'
              },
              {
                title: '操作',
                dataIndex: 'reportId',
                render: (reportId) => (<>
                <a onClick={() => this.showInform(reportId)}>查看 </a>
                <a onClick={() => this.warnInform(reportId)}>警告</a>
                {/* <a onClick={() => this.disapperInform(reportId)}> 隐藏</a> */}
                {/* <a onClick={() => this.solveInform(reportId)}> 解决</a> */}
                </>),
                align: 'center'
              }
          ]
        const feedbackColumns = [
            {
                title: '反馈内容',
                dataIndex: 'content',
                render:text=>(<p dangerouslySetInnerHTML = {{__html:text.substring(0,8)+"..."}}></p>),
                align: 'center'
              },
              {
                title: '反馈者',
                dataIndex: 'accountName',
                align: 'center'
              },
              {
                title: '反馈时间',
                dataIndex: 'feedbackTime',
                align: 'center'
              },
              {
                title: '点赞',
                dataIndex: 'agreeCount',
                align: 'center'
              },
              {
                title: '状态',
                dataIndex: 'state',
                render: (text) => (<span>{text == 0? "未解决" : "已解决"}</span> ),
                align: 'center'
              },
              {
                title: '操作',
                dataIndex: 'feedbackId',
                render: (feedbackId) => (<>
                <a onClick={() => this.showFeedback(feedbackId)}>查看 </a>
                <a onClick={() => this.solveFeedback(feedbackId)}> 解决 </a>
                {/* <a onClick={() => this.disapperFeedback(feedbackId)}> 隐藏</a> */}
                </>),
                align: 'center'
              }
        ]
        const {informIsModalVisible, feedbackIsModalVisible,timeType,informTotal,feedbackTotal} = this.state;
        return (
            <div>
                 <div className="feedback-infrom-msg">
                    <AdminTopbar tag="举报管理" timeShow='false' />
                    <div className="feedback-infrom-msg-search">
                        <div>
                            <ul>
                                <li>举报原因：<Input onChange={ e => this.informContent(e) } style={{width:180}}/></li>
                                <li>举报类型：
                                     <Select  style={{ width: 180 }} onChange={this.informType}>
                                        <Option value="1">问题</Option>
                                        <Option value="2">回答</Option>
                                        <Option value="3">评论</Option>
                                        <Option value="">无</Option>
                                    </Select>
                                </li>
                                <li>被举报者：<Input onChange={ e => this.informedName(e) } style={{width:180}}/></li>
                            </ul>
                            <ul>
                               <li>举报者：<Input onChange={ e => this.informName(e) } style={{width:180}}/></li>
                               <li>举报时间：
                                    <Space>
                                            <Select defaultValue={timeType} onChange={this.setType}>
                                                <Option value="date">Date</Option>
                                                <Option value="month">Month</Option>
                                                <Option value="year">Year</Option>
                                            </Select>
                                            
                                            <DatePicker picker={timeType} onChange={this.onChange} />
                                    </Space>
                               </li>
                               <li>处理状态：
                                    <Select  style={{ width: 180 }} onChange={this.handleChange}>
                                        <Option value="1">已解决</Option>
                                        <Option value="0">未解决</Option>
                                        <Option value=''>全部</Option>
                                    </Select>
                               </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <Button type="primary" onClick={this.informSearch} icon={<SearchOutlined />}>
                                    搜索
                                </Button>
                            </ul>
                            <ul>
                                <a href="https://xscqa.cqupt.edu.cn/question/admin/exportExcel?type=5">
                                    <Button type="primary" icon={<DownloadOutlined />}>
                                        导出
                                    </Button>
                                </a>
                            </ul>
                        </div>
                    </div>
                    <div className="feedback-infrom-msg-content">
                    <Table 
                    bordered
                    onChange={this.handleChangeInform }
                    pagination={{ "pageSize": this.state.pageSize,"total":informTotal }} 
                    align="center"
                    dataSource={this.state.informDataSource}
                    columns={informColumns} 
                    rowKey="reportId"/>
                    </div>
                    <Modal title="举报详情" destroyOnClose footer={null} visible={informIsModalVisible} onOk={this.handleInform} onCancel={this.cancelInform}>
                        <InformContent/>
                    </Modal>
                 </div>
                 <div className="feedback-infrom-msg">
                    <AdminTopbar tag="反馈管理" timeShow='false' />
                    <div className="feedback-infrom-msg-search">
                        <div>
                            <ul>
                                <li>反馈内容：<Input onChange={ e => this.feedbackContent(e) } style={{width:180}}/></li>
                                
                                <li>反馈者：<Input onChange={ e => this.feedbackName(e) } style={{width:180}}/></li>
                            </ul>
                            <ul>
                               <li>处理状态：
                                    <Select  style={{ width: 180 }} onChange={this.handleChange}>
                                        <Option value="1">已解决</Option>
                                        <Option value="0">未解决</Option>
                                        <Option value=''>无</Option>
                                    </Select>
                               </li>
                               <li>反馈时间：
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
                        </div>
                        <div>
                            <ul>
                                <Button type="primary" onClick={this.feedbackSearch} icon={<SearchOutlined />}>
                                    搜索
                                </Button>
                            </ul>
                            <ul>
                                <a href="https://xscqa.cqupt.edu.cn/question/admin/exportExcel?type=6">
                                    <Button type="primary" icon={<DownloadOutlined />}>
                                        导出
                                    </Button>
                                </a>
                            </ul>
                        </div>
                    </div>
                    <div className="feedback-infrom-msg-content">
                    <Table 
                    bordered
                    align="center"
                    onChange={this.handleChangeFeedback }
                    pagination={{ "pageSize": this.state.pageSize,"total":feedbackTotal }} 
                    dataSource={this.state.feedbackDataSource}
                    columns={feedbackColumns} 
                    rowKey="feedbackId"/>
                    </div>
                    <Modal title="反馈详情" destroyOnClose footer={null} visible={feedbackIsModalVisible} onOk={this.handleFeedback} onCancel={this.cancelFeedback}>
                        <FeedbackContent/>
                    </Modal>
                    </div>
                
            </div>
        )
    }
}
