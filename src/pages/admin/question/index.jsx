import React, { Component,useState } from 'react'
import {Link} from 'react-router-dom'

import AdminTopbar from "@/components/admin-topbar"

//?引入用户信息组件
import ProfileMsg from './profile-msg'

//?引入修改问题组件
import EditQuestion from './edit-question'

//?引入请求函数
import {reqListQuestion,reqUpdateQuestion,reqDisapperQuestion} from '@/api/index'

//?引入存储模块
import memoryUtils from '@/utils/memoryUtils'
//?引入localstorage模块
import storageUtils from '@/utils/storageUtils'

//? antd
import { Table, Modal, Input, Button, Select, DatePicker, message,Space} from 'antd';
import {questionId,stuId} from '@/redux/action'
import {qID,qTitleStore,qDescribeStore,stuIdStore} from '@/redux/store'



import { SearchOutlined, DownloadOutlined  } from '@ant-design/icons';
import './index.less'
const { Option } = Select;

export default class Question extends Component {
    state = {
        adminId:0,
        total:0,
        pageSize:10,
        profileIsModalVisible: false,
        editIsModalVisible: false,
        questionDataSource: [],
        title:null ,
        subjectName:null,
        college:null,
        questionAccountName:null,
        state:null,
        timeType:"year",
        time:null,
        answerAccountName:null
    }

    componentDidMount = () => {
        //?获取管理者ID
        const {adminId} = memoryUtils.user;
        this.setState({adminId})
        let param = {
            currentPage:1,
            pageSize:this.state.pageSize
        }
        this.initQuestionTable(param)
    }
    async initQuestionTable (param) {
        const res = await reqListQuestion(param);
        console.log(res)
        const {list} = res.data;
        const {totalRows} = res.data.pageInfo
        this.setState({questionDataSource:list,total:totalRows})
    }

      //?监听输入框的值
      titleSearch = (e) => {
        //   console.log(e.target.value)
        //   console.log(e)
          if(e.target.value == ""){
              this.setState({
                title: null
              })
          }else{
            this.setState({
                title: e.target.value
            })
          }
            
        }
        subjectSearch = (e) => {
            if(e.target.value == ""){
                this.setState({
                    subjectName: null
                })
            }else{
                this.setState({
                    subjectName: e.target.value
                })
            }
        }
        collegeSearch = (e) => {
            if(e.target.value == ""){
                this.setState({
                    college: null
                })
            }else{
                this.setState({
                    college: e.target.value
                })
            } 
        }
        askSearch = (e) => {
            if(e.target.value == ""){
                this.setState({
                    questionAccountName: null
                })
            }else{
                this.setState({
                    questionAccountName: e.target.value
                })
            }  
        }
        // answerSearch = (e) => {
        //     if(e.target.value == ""){
        //         this.setState({
        //             answerAccountName: null
        //         })
        //     }else{
        //         this.setState({
        //             answerAccountName: e.target.value
        //         })
        //     }  
        // }


    //?状态回调函数
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
    // onChange = function (date, dateStrings){
       
    // }
    //?实现搜索问题
    search = () => {
        const {title,subjectName,college,questionAccountName,state,time,answerAccountName} = this.state;
        let param = {
            currentPage:1,
            pageSize:this.state.pageSize,
            title,
            subjectName,
            college,
            questionAccountName,
            state,time,
            answerAccountName
        }
        reqListQuestion(param)
        .then(res=>{
            console.log(res)
            const {list} = res.data;
            const {totalRows} = res.data.pageInfo
            this.setState({questionDataSource:list,total:totalRows})
        })
        .catch(err=>{
            console.log(err)
        })
    }
    
    //?点击提问者
    showProfile = (e)=> {
        console.log("我点击了提问者")
        //存储提问者学号
        console.log(e.target.innerHTML)
        stuIdStore.dispatch(stuId(e.target.innerHTML))
        console.log(stuIdStore.getState())
        this.setState({profileIsModalVisible:true})
       
    }
    //?查看提问者回调函数
    handleProfile = () => {
        this.setState({profileIsModalVisible:false})
    }
    cancelProfile = () => {
        Modal.destroyAll();
        this.setState({profileIsModalVisible:false})
    }

