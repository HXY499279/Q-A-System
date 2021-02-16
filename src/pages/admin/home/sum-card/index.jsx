import React, { Component,Fragment } from 'react'
import { Card } from 'antd';

import './index.less'

//? 在 antd 中使用阿里图标
import { createFromIconfontCN } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2372127_68g0lwlpz9k.js',
  });


export default class SumCard extends Component {
    state = {
        sumConfig:[
            {
                icon: '',
                num: '12334',
                intro: '今日登录人数'
            },
            {
                icon: '',
                num: '12234',
                intro: '今日登录人数'
            },
            {
                icon: '',
                num: '12314',
                intro: '今日登录人数'
            },
            {
                icon: '',
                num: '11234',
                intro: '今日登录人数'
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
                                <IconFont className="sum-icon"  type="icon-user1"/>
                                <div>
                                    <h1>2345</h1>
                                    <div>今日登陆人数</div>
                                </div>
                            </Card.Grid>
                        )
                    })

                }
               
            </Fragment>
        )
    }
}
