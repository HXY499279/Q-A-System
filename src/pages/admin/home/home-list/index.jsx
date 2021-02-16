import React, { Component } from 'react'

//?样式
import './index.less'

//?引入头部组件
import AdminTopbar from "../../../../components/admin-topbar";

//?引入志愿者相关 和 学科相关 column 配置
import {volunteerColumns, subjectColumns} from  '../../../../config/contentConfig'


//? antd
import { Table } from 'antd';


export default class HomeList extends Component {
    state = {
        volunteerDataSource:[
            {
                index: '01',
                academyName: '经济管理学院',
                teacherNum: '23',
                volunteerNum: '123',
                answerNum: '90',
                resolveNum: '235'
              },
              {
                index: '02',
                academyName: '经济管理学院',
                teacherNum: '23',
                volunteerNum: '123',
                answerNum: '90',
                resolveNum: '235'
              },
              {
                index: '03',
                academyName: '经济管理学院',
                teacherNum: '23',
                volunteerNum: '123',
                answerNum: '90',
                resolveNum: '235'
              },
              {
                index: '04',
                academyName: '经济管理学院',
                teacherNum: '23',
                volunteerNum: '123',
                answerNum: '90',
                resolveNum: '235'
              },
              {
                index: '05',
                academyName: '经济管理学院',
                teacherNum: '23',
                volunteerNum: '123',
                answerNum: '90',
                resolveNum: '235'
              },
              {
                index: '06',
                academyName: '经济管理学院',
                teacherNum: '23',
                volunteerNum: '123',
                answerNum: '90',
                resolveNum: '235'
              },
           
              
        ],
        subjectDataSource:[
          {
              index: '01',
              subjectName: '经济管理学院',
              askPersonNum: '23',
              askQuestionNum: '123',
              answerNum: '90',
              resolveNum: '235'
            },
            {
              index: '02',
              subjectName: '经济管理学院',
              askPersonNum: '23',
              askQuestionNum: '123',
              answerNum: '90',
              resolveNum: '235'
            },
            {
              index: '03',
              subjectName: '经济管理学院',
              askPersonNum: '23',
              askQuestionNum: '123',
              answerNum: '90',
              resolveNum: '235'
            },
            {
              index: '04',
              subjectName: '经济管理学院',
              askPersonNum: '23',
              askQuestionNum: '123',
              answerNum: '90',
              resolveNum: '235'
            },
            {
              index: '05',
              subjectName: '经济管理学院',
              askPersonNum: '23',
              askQuestionNum: '123',
              answerNum: '90',
              resolveNum: '235'
            },
            {
              index: '06',
              subjectName: '经济管理学院',
              askPersonNum: '23',
              askQuestionNum: '123',
              answerNum: '90',
              resolveNum: '235'
            },
         
            
      ],
      
    }
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
                    pagination={{ pageSize: 5 }} 
                    dataSource={this.state.volunteerDataSource}
                    columns={volunteerColumns} 
                    rowKey="index"/>
                    </div>
                </div>
                <div className="home-list2">
                    <AdminTopbar tag="学科相关" timeShow='true'/>
                    <div className="home-list-content2">
                    <Table 
                    bordered
                    size="small"
                    align="center"
                    pagination={{ pageSize: 5 }} 
                    dataSource={this.state.subjectDataSource}
                    columns={subjectColumns} 
                    rowKey="index"/>
                    </div>
                </div>
          </div>
        )
    }
}
