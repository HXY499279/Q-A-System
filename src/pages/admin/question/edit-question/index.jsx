import React, { Component } from 'react'
import {qID,qTitleStore,qDescribeStore,qImgStore} from '@/redux/store'
import {questionChangeTitle,questionChangeDescribe,questionChangeImg} from '@/redux/action'
import { 
  Input,
  Upload, 
  Modal,
  message} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
//?引入localstorage模块
import storageUtils from '@/utils/storageUtils'
import {reqGetQuestionById} from '@/api/index'
const { TextArea } = Input;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default class EditQuestion extends Component {
    state = {
        title:null,
        describes:'null',
        imgPath:null,
        publishTime:null,
        updateTime:null,
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: []
      };
    async componentDidMount () {
        let questionId = qID.getState();
            const res = await reqGetQuestionById ({questionId})
            console.log(res);
            let {title,describes,imgpath,publishTime,updateTime,imgPath} = res.data;
            imgPath = 'http://202.202.43.250:8080/img/' + imgPath;
            const fileList = [{url:imgPath}]
            this.setState({
              title,
              describes,
              imgpath,
              publishTime,
              updateTime,
              fileList
            })
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
      console.log(file.status)
      this.setState({ fileList });
      console.log(fileList)
      qImgStore.dispatch(questionChangeImg(file))
      console.log("存图片文件")
      console.log(qImgStore.getState())
      if(file.status == 'done'){
        message.success("修改图片成功！")
      }
    }
   


    //?监控表单内容变化
    titleTxtChanged = (e) => {
      console.log(e.target.value)
      this.setState({
        title: e.target.value
      })
      
      qTitleStore.dispatch(questionChangeTitle(e.target.value));
      console.log("redux")
      console.log(qTitleStore.getState());

    }
    describeTxtChanged = (e) => {
      console.log(e.target.value)
      this.setState({
        describes: e.target.value
      })
     
      qDescribeStore.dispatch(questionChangeDescribe(e.target.value));
      console.log("redux")
      console.log(qDescribeStore.getState());
    }

    render() {
        const { previewVisible, previewImage, fileList, previewTitle, publishTime, updateTime } = this.state;
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
        let paramData = {
          questionId:qID.getState(),
          adminId:storageUtils.getUser().adminId
        }
        return (
            <>
                    <ul style={ulStyle}>
                      <span style={spanStyle}>标题：</span>
                      <TextArea onChange={ e => this.titleTxtChanged(e)} autoSize value={this.state.title}/>
                    </ul>
                    <ul style={{
                      display:'flex',
                      justifyContent:"space-between"
                    }}>
                      <span style={spanStyle}>描述：</span>
                       <TextArea autoSize onChange={ e => this.describeTxtChanged(e)} value={this.state.describes} />
                    </ul>
                    <ul style={ulStyle}>
                       <span  style={spanStyle}>图片：</span>
                        <Upload
                        action="/admin/updateQuestion"
                        name="img"
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
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                        
            
                    </ul>
                    <ul>
                        时间：{publishTime}创建 —— {updateTime}修改
                    </ul>                         
            </>
        )
    }
}
