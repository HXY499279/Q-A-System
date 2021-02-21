import React, { Component } from 'react'

export default class InformContent extends Component {
    render() {
        const hr = {
            marginBottom:'20px',
            height:'2px',
            border:'none',
            borderTop:'1px solid rgba(128, 128, 128, 0.295)',
        }
        const mydiv = {
            display:'flex', 
            justifyContent:'space-between'
        }
        return (
            <div>
                <div style={mydiv}>
                    <span>aqiuya 的提问被举报</span>
                    <span>2020-02-09 14:00</span>
                </div>
                <hr style={hr}/>
                <div>
                    <div>被举报内容：我是被举报的内容我是被举报的内容我是被举报的内容我是被举报的内容我是被举报的内容我是被举报的内容我是被举报的内容</div>
                    <img src="/css" alt="举报详情图片"/>
                </div>
                <hr style={hr}/>
                <div style={mydiv}>
                    <span>举报者：aqiuya</span>
                    <span>2020-03-09 19:00</span>
                </div>
                <hr style={hr}/>
                <div>
                    举报理由：我是举报理由我是举报理由我是举报理由我是举报理由我是举报理由我是举报理由我是举报理由我是举报理由
                </div>
            </div>
        )
    }
}
