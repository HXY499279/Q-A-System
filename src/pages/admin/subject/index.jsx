import React, { Component } from 'react'
import './index.less'
import AdminTopbar from "../../../components/admin-topbar";
import { Table, Modal, Input, Button, Select, DatePicker} from 'antd';
import { SearchOutlined, DownloadOutlined  } from '@ant-design/icons';
import EditSubject from './edit-subject'
import './index.less'
export default class Subject extends Component {
    state = {
        subjectIsModalVisible: false,
        subjectDataSource:[
            {
                index: '01',
                subjectName: '大物',
                academy: '经济管理学院',
                teacher: '23',
                volunteer: '89',
                askNum: '34',
                answerNum: '23',
                resolveNum: '56',
            }
        ]
    }
   //? 点击修改学科回调函数
   showEditSubject = (e) => {
    this.setState({subjectIsModalVisible:true})
    console.log(e)
    console.log('我点击了修改学科')
   }
   handleEdit = () => {
    this.setState({subjectIsModalVisible:false})
    }
    cancelEdit = () => {
        this.setState({subjectIsModalVisible:false})
    }
    render() {
        const subjectColumns = [
            {
                title: '序号',
                dataIndex: 'index',
                align: 'center'
              },
            {
                title: '学科名称',
                dataIndex: 'subjectName',
                align: 'center'
              },
              {
                title: '所属学院',
                dataIndex: 'academy',
                align: 'center'
              },
              {
                title: '教师',
                dataIndex: 'teacher',
                align: 'center'
              },
              {
                title: '志愿者',
                dataIndex: 'volunteer',
                width: '10%',
                align: 'center'
              },
              {
                title: '累计提问',
                dataIndex: 'askNum',
                align: 'center'
              },,
              {
                title: '累计回答',
                dataIndex: 'answerNum',
                align: 'center'
              },
              {
                title: '累计解决',
                dataIndex: 'resolveNum',
                align: 'center'
              },
              {
                title: '操作',
                dataIndex: '',
                render: (e) => (<><a onClick={(e) => this.showEditSubject(e)}>修改</a> <a>删除</a></>),
                align: 'center'
              }
        ]
        const {subjectIsModalVisible} = this.state
        return (
            <div className="subject-search">
                <AdminTopbar tag="学科管理" timeShow='false' />
                <div className="subject-search-top">
                    <ul>
                        <li>学科名称：<Input style={{width:200}}/></li>
                        <li>所属学院：<Input style={{width:200}}/></li>
                    </ul>
                    <ul>
                        <Button type="primary" icon={<SearchOutlined />}>
                            搜索
                        </Button>
                        <Button type="primary" icon={<DownloadOutlined />} style={{marginLeft:30}}>
                            导出
                        </Button>   
                        <Button type="primary" icon={<DownloadOutlined />} style={{marginLeft:30}} onClick={(e) => this.showEditSubject(e)}>
                            添加
                        </Button>   
                    </ul>    
                </div>
                <div className="subject-search-list">
                <Table 
                bordered
                align="center"
                pagination={{ pageSize: 10 }} 
                dataSource={this.state.subjectDataSource}
                columns={subjectColumns} 
                rowKey="index"/>
                </div>
                <Modal title="修改学科" visible={subjectIsModalVisible} onOk={this.handleEdit} onCancel={this.cancelEdit}>
                    <EditSubject/>
                </Modal>
            </div>
        )
    }
}
