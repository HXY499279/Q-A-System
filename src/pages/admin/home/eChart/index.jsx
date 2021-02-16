import React, { Component } from 'react'


import './index.less'
import AdminTopbar from "../../../../components/admin-topbar";

export default class EChart extends Component {

    render() {
        return (
           <div className="echart">
                <div className="echart1">
                    <AdminTopbar tag="登录相关" timeShow='true' />
                    <div className="echart-content1">
                        <div>曲线图</div>
                        <div>饼状图</div>
                    </div>
                </div>
                <div className="echart2">
                    <AdminTopbar tag="问题相关" timeShow='true'/>
                    <div className="echart-content2">
                        <div>曲线图</div>
                        <div>饼状图</div>
                    </div>
                </div>

           </div>
           

        )
    }
}
