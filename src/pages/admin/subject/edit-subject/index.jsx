import React, { Component } from 'react'

import { 
  Input,
  Upload, 
  Modal} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default class EditSubject extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
        ],
      };
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
    handleChange = ({ fileList }) => this.setState({ fileList });
    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
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
        return (
            <>
                     <ul style={ulStyle}>
                       <span  style={spanStyle}>学科图标：</span>
                        <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                        >
                        {fileList.length >= 8 ? null : uploadButton}
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
                    <ul style={ulStyle}>
                      <span style={spanStyle}>学科名称：</span>
                      <TextArea autoSize defaultValue="我是一个要被修改的学科名称" />
                    </ul>
                    <ul style={ulStyle}>
                      <span style={spanStyle}>所属学院：</span>
                      <TextArea autoSize defaultValue="我是一个要被修改的学科所属学院" />
                    </ul>
                    <ul style={{
                      display:'flex',
                      justifyContent:"space-between"
                    }}>
                      <span style={spanStyle}>学科简介：</span>
                       <TextArea autoSize defaultValue="我是要被修改的学科的内容我是要被修改的学科的内容我是要被修改的学科的内容我是要被修改的学科的内容我是要被修改的学科的内容我是要被修改的学科的内容我是要被修改的学科的内容我是要被修改的学科的内容我是要被修改的学科的内容我是要被修改的学科的内容我是要被修改的学科的内容" />
                    </ul>
                    <ul style={{
                      display:'flex',
                      justifyContent:"space-between"
                    }}>
                      <span style={spanStyle}>学科备注：</span>
                       <TextArea autoSize defaultValue="我是要被修改的学科的简介我是要被修改的学科的简介我是要被修改的学科的简介我是要被修改的学科的简介我是要被修改的学科的简介我是要被修改的学科的简介我是要被修改的学科的简介我是要被修改的学科的简介我是要被修改的学科的简介我是要被修改的学科的简介我是要被修改的学科的简介" />
                    </ul>                      
            </>
        )
    }
}
