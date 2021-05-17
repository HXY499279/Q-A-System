import React, { Component } from 'react'
import AdminTopbar from "../../../components/admin-topbar";
import { Table, Modal, Input, Button, Select, DatePicker} from 'antd';
//?引入localstorage模块
import storageUtils from '@/utils/storageUtils'

import { SearchOutlined, DownloadOutlined  } from '@ant-design/icons';
import './index.less'
import {reqListAllSubject,reqListAccount,reqDisapperQuestion} from '@/api/index'
const { Option } = Select;
export default class User extends Component {
    state = {
        college:null,
        userName:null,
        role:null,
        pageSize:1,
        total:null,
        identity: '超级管理员',
        userDataSource: []

    }
    async componentDidMount () {
        let param = {
            currentPage:1,
            pageSize:this.state.pageSize
        }
        this.initUserTable(param)
    }
    handleChange = (value) => {
        console.log(`selected ${value}`);
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
    roleSearch = (e) => {
        if(e.target.value == ""){
              this.setState({
                role: null
              })
          }else{
            this.setState({
                role: e.target.value
            })
          }

    }

    async disapper (e) {
        let param = {
             accountId:Number(e),
             adminId:Number(storageUtils.getUser().adminId)
        }
        console.log(param)
        const res = await reqDisapperQuestion(param);
        console.log(res)
 
     }
    render() {
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
                title: '角色',
                dataIndex: 'role',
                render: (text) => {
                    if (this.state.identity == "超级管理员") {
                        return (
                            <>
                            <Select defaultValue={text == 1? "教师" : text == 2 ? "志愿者" : text == 3 ? "学生" : "管理员" } style={{ width: 120 }} onChange={this.handleChange}>
                               <Option value="教师">教师</Option>
                               <Option value="管理员">管理员</Option>
                               <Option value="志愿者">志愿者</Option>
                               <Option value="学生">学生</Option>
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
                dataIndex: 'accountId',
                render: (accountId) => (<><a onClick={() => this.updateUserRole(accountId)}>刷新</a> <a onClick={() => this.disapper(accountId)}>删除</a></>),
                align: 'center'
              }
        ] 
        return (
            <div className="user-search">
                <AdminTopbar tag="学科管理" timeShow='false' />
                <div className="user-search-top"> 
                    <ul>
                        <li>姓名：<Input onChange={ e => this.userNameSearch(e) } style={{width:200}}/></li>
                        <li>所属学院：<Input onChange={ e => this.collegeSearch(e) } style={{width:200}}/></li>
                        <li>角色：<Input onChange={ e => this.roleSearch(e) } style={{width:200}}/></li>
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
