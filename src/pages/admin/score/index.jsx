import React, { Component } from 'react'
import AdminTopbar from '../../../components/admin-topbar'
import Rule from './rule'
import './index.less'
export default class Score extends Component {
    state = {
        scoreDataSource:[
            {
                index: '01',
                name: 'aqiuya',
                academy: '经济管理学院',
                allscore: '235'
            }
        ]
    }
    render() {
        // const scoretColumns = [
        //     {
        //         title: '序号',
        //         dataIndex: 'index',
        //         align: 'center'
        //       },
        //     {
        //         title: '姓名',
        //         dataIndex: 'name',
        //         align: 'center'
        //       },
        //       {
        //         title: '所属学院',
        //         dataIndex: 'academy',
        //         align: 'center'
        //       },
        //       {
        //         title: '总积分',
        //         dataIndex: 'allscore',
        //         align: 'center'
        //       },
        // ]
        return (
            <div className="score">
                <div className="score-rule">
                    <div className="score-object">
                        <AdminTopbar tag="积分规则"/>
                        <div className="score-object-content">
                            <Rule/>
                        </div>
                    </div>
                    {/* <div className="score-object">
                        <AdminTopbar tag="积分规则——提问"/>
                        <div className="score-object-content">
                            <Rule/>
                        </div>
                    </div>
                    <div className="score-object">
                        <AdminTopbar tag="积分规则——答疑"/>
                        <div className="score-object-content">
                            <Rule/>
                        </div>
                    </div> */}
                </div>
                {/* <div className="score-search">

                    <AdminTopbar tag="用户积分"/>
                    <div className="score-search-top">
                        <ul>
                            <li>角色：<Input style={{width:200}}/></li>
                            <li>姓名：<Input style={{width:200}}/></li>
                            <li>所属学院：<Input style={{width:200}}/></li>
                        </ul>
                        <ul>
                            <Button type="primary" icon={<SearchOutlined />}>
                                搜索
                            </Button>
                            <Button type="primary" icon={<DownloadOutlined />} style={{marginLeft:30}}>
                                导出
                            </Button>   
                        </ul>    
                    </div>
                    <Table 
                    style={{padding:'20px'}}
                    bordered
                    align="center"
                    pagination={{ pageSize: 10 }} 
                    dataSource={this.state.scoreDataSource}
                    columns={scoretColumns} 
                    rowKey="index"/>
                </div> */}
            </div>
        )
    }
}
