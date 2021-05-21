import React, { Component } from 'react'
//?引入localstorage模块
import storageUtils from '@/utils/storageUtils'
import {subjectIdStore,subjectNameStore,collegeStore,subjectInfoStore,subjectNoteStore,subjectIconStore} from '@/redux/store'
import {subjectName,college,subjectInfo,subjectNote,subjectIcon} from "@/redux/action"
import { 
  Input,
  Upload, 
  Modal,
  Select,
  message} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {reqGetSubjectById,reqGetAllCollege} from '@/api/index'
const { TextArea } = Input;
const { Option } = Select;

function getBase64(file) {
  console.log('进入64')
  console.log(file)
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class EditSubject extends Component {
    state = {
        adminId:null,
        college:null,
        iconPath:null,
        note:"",
        url:"123",
        subjectId:null,
        subjectInfo:null,
        subjectName:null,
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        collegeData:[],
        img:null,
        fileList: [],
      };
      componentDidMount = () => {
        // if(this.props.type == "add"){
        //   this.setState({
        //     url:'/admin/addSubject'
        //   })
        // }else{
        //   this.setState({
        //     url:'/admin/updateSubject'
        //   })
        // }
        
       const adminId = storageUtils.getUser().adminId
        this.setState({
          adminId,
          subjectId:Number(subjectIdStore.getState())
        })
       
        if(this.props.type == "change"){
          reqGetSubjectById({subjectId:Number(subjectIdStore.getState())})
          .then(res=>{
            console.log(res)
            const {college,note,subjectInfo,subjectName} = res.data
            let {iconPath} = res.data
            iconPath = 'http://202.202.43.250:8080/img/' + iconPath;
            const fileList = [{url:iconPath}]
            // console.log(college)
            this.setState({
              college,iconPath,note,subjectInfo,subjectName,fileList
            })
          });
        }
        reqGetAllCollege()
        .then(res=>{
          console.log(res)
          this.setState({
            collegeData:res.data
          })
        })
      }

      //?监听学院变化
      handleCollegeChange = (e) => {
        console.log(e)
        if(e == ''){
          collegeStore.dispatch(college(null))
                this.setState({
                  college: null
                })
            }else{
              collegeStore.dispatch(college(e))
                this.setState({
                  college:e
                })
            }  
      }
      nameTxtChanged = (e) => {
        if(e.target.value == ""){
          subjectNameStore.dispatch(subjectName(null))
          this.setState({
            subjectName: null
          })
        }else{
          subjectNameStore.dispatch(subjectName(e.target.value))
          this.setState({
              subjectName: e.target.value
          })
        }
      }
      infoChanged = (e) => {
        if(e.target.value == ""){
          subjectInfoStore.dispatch(subjectInfo(null))
          this.setState({
            subjectInfo: null
          })
        }else{
          subjectInfoStore.dispatch(subjectInfo(e.target.value))
          this.setState({
              subjectInfo: e.target.value
          })
        }

      }
      noteChanged = (e) => {
        if(e.target.value == ""){
          subjectNoteStore.dispatch(subjectNote(null))
          this.setState({
            note: null
          })
        }else{
          subjectNoteStore.dispatch(subjectNote(e.target.value))
          this.setState({
              note: e.target.value
          })
        }
      }


      beforeUpload (file, fileList) {
        console.log("上传前")
        console.log(file)
        // subjectIconStore.dispatch(subjectIcon(file))
      }
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
  
      this.setState({
        previewImage: file.url || file.preview,
        previewVisible: true,
        previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
      });
    };
    handleChange = ({file, fileList }) => {
      subjectIconStore.dispatch(subjectIcon(file))
      console.log(file)
      // getBase64(file)
      // .then(res=>{
      //   console.log("我想转换为2进制")
      //   console.log(res)
      // })
      this.setState({ fileList })
      if(file.status == 'done' && this.props.type == "add"){
        message.success("成功添加图标！")
      }else if(file.status == 'done' && this.props.type == "change"){
        message.success("成功修改图标！")
      }
    };
    render() {
        const {
          adminId,
          previewVisible, 
          previewImage, 
          fileList,
          previewTitle,
          previewTitlesubjectName,
          subjectName,
          subjectInfo,
          subjectId,
          collegeData,
          college,
          url,
          note,
          iconPath } = this.state;
        const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
        );
        const ulStyle = {
          display:'flex',
          justifyContent:"space-between"
        }
        const spanStyle = {whiteSpace:'nowrap'}
        const paramData = {
          subjectId,adminId
        }
        return (
            <>
                     <ul style={ulStyle}>
                       <span  style={spanStyle}>学科图标：</span>
                        <Upload
                        action={url}
                        name="icon"
                        beforeUpload={this.beforeUpload}
                        data={paramData}
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                        >
                        {fileList.length >= 1 ? null : uploadButton}
                        </Upload>
                        <Modal
                        visible={previewVisible}
                        title={previewTitle}
                        
                        footer={null}
                        onCancel={this.handleCancel}
                        >
                        <img alt="example" style={{ width: '100%' }} src={'http://202.202.43.250:8080/img'+iconPath} />
                        </Modal>
                    </ul>
                    <ul style={ulStyle}>
                      <span style={spanStyle}>学科名称：</span>
                      <TextArea autoSize onChange={ e => this.nameTxtChanged(e)} value={subjectName}/>
                    </ul>
                    <ul style={ulStyle}>
                      <span style={spanStyle}>所属学院：
                          <Select  style={{ width: 200 }} onChange={this.handleCollegeChange} value={college} >
                            {collegeData.map((obj) => {
                              return(
                                <Option key={obj} value={obj}>{obj}</Option>
                              ) 
                            })}
                          </Select>
                      </span>
                      
                    </ul>
                    <ul style={{
                      display:'flex',
                      justifyContent:"space-between"
                    }}>
                      <span style={spanStyle}>学科简介：</span>
                       <TextArea autoSize onChange={ e => this.infoChanged(e)} value={subjectInfo}  />
                    </ul>
                    <ul style={{
                      display:'flex',
                      justifyContent:"space-between"
                    }}>
                      <span style={spanStyle}>学科备注：</span>
                       <TextArea autoSize onChange={ e => this.noteChanged(e)} value={note}/>
                    </ul>                      
            </>
        )
    }
}
