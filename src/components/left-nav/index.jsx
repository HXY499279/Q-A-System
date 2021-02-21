import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'

import { Menu } from 'antd';



//? 引入菜单配置
import menuList from '../../config/menuConfig'

//? 在 antd 中使用阿里图标
import { createFromIconfontCN } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2372127_cicuaidwmxq.js',
  });


class LeftNav extends Component {

    render() {
        const checkedItem = this.props.location.pathname;
        return (
            <div className="left-nav">
                <IconFont type="icon-twitter" />
                <div style={{ width: '100%' }}>
                    <Menu
                    mode="inline"
                    theme="light"
                    selectedKeys={[checkedItem]}
                    style={{fontSize:'16px', color:'#908080'}}
                    >
                    {
                        menuList.map((menuItem) => {
                        return (
                            <Menu.Item key={menuItem.route}>
                            <IconFont style={{fontSize:20,color:'#30CB88'}} type={menuItem.icon}/>
                            <Link to={menuItem.route}>{menuItem.title}</Link>
                            </Menu.Item>
                        )
                        })
                    }
                    </Menu>
                </div>
            </div>
        )
    }
}
export default withRouter(LeftNav)