    //?点击修改问题
    showEditQuesion = (e) => {
        //存储问题id
        qID.dispatch(questionId(e))
        this.setState({editIsModalVisible:true})
        console.log('我点击了修改问题')
    }
    //?确认修改问题
    handleEdit = (e) => {
        let describes = qDescribeStore.getState();
        describes = describes.replace(/[\n]/g,"\\n");
        describes = describes.replace(/[ ]/g,'&nbsp;');
        let param = {
            questionId:qID.getState(),
            title:qTitleStore.getState(),
            describes,
            adminId:storageUtils.getUser().adminId
        }
        reqUpdateQuestion(param)
        .then(res=>{
            console.log(res)
            const {code} = res;
            if(1 == code) {
                message.success('修改问题成功！');
                this.setState({editIsModalVisible:false})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    cancelEdit = (e) => {
        this.setState({editIsModalVisible:false})
    }

    //?跳转问题详情页
    goQuestionDetail = (e) => {
         //?保存用户登录信息到localstorage
        storageUtils.saveQuestionId(e)
        console.log(e)
        qID.dispatch(questionId(e))

    }

    //?实现分页
    handleChangeQustion = (value) =>{
        console.log(value)
        const {title,subjectName,college,questionAccountName,state,time,answerAccountName} = this.state;
        let param = {
            currentPage:value.current,
            pageSize:value.pageSize,
            title,
            subjectName,
            college,
            questionAccountName,
            state,time,
            answerAccountName
        }

        this.initQuestionTable(param)
    }

    //?隐藏问题
    async disapper (e) {
       let param = {
            questionId:e,
            adminId:this.state.adminId
       }
       const res = await reqDisapperQuestion(param);
       console.log(res)

    }    
    render() {
        const questionColumns = [
            {
                title: '标题',
                dataIndex: 'title',
                render:(text)=>(<p>{text.substring(0,5)+"..."}</p>),
                align: 'center'
              },
              {
                title: '提问者',
                dataIndex: 'questionAccountId',
                render: (text) => (<a onClick={(e) => this.showProfile(e)}>{text}</a>),
                align: 'center'
              },
              {
                title: '学科',
                dataIndex: 'subjectName',
                align: 'center'
              },
              {
                title: '学科所属学院',
                dataIndex: 'college',
                align: 'center'
              },
              {
                title: '状态',
                dataIndex: 'state',
                render: (text) => (<span>{text == 0? "未解决" : "已解决"}</span> ),
                align: 'center'
              },
              {
                title: '时间',
                dataIndex: 'publishTime',
                align: 'center'
              },
              {
                title: '回答',
                dataIndex: 'answerCount',
                align: 'center'
              },
              {
                title: '收藏',
                dataIndex: 'collectionCount',
                align: 'center'
              },
              {
                title: '举报',
                dataIndex: 'reportCount',
                align: 'center'
              },
              {
                title: '操作',
                dataIndex: 'questionId',
                render: (questionId) => (<><Link to="/admin/questionDetail" onClick={() => this.goQuestionDetail(questionId)}> 查看 </Link><a onClick={() => this.showEditQuesion(questionId)}> 修改 </a> <a onClick={()=>this.disapper(questionId)}> 隐藏 </a></>),
                align: 'center'
              }
          ]
        const {profileIsModalVisible, editIsModalVisible,timeType} = this.state
      
        return (
            <div className="question-msg">
                <AdminTopbar tag="问题管理" timeShow='false' />
                <div className="question-msg-search">
                    <div>
                        <ul>
                            <li>标题：<Input onChange={ e => this.titleSearch(e) } style={{width:160}}/></li>
                            <li>学科：<Input onChange={ e => this.subjectSearch(e) } style={{width:160}}/></li>
                            <li>学院：<Input onChange={ e => this.collegeSearch(e) }style={{width:160}}/></li>
                            <li>提问者：<Input onChange={ e => this.askSearch(e) } style={{width:160}}/></li>
                        </ul>
                        <ul>
                            <li>状态： <Select  style={{ width: 180 }} onChange={this.handleChange}>
                                        <Option value="1">已解决</Option>
                                        <Option value="0">未解决</Option>
                                        <Option value=''></Option>
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
                            {/* <li>回答者：<Input onChange={ e => this.answerSearch(e) } style={{width:180}}/></li> */}
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <Button type="primary" onClick={this.search} icon={<SearchOutlined />}>
                                搜索
                            </Button>
                            
                        </ul>
                        <ul>
                            <a href="https://xscqa.cqupt.edu.cn/question/admin/exportExcel?type=1">
                                <Button type="primary" icon={<DownloadOutlined />}>
                                    导出
                                </Button>
                            </a>
                            
                        </ul>
                    </div>
                </div>
                <div className="question-msg-content">
                <Table 
                bordered
                align="center"
                onChange={this.handleChangeQustion}
                pagination={{ "pageSize": this.state.pageSize,"total":this.state.total }} 
                dataSource={this.state.questionDataSource}
                columns={questionColumns} 
                rowKey="questionId"/>
                </div>
                <Modal footer={null} destroyOnClose title="用户信息" visible={profileIsModalVisible} onOk={this.handleProfile} onCancel={this.cancelProfile}>
                  <ProfileMsg/>
                </Modal>
                <Modal destroyOnClose title="修改问题" visible={editIsModalVisible} onOk={this.handleEdit} onCancel={this.cancelEdit}>
                    <EditQuestion wrappedComponentRef={this.saveFormRef}/>
                </Modal>
            </div>
        )
    }
}
