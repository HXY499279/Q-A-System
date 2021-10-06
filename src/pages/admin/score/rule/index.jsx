import React, { Component } from 'react'
import { Tag,Button,Modal ,Input, message} from 'antd';


//?引入localstorage模块
import storageUtils from '@/utils/storageUtils'

//?引入请求函数
import {reqAllRules,reqUpdateRule} from '@/api/index'
const { TextArea } = Input;
export default class Rule extends Component {
    state = {
        adminId:null,
        ruleArr:[],
        scoreIsModalVisible:false,
        preRule:null,
        preScore:null,
        ruleType:null,
        newScore:null,
        ruleInfo:null
        
    }
    componentDidMount = () => {
        //?获取管理者ID
        const adminId = storageUtils.getUser().adminId;
        // const {adminId} = memoryUtils.user;
        this.setState({adminId})
        this.initRule();
       
    }
    initRule = () => {
        reqAllRules()
        .then(res=>{
            console.log(res.data)
            this.setState({ruleArr:res.data})
        })
    }
      //?点击修改
      showChange = (e)=> {
        console.log(e)
        this.setState({
            scoreIsModalVisible:true,
            preRule:e.ruleInfo,
            preScore:e.score,
            ruleType:e.ruleType
        })
       
       
    }
    //?确定修改回调函数
    handlescore = () => {
        const {newScore,ruleType,adminId,ruleInfo} = this.state;
        let param = {
            newScore:Number(newScore),
            ruleType:Number(ruleType),
            adminId:Number(adminId),
            ruleInfo
        }
        reqUpdateRule(param)
        .then(res=>{
            if(res.code == 1){
                message.success("修改成功")
                this.initRule();
            }else{
                message.error("修改失败")
            }
            console.log(res)
        })
        this.setState({scoreIsModalVisible:false})
        
    }
    cancelscore = () => {
        Modal.destroyAll();
        this.setState({scoreIsModalVisible:false})
    }
    ScoreChange = e => {
        console.log(e.target.value);
        this.setState({newScore:e.target.value})
    }
    ruleChange = e => {
        console.log(e.target.value);
        this.setState({ruleInfo:e.target.value})
    }
    render() {
        const {ruleArr,scoreIsModalVisible,preRule,preScore} = this.state;
        return (
            <div>
                <ul>
                    {ruleArr.map((item,index) => (
                       <div key={index}>
                            <Tag  color="lime">
                                <li >{item.ruleInfo}</li>
                            </Tag>
                            <Button type="primary" onClick={() => this.showChange(item)}>修改</Button>
                       </div>
                        ))
                    }
                   
                </ul>
                <Modal  destroyOnClose title="修改规则" visible={scoreIsModalVisible} onOk={this.handlescore} onCancel={this.cancelscore}>   
                <ul>
                    <li>规则：
                        <TextArea placeholder={preRule} allowClear style={{width:420}} onChange={this.ruleChange} />
                    </li>
                    <br></br>
                    <li>积分：
                    <Input placeholder={preScore} allowClear style={{width:160}} onChange={this.ScoreChange} />

                    </li>
                </ul>
                  
                </Modal>
                {/* <ul style={{backgroundColor:"#D2F1E3",padding:8,borderRadius:"3px"}}>
                    总积分 = <Input style={{width:50}}/> *R1 +
                             <Input style={{width:50}}/> *R1 +
                             <Input style={{width:50}}/> *R1 +
                             <Input style={{width:50}}/> *R1 
                </ul> */}
                {/* <ul style={{textAlign:'center'}}>
                    <Button type="primary">保存</Button>
                    <Button type="primary" style={{marginLeft:'20px'}}>导出</Button>
                </ul> */}
            </div>
        )
    }
}
