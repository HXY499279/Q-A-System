import React, { Component,Fragment } from 'react'
import { Card } from 'antd';

import './index.less'

//?引入请求函数
import {reqTodayData} from '@/api/index'

//? 在 antd 中使用阿里图标
import { createFromIconfontCN } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2372127_cicuaidwmxq.js',
  });

export default class SumCard extends Component {
  
    state = {
        dataConfig:{
            loginCount: '',
            questionCount: '',
            answerCount: '',
            solveCount: ''},
    }
    async componentDidMount(){
       const result = await reqTodayData();
    //    console.log(result);
       this.setState({dataConfig:result.data}) 
    }

    render() {
        const {loginCount,questionCount,answerCount,solveCount} = this.state.dataConfig;
        const sumConfig = [
            {
                icon: 'icon-denglu-duanxin',
                num:  loginCount,
                intro: '今日登录人数'
            },
            {
                icon: 'icon-tiwen',
                num:    questionCount,
                intro: '今日提问人数'
            },
            {
                icon: 'icon-huida',
                num:  answerCount,
                intro: '今日回答人数'
            },
            {
                icon: 'icon-wenti',
                num: solveCount,
                intro: '今日解决问题数量'
            }
        ]
        return (
            <Fragment>
                {
                    sumConfig.map((sumObj) => {
                        return (
                            <Card.Grid className='card-grid' key={sumObj.icon}>
                                <IconFont className="sum-icon"  type={sumObj.icon}/>
                                <div>
                                    <h1>{sumObj.num}</h1>
                                    <div>{sumObj.intro}</div>
                                </div>
                            </Card.Grid>
                        )
                    })
                }
            </Fragment>
        )
    }
}
