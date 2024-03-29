import axios from 'axios'
import React, { Component } from 'react'
import './index.less'
import AdminTopbar from "../../../components/admin-topbar";
import { Table, Modal, Input, Button,Select,Popconfirm ,message} from 'antd';
import { SearchOutlined, DownloadOutlined ,CloseCircleOutlined } from '@ant-design/icons';
//?引入请求函数
import {reqGetAllCollege,reqListSubject,reqDeleteSubject,reqAddSubject,reqUpdateSubject} from '@/api/index'
//?引入localstorage模块
import storageUtils from '@/utils/storageUtils'
//?引入redux
import {subjectIdStore,subjectNameStore,collegeStore,subjectInfoStore,subjectNoteStore,subjectIconStore} from '@/redux/store'

import {subjectId} from '@/redux/action'
import EditSubject from './edit-subject'
import './index.less'
const { Option } = Select;
export default class Subject extends Component {
    state = {
      adminId:null,
      pageSize:10,
      total:null,
      subjectName:null,
      college:null,
      subjectIsModalVisible: false,
      subjectAddIsModalVisible:false,
      subjectDataSource:[],
      collegeData:[]
    }
    componentDidMount = () => {
      const adminId = storageUtils.getUser().adminId
      this.setState({
        adminId
      })
      let param = {
        currentPage:1,
        pageSize:this.state.pageSize
      }
      reqGetAllCollege()
      .then(res=>{
        //console.log(res)
        this.setState({
          collegeData:res.data
        })
      })
      this.initUserTable(param)
    }
    async initUserTable (param) {
      const res = await reqListSubject(param);
      const {list} = res.data;
      const {totalRows} = res.data.pageInfo
      this.setState({subjectDataSource:list,total:totalRows})
  }

  //?监听查询条件变化
  subjectName = (e) => {
    //console.log(e)
    if(e.target.value == ''){
      this.setState({
        subjectName: null
      })
    }else{
        this.setState({
          subjectName:e.target.value
        })
    }  
  }
  handleChange = (e) => {
    if(e == ''){
            this.setState({
              college: null
            })
        }else{
            this.setState({
              college:e
            })
        }  
  }
  //?实现分页
  handleChangeSubject = (value) => {
    const {subjectName,college} = this.state
    let param = {
      currentPage:value.current,
      pageSize:value.pageSize,
      subjectName,
      college
    }
    this.initUserTable(param)
  }

  //?实现搜索
  searchSubject = () => {
    const {subjectName,college,pageSize} = this.state
    let param = {
      currentPage:1,
      pageSize,
      subjectName,
      college
    }
    this.initUserTable(param)
  }

   //? 点击修改学科回调函数
   showEditSubject = (e) => {
    subjectIdStore.dispatch(subjectId(e))
    this.setState({subjectIsModalVisible:true})

   }
   changeEdit = () => {
    //  //console.log("我点击了OK")
    let formData = new FormData();
    formData.append('subjectId',subjectIdStore.getState());
    formData.append('icon',subjectIconStore.getState());
    formData.append('subjectName', subjectNameStore.getState())
    formData.append('college', collegeStore.getState())
    formData.append('subjectInfo', subjectInfoStore.getState())
    formData.append('note', subjectNoteStore.getState())
    formData.append('adminId', this.state.adminId)
    axios({
      method: 'post',
      url: "https://xscqa.cqupt.edu.cn/question//admin/updateSubject",
      headers: { 'Content-type': 'multipart/form-data;charset=UTF-8' },
      data: formData
    })
    .then(res=>{
      //console.log(res)
      if(res.data.code == 1){
        message.success("成功修改学科！")
        this.searchSubject()
      }
      
    })
   

    this.setState({subjectIsModalVisible:false})
    }
    cancelChangeEditEdit = () => {
        this.setState({subjectIsModalVisible:false})
    }

    //清空
    // clearAll = () => {
    //   //console.log("清空")
    //   this.setState({
    //     subjectName:null,
    //     college:null
    //   })
    //   //console.log(this.state.subjectName);
    //   //console.log(this.state.college)
    // }
    //?添加学科
    showAddSubject = () => {

      this.setState({subjectAddIsModalVisible:true})
     }
     addEdit = () => {

      //console.log("add")
      //console.log(subjectIconStore.getState())
      let formData = new FormData();
      formData.append('icon',subjectIconStore.getState());
      formData.append('subjectName', subjectNameStore.getState())
      formData.append('college', collegeStore.getState())
      formData.append('subjectInfo', subjectInfoStore.getState())
      formData.append('note', subjectNoteStore.getState())
      formData.append('adminId', this.state.adminId)
      axios({
        method: 'post',
        url: "https://xscqa.cqupt.edu.cn/question/admin/addSubject",
        headers: { 'Content-type': 'multipart/form-data;charset=UTF-8' },
        data: formData
      })
      .then(res=>{
        //console.log(res)
        if(res.data.code == 1){
          message.success("成功添加学科！")
          this.searchSubject()
        }
      })

      this.setState({subjectAddIsModalVisible:false})
      }
      cancelAddEdit = () => {

          this.setState({subjectAddIsModalVisible:false})
      }

