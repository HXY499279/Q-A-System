import React, { Component } from 'react'
import { DatePicker } from 'antd';
import './index.less'
const { RangePicker } = DatePicker;

export default class AdminTopbar extends Component {
    onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }
    onOk = (value) => {
        console.log('onOk: ', value);
    }
    render() {
        return (
            <div className="admin-topbar">
                <div className="admin-topbar-topbar">
                    <span style={{paddingLeft:"15px"}}> | {this.props.tag ? this.props.tag : null}</span>
                    <div className="time-pick" style={{display: this.props.timeShow === "true" ? "block" : "none"}}>
                        <span>时间段：</span>
                        <RangePicker
                            style={{width:"60%"}}
                                showTime={{ format: 'HH:mm' }}
                                format="YYYY-MM-DD HH:mm"
                                onChange={this.onChange}
                                onOk={this.onOk}
                            />
                    </div>
                </div>
            </div>
        )
    }
}
