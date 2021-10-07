import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import AdminTopbar from "../../../components/admin-topbar";
//?引入localstorage模块
import storageUtils from '@/utils/storageUtils'
//? antd
import { Table, Input, Button, DatePicker,Select,Space,message,Popconfirm} from 'antd';
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
        pageSize:8,
        total:null,
        title:null,
        adminName:null,
        publishTime:null,
        content:null,
        msgDataSource:[],
        searchTitle: null,
        searchAdminName: null,
        serachContent: null,

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
        console.log(list)
        const {totalRows} = res.data.pageInfo
        this.setState({msgDataSource:list,total:totalRows})
    }

 

    //?监听输入框的值，编辑资讯部分
    title = (e) => {
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
    authod = (e) => {
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

    //?监听输入框的值
    titleSearch = (e) => {
        //   console.log(e.target.value)
        //   console.log(e)
          if(e.target.value == ""){
              this.setState({
                searchTitle: null
              })
          }else{
            this.setState({
                searchTitle: e.target.value
            })
          }
            
        }
       
    authodSearch = (e) => {
        //   console.log(e.target.value)
        //   console.log(e)
          if(e.target.value == ""){
              this.setState({
                searchAdminName: null
              })
          }else{
            this.setState({
                searchAdminName: e.target.value
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
        const {searchTitle,searchAdminName,publishTime} = this.state;
        let param = {
            title:searchTitle,
            adminName:searchAdminName,
            publishTime,
            currentPage:value.current,
            pageSize:value.pageSize,
        }

        this.initMsgTable(param)
    }
    //?实现搜索
    search = () => {
        
        let {searchTitle,searchAdminName,publishTime,pageSize} = this.state;
        let title = searchTitle;
        let adminName = searchAdminName
        console.log(searchTitle)
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
            if(content != null){
                content = content.replace(/[\n]/g,"\\n");
                content = content.replace(/[ ]/g,'&nbsp;');
            }
        let param = {
            title,
            adminId,
            content
        }
        if(title == null || content == null){
            message.error("请填写完资讯后再发布！")
        }else{
            reqAddNews(param)
            .then(res=>{
                console.log(res)
                if(res.code == 1 && res.data != false) {
                    message.success("发布资讯成功！")
                    // this.setState({
                    //     title:null,
                    //     content:null,
                    //     adminName:null
                    // })
                }else{
                    message.error("发布资讯失败！")
                }
                let param = {
                    currentPage:1,
                    pageSize:this.state.pageSize
                }
                this.initMsgTable(param)
            })
        }
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
                _this.setState({
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
        let {title,
            content,
            adminName,
            adminId,
            newsId} = this.state
            if (content != null){
                content = content.replace(/[ ]/g,'&nbsp;');
                content = content.replace(/[\n]/g,"\\n");
            }
        let param = {
            newsId,
            title,
            content,
            adminName,
            adminId
        }
        reqUpdateNews(param)
        .then(res=>{
            if(res.data){
                message.success("修改成功！")
                // this.setState({
                //     title:null,
                //     content:null,
                //     adminName:null,
                // })
                let param = {
                    currentPage:1,
                    pageSize:this.state.pageSize
                }
                this.initMsgTable(param)
            }else{
                message.error("修改失败！")
                // this.setState({
                //     title:null,
                //     content:null,
                //     adminName:null,
                // })
            }
        })
        .catch(err=>{
            console.log(err)
            message.error("修改失败")
            // this.setState({
            //     title:null,
            //     content:null,
            //     adminName:null,
            // })
        })
      }
      //清空内容
      clearAll = () => {
            this.setState({
                    title:null,
                    content:null,
                    adminName:null,
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
                render:text=>(<p dangerouslySetInnerHTML = {{__html:text.substring(0,8)+"..."}} ></p>),
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
                render: (newsId) => (<>{/*<Link to="/admin/messageDetail" onClick={() => this.goMsgDetail(newsId)}>查看 </Link>*/}<a onClick={() => this.showEditMsg(newsId)}>修改</a> 
                {/* <a >删除</a> */}
                <Popconfirm title="Are you sure？" okText="Yes" cancelText="No"  onConfirm={() => this.deleteMsg(newsId)}>
                    <a href="#">删除</a>
                </Popconfirm>
                </>),
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
                            <li>标题：<Input value={title} onChange={ e => this.title(e) } style={{width:600}}/></li>
                            <li>作者：<Input value={adminName} onChange={ e => this.authod(e) } style={{width:180}}/></li>
                            <li><div>正文：</div><TextArea value={content} onChange={ e => this.txtSearch(e) } autoSize style={{width:'90%',margin:'-20px 0px 0px 40px'}}/></li>
                        </ul>
                        <div style={{textAlign:"center",padding:'30px'}}>
                            <Button type="primary" onClick={this.publish}>发布 </Button> &nbsp;
                            <Button type="primary" onClick={this.update}> 修改 </Button> &nbsp;
                            <Button type="primary" onClick={this.clearAll}> 清空</Button>
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