      //?删除学科
      deleteSubject = (e) => {
        //console.log(e)
        let param = {
          subjectId:e,
          adminId:this.state.adminId
        }
        reqDeleteSubject(param)
        .then(res=>{
          if(res.code == 1){
            message.success("删除成功")
            this.searchSubject()
          }else{
            message.error("删除失败")
          }
        })
      }
    render() {
        const subjectColumns = [
            {
                title: '学科名称',
                dataIndex: 'subjectName',
                align: 'center'
              },
              {
                title: '所属学院',
                dataIndex: 'college',
                align: 'center'
              },
              {
                title: '教师',
                dataIndex: 'teacherCount',
                align: 'center'
              },
              {
                title: '志愿者',
                dataIndex: 'volunteerCount',
                width: '10%',
                align: 'center'
              },
              {
                title: '累计提问',
                dataIndex: 'questionCount',
                align: 'center'
                //
              },
              {
                title: '累计回答',
                dataIndex: 'answerCount',
                align: 'center'
              },
              {
                title: '累计解决',
                dataIndex: 'solvedQuestionCount',
                align: 'center'
              },
              {
                title: '操作', 
                dataIndex: 'subjectId',
                render: (subjectId) => (<><a onClick={() => this.showEditSubject(subjectId)}>修改/查看 </a> 
                <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={() => this.deleteSubject(subjectId)}>
                  <a href="#">删除</a>
                </Popconfirm>
                {/* <a onClick={}> 删除</a> */}
                </>),
                align: 'center'
              }
        ]
        const {subjectIsModalVisible,subjectAddIsModalVisible,collegeData,pageSize,total} = this.state
        return (
            <div className="subject-search">
                <AdminTopbar tag="学科管理" timeShow='false' />
                <div className="subject-search-top">
                    <ul>
                        <li>学科名称：<Input onChange={e => this.subjectName(e)} style={{width:200}}/></li>
                        <li>所属学院：
                          <Select  style={{ width: 200 }} onChange={this.handleChange}>
                            {collegeData.map((obj) => {
                              return(
                                <Option key={obj} value={obj}>{obj}</Option>
                              ) 
                            })}
                          </Select>
                        </li>
                    </ul>
                    <ul>
                        {/* <Button type="primary" onClick={this.clearAll} icon={<CloseCircleOutlined />}>
                            清空
                        </Button> */}
                        {/* <Button type="primary" onClick={this.clearAll}> 清空</Button> */}
                        <Button type="primary" style={{marginLeft:30}} onClick={() => this.searchSubject()} icon={<SearchOutlined />}>
                            搜索
                        </Button>
                        
                        <Button type="primary" style={{marginLeft:30}} onClick={(e) => this.showAddSubject(e)}>
                          + 添加
                        </Button>   
                        <a href="https://xscqa.cqupt.edu.cn/question/admin/exportExcel?type=4">
                          <Button type="primary" icon={<DownloadOutlined />} style={{marginLeft:30}}>
                              导出
                          </Button>  
                        </a>
                         
                    </ul>    
                </div>
                <div className="subject-search-list">
                  <Table 
                  bordered
                  align="center"
                  onChange={this.handleChangeSubject}
                  pagination={{ "pageSize": pageSize,"total":total }} 
                  dataSource={this.state.subjectDataSource}
                  columns={subjectColumns} 
                  rowKey="subjectId"/>
                </div>
                <Modal title="修改学科" destroyOnClose visible={subjectIsModalVisible} onOk={this.changeEdit} onCancel={this.cancelChangeEditEdit}>
                    <EditSubject type="change"/>
                </Modal>
                <Modal title="添加学科" destroyOnClose visible={subjectAddIsModalVisible} onOk={this.addEdit} onCancel={this.cancelAddEdit}>
                    <EditSubject type='add'/>
                </Modal>
            </div>
        )
    }
}
