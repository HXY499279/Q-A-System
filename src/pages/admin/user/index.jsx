import axios from 'axios';
import React, { Component } from 'react'
import AdminTopbar from "../../../components/admin-topbar";
import { Table, Input, Button, Select, Cascader, message ,Upload  } from 'antd';
//?引入localstorage模块
import storageUtils from '@/utils/storageUtils'

import { SearchOutlined, DownloadOutlined ,UploadOutlined } from '@ant-design/icons';
import './index.less'
import {reqListAllSubject,reqListAccount,reqDisapperQuestion,reqUpdateAccountRole,reqDeleteAccountById} from '@/api/index'
const { Option } = Select;
export default class User extends Component {
    state = {
        adminId:null,
        college:null,
        userName:null,
        userCode:null,
        role:null,
        newRole:null,
        subjectId:null,
        pageSize:10,
        total:null,
        type: storageUtils.getUser().type,
        userDataSource: [],
        options:[],
        status:0

    }
    async componentDidMount () {
        let param = {
            currentPage:1,
            pageSize:this.state.pageSize
        }
        const adminId = storageUtils.getUser().adminId
        console.log(adminId)
        this.initUserTable(param)
        const res = await reqListAllSubject();
        console.log(res)
        this.setState({
            options:res.data,
            adminId:Number(adminId)
        })
        console.log(this.state.adminId)
    }
   
    async initUserTable (param) {
        const res = await reqListAccount(param);
        console.log(res)
        const {list} = res.data;
        const {totalRows} = res.data.pageInfo
        this.setState({userDataSource:list,total:totalRows})
    }
    //?实现分页
    handleChangeUser = (value) => {
        const {college,userName,role} = this.state
        let param = {
            currentPage:value.current,
            pageSize:value.pageSize,
            college,
            userName,
            role,
        }
        this.initUserTable(param)
    }

