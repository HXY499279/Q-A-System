import React, { Component } from 'react'
import { Upload, Modal,message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {reqListStaticImg} from '@/api/index'

//?引入localstorage模块
import storageUtils from '@/utils/storageUtils'

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
export default class UploadImg extends Component {
    state = {
        imgId:null,
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [],
        
      };
      componentDidMount () {
        
        let fileList =[]
        reqListStaticImg()
        .then(res=>{
          console.log(res)
          const {list} = res.data;
          console.log(list.length)
          for(let i = 0; i < list.length;i++) {
            if(list[i].imgType == this.props.type) {
              list[i].url = "https://xscqa.cqupt.edu.cn/question/img"+list[i].url
              fileList.push(list[i])
            }
          }
          this.setState({fileList})
          console.log(fileList)
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
        console.log("看看有没有imgid")
        console.log(file)
        const {imgId} = file
        this.setState({imgId})
        this.setState({ fileList });
        if(file.status == 'done'){
          message.success("修改图片成功！")
        }
      }
    render() {
        const { previewVisible, previewImage, fileList, previewTitle,imgId } = this.state;
        const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
        );
        const type = this.props.type;
        const num = this.props.num;
        const adminId = storageUtils.getUser().adminId
        let paramData = {
          adminId,
          imgId,
          type
        }
        
        return (
            <div>
            <Upload
            action="/admin/updateStaticImg"
            name='img'
            data={paramData}
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
            key={Math.floor(Math.random() * 10000)}
            >
            {fileList.length >= num ? null : uploadButton}
            </Upload>
            <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={this.handleCancel}
            >
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
        )
    }
}
