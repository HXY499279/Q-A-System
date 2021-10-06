import React, { Component } from 'react'
import { Upload, Modal,message ,Button} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {reqListStaticImg} from '@/api/index'
import axios from 'axios'

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
        thefile:null,
        status:0
        
      };
      componentDidMount () {
        this.initPic() 
      }
      initPic () {
        let fileList =[]
        reqListStaticImg()
        .then(res=>{
          console.log(res)
          const {list} = res.data;
          console.log(list.length)
          let lunboArr = []
          for(let i = 0; i < list.length;i++) {
            list[i].url = "https://xscqa.cqupt.edu.cn/question/img"+list[i].url
         
            if(list[i].imgType == this.props.type && this.props.type == 1) {
                lunboArr.push(list[i])
            }
            else if(list[i].imgType == this.props.type){
              fileList.push(list[i])
              this.setState({imgId:list[i].imgId})
            }
        
          }
          if(this.props.type == 1){
            let num = Number(this.props.grade)
            fileList.push(lunboArr[num])
            console.log("ID")
            console.log(lunboArr[num].imgId)
            this.setState({fileList,imgId:lunboArr[num].imgId})
            console.log(this.state.imgId)
          }else{
            this.setState({fileList})
          } 
          console.log(fileList)
        })
      }
      



    beforeUpload = (file, fileList) => {
      console.log("上传前")
      console.log(file)
      this.setState({
        thefile:file,
        status:1,
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

        
        console.log(fileList)
        // const {imgId} = file
        // this.setState({imgId})
        this.setState({ fileList });
        if(file.status == 'done'){
          message.success("修改图片成功！")
          this.setState({status:0})
        }
        
      }

      // componentWillUnmount(){
      //   this.setState = () => false
      // }
      //?确定修改
      change = () => {
        let formData = new FormData();
        formData.append('img',this.state.thefile);
        formData.append('imgId', this.state.imgId)
        formData.append('adminId', storageUtils.getUser().adminId)
        formData.append('type', this.props.type)
          axios({
            method: 'post',
            url: "https://xscqa.cqupt.edu.cn/question/admin/updateStaticImg",
            headers: { 'Content-type': 'multipart/form-data;charset=UTF-8' },
            data: formData
          })
          .then(res=>{
            console.log(res)
            if(res.data.code == 1){
              message.success("修改成功")
              this.initPic()
            }
          })
      }

    render() {
        const { previewVisible, previewImage, fileList, previewTitle,imgId } = this.state;
        
        const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
        );
        // const type = this.props.type;
        const num = this.props.num;
        // const adminId = storageUtils.getUser().adminId
        // let paramData = {
        //   adminId,
        //   imgId,
        //   type
        // }
        
        return (
            <div>
            <Upload
            // action="https://xscqa.cqupt.edu.cn/question/admin/updateStaticImg"
            action="123"
            name='img'
            // data={paramData}
            beforeUpload={this.beforeUpload}
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
            key={Math.floor(Math.random() * 10000)}
            // maxCount={3}
            >
            {fileList.length >= num ? '' : uploadButton}
            </Upload>
            <Button 
            type="primary" 
            disabled={this.state.status == 0} 
            onClick={this.change}
            style={{ marginLeft: 5 }}
            >确定修改</Button>
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
