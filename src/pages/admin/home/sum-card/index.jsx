import React, { Component,Fragment } from 'react'
import { Card } from 'antd';

import './index.less'

//? 在 antd 中使用阿里图标
import { createFromIconfontCN } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2372127_cicuaidwmxq.js',
  });


export default class SumCard extends Component {
    state = {
        sumConfig:[
            {
                icon: 'icon-denglu-duanxin',
                num: '12334',
                intro: '今日登录人数'
            },
            {
                icon: 'icon-tiwen',
                num: '12234',
                intro: '今日提问人数'
            },
            {
                icon: 'icon-huida',
                num: '12314',
                intro: '今日回答人数'
            },
            {
                icon: 'icon-wenti',
                num: '11234',
                intro: '今日解决问题数量'
            }
        ]
    }
    render() {
        return (
            <Fragment>
                {
                    this.state.sumConfig.map((sumObj) => {
                        return (
                            <Card.Grid className='card-grid' key={sumObj.num}>
                                <IconFont className="sum-icon"  type={sumObj.icon}/>
                                <div>
                                    <h1>2345</h1>
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
