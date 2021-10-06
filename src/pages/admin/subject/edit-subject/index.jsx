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
        college1:null,
        iconPath:null,
        note:"",
        url:"123",
        subjectId:null,
        subjectInfo1:null,
        subjectName1:null,
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        collegeData:[],
        img:null,
        fileList: [],
      };
     


      componentDidMount = () => {
        const adminId = storageUtils.getUser().adminId
         this.setState({
           adminId,
           subjectId:Number(subjectIdStore.getState())
         })
        
         if(this.props.type == "change"){
           reqGetSubjectById({subjectId:Number(subjectIdStore.getState())})
           .then(res=>{
             console.log(res)
             const college1 = res.data.college;
             const subjectInfo1 = res.data.subjectInfo;
             const subjectName1 = res.data.subjectName;
             const {note} = res.data
             let {iconPath} = res.data
             iconPath = 'https://xscqa.cqupt.edu.cn/question/img/' + iconPath;
             const fileList = [{url:iconPath}]
             // console.log(college)
             this.setState({
               college1,iconPath,note,subjectInfo1,subjectName1,fileList
             })
             console.log("这下有了")
             console.log(this.state.college1)
             collegeStore.dispatch(college(this.state.college1));
            subjectNameStore.dispatch(subjectName(this.state.subjectName1));
            subjectInfoStore.dispatch(subjectInfo(this.state.subjectInfo1));
            subjectNoteStore.dispatch(subjectNote(this.state.note));
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
                  college1: null
                })
            }else{
              collegeStore.dispatch(college(e))
                this.setState({
                  college1:e
                })
            }  
      }
      nameTxtChanged = (e) => {
       
        if(e.target.value == ""){
          subjectNameStore.dispatch(subjectName(null))
          this.setState({
            subjectName1: null
          })
        }else{
          subjectNameStore.dispatch(subjectName(e.target.value))
          this.setState({
              subjectName1: e.target.value
          })
        }
      }
      infoChanged = (e) => {
        if(e.target.value == ""){
          subjectInfoStore.dispatch(subjectInfo(null))
          this.setState({
            subjectInfo1: null
          })
        }else{
          subjectInfoStore.dispatch(subjectInfo(e.target.value))
          this.setState({
              subjectInfo1: e.target.value
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
        subjectIconStore.dispatch(subjectIcon(file))
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
          subjectName1,
          subjectInfo1,
          subjectId,
          collegeData,
          college1,
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
                        <img alt="example" style={{ width: '100%' }} src={'https://xscqa.cqupt.edu.cn/question/img'+iconPath} />
                        </Modal>
                    </ul>
                    <ul style={ulStyle}>
                      <span style={spanStyle}>学科名称：</span>
                      <TextArea autoSize onChange={ e => this.nameTxtChanged(e)} value={subjectName1}/>
                    </ul>
                    <ul style={ulStyle}>
                      <span style={spanStyle}>所属学院：
                          <Select  style={{ width: 200 }} onChange={this.handleCollegeChange} value={college1} >
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
                       <TextArea autoSize onChange={ e => this.infoChanged(e)} value={subjectInfo1}  />
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
