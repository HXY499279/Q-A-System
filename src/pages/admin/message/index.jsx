import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import AdminTopbar from "../../../components/admin-topbar";
//?引入localstorage模块
import storageUtils from '@/utils/storageUtils'
//? antd
import { Table, Input, Button, DatePicker,Select,Space,message} from 'antd';
import { SearchOutlined, DownloadOutlined  } from '@ant-design/icons';
import {reqListNews,reqAddNews,reqDeleteNewsById,reqUpdateNews,reqGetNews} from '@/api/index'
import './index.less'
const { TextArea } = Input;
const { Option } = Select;
export default class Message extends Component {
    state = {
        adminId:null,
        timeType:"year",
        newsId:null,
        pageSize:4,
        total:null,
        title:null,
        adminName:null,
        publishTime:null,
        content:null,
        msgDataSource:[]
    }
    componentDidMount = () => {
        this.setState({adminId:storageUtils.getUser().adminId})
        let param = {
            currentPage:1,
            pageSize:this.state.pageSize
        }
        
        this.initMsgTable(param)
    }

    async initMsgTable (param) {
        const res = await reqListNews(param);
        const {list} = res.data;
        const {totalRows} = res.data.pageInfo
        this.setState({msgDataSource:list,total:totalRows})
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
       
        authodSearch = (e) => {
        //   console.log(e.target.value)
        //   console.log(e)
          if(e.target.value == ""){
              this.setState({
                adminName: null
              })
          }else{
            this.setState({
                adminName: e.target.value
            })
          }
            
        }
        txtSearch = (e) => {
        //   console.log(e.target.value)
        //   console.log(e)
          if(e.target.value == ""){
              this.setState({
                content: null
              })
          }else{
            this.setState({
                content: e.target.value
            })
          }
            
        }

        //? 时间选择器回调函数
        onChange = (date, dateStrings) => {
            console.log(dateStrings)
            if(dateStrings == '') {
                this.setState({
                    publishTime:null
                })
            }else{
                this.setState({
                    publishTime:dateStrings
                })
            }  
        }

     

      //?查看资讯详情的回调函数
    //   goMsgDetail = (e) => {
    //       console.log(e)
    //   }

    //?实现分页
    handleChangeMsg= (value) =>{
        console.log(value)
        const {title,adminName,publishTime} = this.state;
        let param = {
            currentPage:value.current,
            pageSize:value.pageSize,
            title,
            adminName,
            publishTime
        }

        this.initMsgTable(param)
    }
    //?实现搜索
    search = () => {
        const {title,adminName,publishTime,pageSize} = this.state;
        let param = {
            currentPage:1,
            pageSize,
            title,
            adminName,
            publishTime
        }

        this.initMsgTable(param)
    }
    //?发布资讯
    publish = () => {
        let { title,
            content,
            adminId} = this.state;
        content = content.replace(/[\n]/g,"\\n");
        content = content.replace(/[ ]/g,'&nbsp;');
        let param = {
            title,
            adminId,
            content
        }
        
        reqAddNews(param)
        .then(res=>{
            console.log(res)
            if(res.code == 1) {
                message.success("发布资讯成功！")
                this.setState({
                    title:null,
                    content:null,
                    adminName:null
                })
            }
            this.search()
        })
    }
     //?修改编辑的回调函数
     showEditMsg = (e) => {
         let _this = this;
         let param = {
            newsId:e
         }
         reqGetNews(param)
        .then(res=>{
            if(res.code == 1){
                message.success("请查看上方咨询编辑")
                let {title,
                    content,
                    adminName} = res.data
                    content = content.replace(/&nbsp;/ig, ' ');
                    content = content.replace(/\\n/gi,'\n')
                console.log(res)
                this.setState({
                    title,
                    content,
                    adminName,
                    newsId:e
                })
            }
        
        })
        
      }
      //?确定修改
      update = () => {
        const {title,
            content,
            adminName,
            adminId,
            newsId} = this.state
            content = content.replace(/[\n]/g,"\\n");
            content = content.replace(/[ ]/g,'&nbsp;');
        let param = {
            newsId,
            title,
            content,
            adminName,
            adminId
        }
        reqUpdateNews(param)
        .then(res=>{
            if(res.code == 1){
                message.success("修改成功！")
                this.setState({
                    title:null,
                    content:null,
                    adminName:null,
                })
            }
            console.log(res)
            this.search()
        })
      }
      //?删除资讯
      deleteMsg = (e) => {
        let param = {
            adminId:this.state.adminId,
            newsId:e
        }
        reqDeleteNewsById(param)
        .then(res=>{
            console.log(res)
            if(res.code == 1) {
                message.success("成功删除资讯！")
                this.search()
            }
        })
      }

    
    render() {
        const msgColumns = [
            {
                title: '标题',
                dataIndex: 'title',
                width: '10%',
                align: 'center'
              },
              {
                title: '内容',
                dataIndex: 'content',
                // render:text=>(<p>{text.substring(0,35)+"..."}</p>),

                render:text=>(<p dangerouslySetInnerHTML = {{__html:text.substring(0,35)+"..."}} ></p>),
                align: 'center'
              },
              {
                title: '浏览量',
                dataIndex: 'readCount',
                width: '7%',
                align: 'center'
              },
              {
                title: '作者',
                dataIndex: 'adminName',
                width: '10%',
                align: 'center'
              },
              {
                title: '发布时间',
                dataIndex: 'publishTime',
                width: '15%',
                align: 'center'
              },
              {
                title: '操作',
                dataIndex: 'newsId',
                width: '10%',
                render: (newsId) => (<>{/*<Link to="/admin/messageDetail" onClick={() => this.goMsgDetail(newsId)}>查看 </Link>*/}<a onClick={() => this.showEditMsg(newsId)}>修改</a> <a onClick={() => this.deleteMsg(newsId)}>删除</a></>),
                align: 'center'
              }
        ];
        const {title,
            adminName,
            content,
            timeType} = this.state
        return (
            <div>
                <div className="msg-edit">
                    <AdminTopbar tag="资讯编辑" timeShow='false' />
                    <div className="msg-edit-content">
                        <ul>
                            <li>标题：<Input value={title} onChange={ e => this.titleSearch(e) } style={{width:600}}/></li>
                            <li>作者：<Input value={adminName} onChange={ e => this.authodSearch(e) } style={{width:180}}/></li>
                            <li><div>正文：</div><TextArea value={content} onChange={ e => this.txtSearch(e) } autoSize style={{width:'90%',margin:'-20px 0px 0px 40px'}}/></li>
                        </ul>
                        <div style={{textAlign:"center",padding:'30px'}}>
                            <Button type="primary" onClick={this.publish}>发布 </Button> &nbsp;
                            <Button type="primary" onClick={this.update}> 修改</Button>
                        </div>
                       
                            
                    </div>
                </div>
                <div className="msg-search">
                    <AdminTopbar tag="资讯列表" timeShow='false' />
                    <div className="msg-search-top">
                        <ul>
                            <li>标题：<Input onChange={ e => this.titleSearch(e) }  style={{width:200}}/></li>
                            <li>发布者：<Input onChange={ e => this.authodSearch(e) } style={{width:200}}/></li>
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
                        </ul>
                        <ul>
                            <li>
                            <Button type="primary" onClick={this.search} icon={<SearchOutlined />}>
                                搜索
                            </Button>
                            </li>
                            <a href="https://xscqa.cqupt.edu.cn/question/admin/exportExcel?type=3">
                                <Button type="primary" icon={<DownloadOutlined />}>
                                    导出
                                </Button>
                            </a> 
                        </ul>    
                    </div>
                    <div className="msg-search-list">
                    <Table 
                    bordered
                    align="center"
                    onChange={this.handleChangeMsg}
                    pagination={{ "pageSize": this.state.pageSize,"total":this.state.total }} 
                    dataSource={this.state.msgDataSource}
                    columns={msgColumns} 
                    rowKey="newsId"/>
                    </div>
                         
                </div>
            </div>
        )
    }
}
