import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './Aside.scss'
import { Link } from 'react-router-dom';
import { Layout, Button, Menu, Badge, Icon} from 'antd';

const { SubMenu } = Menu;
const { Sider } = Layout;

class CommonAside extends Component {
	constructor(props) {
        super(props);
        this.state = {
            menuList: [],
            collapsed: false,
            rootSubmenuKeys: [],
            openKeys: this.props.openKeys,
        }
    }

    setIframeUrl = (url) => {
        return {
              pathname:'/index/iframe',
              state: url,
        }
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    getMenuItems = () => {
        let self = this,
            data = {
                loginUserId: window.loginUserId || 878,
                businessType: 1,
            }
        axios.post('/custom-service-home/menu/getUserMenuTree', data)
        .then(function(response) {
            let res = response.data;
            let rootSubmenuKeys = self.state.rootSubmenuKeys;
            res.data.subMenuList.map((item, i) => {
                if (item.subMenuList.length > 0) {
                    rootSubmenuKeys.push(item.menuName)
                }
            })
            self.setState({
                menuList: res.data.subMenuList,
                rootSubmenuKeys: rootSubmenuKeys,
            })
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    // 只有一个人菜单栏打开
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.setState({ openKeys });
        } else {
          this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
          });
        }
      }

    setMenuList = (menuList, parentKey = '') => {
        return menuList.map((item, i) => {
            if (item.subMenuList.length === 0) {
                return  <Menu.Item key={item.menuName} onClick={() => this.props.setNavTabs(item, parentKey)}>
                            <Link to={this.setIframeUrl(item.menuUrl)}>
                                { !parentKey && <Icon type={item.menuIcon} />}
                                <span>{item.menuName}</span>
                            </Link>
                        </Menu.Item>
            } else {
                return  <SubMenu key={item.menuName} title={<span><Icon type={item.menuIcon} /><span>{item.menuName}</span></span>}>
                            {
                                this.setMenuList(item.subMenuList, item.menuName)
                            }
                        </SubMenu>
            }
        })
    }

    componentDidMount() {
        this.getMenuItems();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            openKeys: nextProps.openKeys,
        })
    }

    render() {
        return (
        	<Sider
                trigger={null}
                collapsible
                collapsed={this.state.collapsed}
                className="aside"
            >
            <div className="trigger-wrap">
                <Icon
                  className="trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
            </div>
		        <Menu
                    selectedKeys={this.props.selectedKeys}
                    onSelect={this.props.onSelect}
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                    mode="inline"
                    style={{ borderRight: 0 }}
		        >
			        {
	        			this.setMenuList(this.state.menuList)
        			}
			    </Menu>
	        </Sider>
    	)
    }
}

export default CommonAside