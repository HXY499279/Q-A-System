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
        url:"123",
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
            imgPath = 'https://xscqa.cqupt.edu.cn/question/img/' + imgPath;
            const fileList = [{url:imgPath}]
            this.setState({
              title,
              describes,
              imgpath,
              publishTime,
              updateTime,
              fileList
            })
      qTitleStore.dispatch(questionChangeTitle(this.state.title));
      qDescribeStore.dispatch(questionChangeDescribe(this.state.describes));


      }
      beforeUpload (file, fileList) {
        console.log("上传前")
        console.log(file)
        qImgStore.dispatch(questionChangeImg(file))
        console.log(qImgStore.getState())
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
      // console.log(file.status)
      this.setState({ fileList });
      console.log(fileList)
      
      // console.log("存图片文件")
     
      if(file.status == 'done'){
        message.success("修改图片成功！")
      }
    }
   


    //?监控表单内容变化
    titleTxtChanged = (e) => {
     
      
      console.log(e.target.value)
      // if(e.target.value == ''){
      //   this.setState({
      //     title: null
      //   })
      // }else{
      //   this.setState({
      //     title: e.target.value
      //   })
        
      // }
      if(e.target.value == ''){
        this.setState({
          title: null
        })
      }else{
        this.setState({
          title: e.target.value
        })
        
      }
      qTitleStore.dispatch(questionChangeTitle(e.target.value));
      // console.log(qTitleStore.getState());
    }
    describeTxtChanged = (e) => {
      if(e.target.value == ''){
        this.setState({
          describes: null
        })
      }else{
        this.setState({
          describes: e.target.value
        })
        
      }

   
      qDescribeStore.dispatch(questionChangeDescribe(e.target.value));
      // console.log("redux")
      // console.log(qDescribeStore.getState());
    }
    render() {
        const { previewVisible, previewImage, fileList, previewTitle, publishTime, updateTime,url } = this.state;
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
        let {title,describes} = this.state ;
        // let title = this.state.title ?
        console.log(describes)
        title == null ? title = '': title = title.replace(/&nbsp;/ig, ' ');
        title == null ? title = '':title = title.replace(/\\n/gi,'\n')
        describes == null ? describes = '': describes = describes.replace(/&nbsp;/ig, ' ');
        describes == null ? describes = '':describes = describes.replace(/\\n/gi,'\n')
        return (
            <>
                    <ul style={ulStyle}>
                      <span style={spanStyle}>标题：</span>
                      <TextArea onChange={ e => this.titleTxtChanged(e)} autoSize value={title}/>
                    </ul>
                    <ul style={{
                      display:'flex',
                      justifyContent:"space-between"
                    }}>
                      <span style={spanStyle}>描述：</span>
                       <TextArea autoSize onChange={ e => this.describeTxtChanged(e)} value={describes} />
                    </ul>
                    <ul style={ulStyle}>
                       <span  style={spanStyle}>图片：</span>
                        <Upload
                        action={url}
                        name="img"
                        data={paramData}
                        beforeUpload={this.beforeUpload}
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
