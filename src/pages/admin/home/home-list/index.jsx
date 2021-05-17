import React, { Component } from 'react'

//?样式
import './index.less'

//?引入头部组件
import AdminTopbar from "@/components/admin-topbar";

//?引入志愿者相关 和 学科相关 column 配置
import {volunteerColumns, subjectColumns} from  '@/config/contentConfig'

//?引入请求函数
import {reqVolunteer,reqSubject} from '@/api/index'

//? antd
import { Table  } from 'antd';


export default class HomeList extends Component {
    state = {
        pageSize:5,
        volunteerTotal:0,
        subjectTotal:0,
        volunteerDataSource:[],
        subjectDataSource:[],
    }
   componentDidMount(){
    let params = {
      currentPage:1,
      pageSize:this.state.pageSize
      }
      this.initVolunteer(params)
      this.initSubject(params)
   }
   
   async initVolunteer(params){
     //?初始化志愿者相关表格数据
      const res = await reqVolunteer(params);
      const {list} = res.data;
      const {totalRows} = res.data.pageInfo;
      this.setState({volunteerTotal:totalRows,volunteerDataSource:list})
   }
   async initSubject(params){
     //?初始化学科相关表格数据
    const res = await reqSubject(params);
    console.log(res)
    const {list} = res.data;
    const {totalRows} = res.data.pageInfo;
    this.setState({subjectTotal:totalRows,subjectDataSource:list})
  }

    //?处理表格分页点击事件
     handleChangeVolunteer = value => {
      // console.log(value)
      let params = {
        currentPage:value.current,
        pageSize:value.pageSize
        }
        reqVolunteer(params)
        .then(res => {
          // console.log(res)
          const {list} = res.data;
          this.setState({volunteerDataSource:list})
        })
         
      };
      handleChangeSubject = value => {
        console.log(value)
        let params = {
          currentPage:value.current,
          pageSize:value.pageSize
          }
          reqSubject(params)
          .then(res => {
            // console.log(res)
            const {list} = res.data;
          this.setState({subjectDataSource:list})
          })
           
        };
    render() {
  
        return (
          <div className="home-list">
               <div className="home-list1">
                    <AdminTopbar tag="志愿者相关" timeShow='false' />
                    <div className="home-list-content1">
                    <Table 
                    bordered
                    size="small"
                    align="center"
                    pagination={{"pageSize" : this.state.pageSize,"total":this.state.volunteerTotal}} 
                    onChange={this.handleChangeVolunteer}
                    dataSource={this.state.volunteerDataSource}
                    columns={volunteerColumns} 
                    rowKey="college"/>
                    </div>
                </div>
                <div className="home-list2">
                    <AdminTopbar tag="学科相关" timeShow='false'/>
                    <div className="home-list-content2">
                    <Table 
                    bordered
                    size="small"
                    align="center"
                    onChange={this.handleChangeSubject}
                    pagination={{ "pageSize": this.state.pageSize, "total":this.state.subjectTotal}} 
                    dataSource={this.state.subjectDataSource}
                    columns={subjectColumns} 
                    rowKey="subjectId"/>
                    </div>
                </div>
          </div>
        )
    }
}