    //?监听搜索条件变化
    userNameSearch = (e) => {
        if(e.target.value == ""){
              this.setState({
                userName: null
              })
          }else{
            this.setState({
                userName: e.target.value
            })
          }

    }
    userCodeSearch = (e) => {
        if(e.target.value == ""){
            this.setState({
              userCode: null
            })
        }else{
          this.setState({
            userCode: e.target.value
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
    onChange = (e) => {
        console.log(e)
        if(e == ""){
            this.setState({
                role: null
            })
        }else{
          this.setState({
            role: e
          })
        }
    }


    //?实现搜索
    userSearch = () => {
        const {college,userName,role,pageSize,userCode} = this.state
        let param = {
            currentPage:1,
            pageSize,
            college,
            userName,
            role,
            accountId:userCode,
            excel:null
        }
        console.log(param)
        this.initUserTable(param)
    }


     //?监控角色级联选择
    handleChange = (value) => {
        console.log(value.length-1)
        console.log(value[value.length-1])
        if(value == []){
            this.setState({
                newRole: null
            })
        }else if (1 == value.length) {
            this.setState({
                newRole:Number(value[value.length-1])
            })
        }else{
            this.setState({
                newRole:Number(value[0]),
                subjectId:Number(value[value.length-1])
            })
        }  
      }

    //?删除用户
    // async disapper (e) {
    //     let param = {
    //          accountId:Number(e),
    //          adminId:Number(storageUtils.getUser().adminId)
    //     }
    //     console.log(param)
    //     const res = await reqDeleteAccountById(param);
    //     if(res.code == 1){
    //         message.success("删除成功")
    //         this.userSearch();
    //     }
       
    //  }
     
     //?修改角色
     updateUserRole = (e) => {
         const {newRole,adminId,subjectId} = this.state
         console.log(e)
         let param = {
            accountId:e,
            newRole,
            adminId,
            subjectId
         }
         reqUpdateAccountRole(param)
         .then(res=>{
             if(res.code == 1){
                 message.success("成功修改角色！")
                 this.userSearch()
             }
             console.log(res)
         })
         .catch(err=>{
             console.log(err)

         })
     }


     export = () => {
        let formData = new FormData();
        formData.append('excel',this.state.excel);
        axios({
            method: 'post',
            url: "https://xscqa.cqupt.edu.cn/question/admin/importVolunteer",
            headers: { 'Content-type': 'multipart/form-data;charset=UTF-8' },
            data: formData
          })
          .then(res=>{
            console.log(res)
            if(res.data.code == 1){
              message.success("成功导入！")
            }else{
              message.error("导入失败！")
            }
          })
     }
   
        beforeUpload =(file, fileList) =>{
            // console.log("上传前")
            // console.log(file)
            this.setState({excel:file,
            status:1})
          }
          handleChange(info) {
               
            if (info.file.status !== 'uploading') {
              console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
              message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
              message.error(`${info.file.name} file upload failed.`);
            }
          }

     
    render() {
        const {options} = this.state;
        const options2 = options.slice(0,3) 
        const userColumns = [
            {
                title: '姓名',
                dataIndex: 'userName',
                align: 'center'
              },
              {
                title: '所属学院',
                dataIndex: 'college',
                align: 'center'
              },
              {
                title: '总积分',
                dataIndex: 'score',
                align: 'center'
              },
              {
                title: '角色',
                dataIndex: 'role',
                render: (text) => {
                    if (this.state.type == 1) {
                        return (
                            <>
                                <Cascader options={options} onChange={this.handleChange} placeholder={text == 1? "教师" : text == 2 ? "志愿者" : text == 3 ? "学生" : "管理员" } />
                            </>
                        )
                    } else {
                        return (<Cascader options={options2} onChange={this.handleChange} placeholder={text == 1? "教师" : text == 2 ? "志愿者" : text == 3 ? "学生" : "管理员" } />)
                    }
                },
                align: 'center'
              },
              {
                title: '操作',
                dataIndex: 'accountId',
                render: (accountId) => (<><a onClick={() => this.updateUserRole(accountId)}>修改角色</a>
                 {/* <a onClick={() => this.disapper(accountId)}>删除</a> */}
                 </>),
                align: 'center'
              }
        ] 

        
        return (
            <div className="user-search">
                <AdminTopbar tag="用户管理" timeShow='false' />
                <div className="user-search-top"> 
                    <ul>
                        <li>姓名：<Input onChange={ e => this.userNameSearch(e) } style={{width:110}}/></li>
                        <li>统一认证码：<Input onChange={ e => this.userCodeSearch(e) } style={{width:110}}/></li>
                        <li>所属学院：<Input onChange={ e => this.collegeSearch(e) } style={{width:110}}/></li>
                        <li>角色：
                            <Select  style={{ width: 110 }} onChange={this.onChange}>
                                <Option value="1">教师</Option>
                                <Option value="2">志愿者</Option>
                                <Option value='3'>学生</Option>
                                <Option value='4' >管理员</Option>
                                <Option value=''>全部</Option>
                            </Select>
                        </li>
                    </ul>
                    <ul>
                        
                            <div>
                            <Upload 
                             name='excel'
                             action='123'
                             beforeUpload={this.beforeUpload}
                             onChange={this.handleChange}
                             >
                                <Button type="primary" style={{marginRight:"10px"}} icon={<UploadOutlined />}>选择文件</Button>
                                
                            </Upload>
                            <Button
                                    type="primary"
                                    onClick={this.export}
                                    disabled={this.state.status == 0}
                                    style={{ marginTop: 16 }}
                                    >
                                    上传
                            </Button>
                            </div>
                   
                       
                        <Button type="primary" style={{marginRight:"10px"}} onClick={this.userSearch} icon={<SearchOutlined />}>
                            搜索
                        </Button>
                      
                        <a href="https://xscqa.cqupt.edu.cn/question/admin/exportExcel?type=2">
                            <Button type="primary" icon={<DownloadOutlined />}>
                                导出
                            </Button>
                        </a>    
                       
                    </ul>    
                </div>
                <div className="user-search-list">
                <Table 
                bordered
                align="center"
                onChange={this.handleChangeUser}
                pagination={{ "pageSize": this.state.pageSize,"total":this.state.total }} 
                dataSource={this.state.userDataSource}
                columns={userColumns} 
                rowKey="userName"/>
                </div>
            </div>
        )
    }
}
