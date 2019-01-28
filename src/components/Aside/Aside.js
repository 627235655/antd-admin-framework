import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import './Aside.scss'
import {
    Link
} from 'react-router-dom';
import {
    Layout,
    Button,
    Menu,
    Badge,
    Icon
} from 'antd';

const {
    SubMenu
} = Menu;
const {
    Sider
} = Layout;

class CommonAside extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuList: this.props.menuList,
            collapsed: false,
            rootSubmenuKeys: this.props.rootSubmenuKeys,
            openKeys: this.props.openKeys,
        }
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    // 只有一个菜单栏打开
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({
                openKeys
            });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }

    setMenuList = (menuList, parentKey = '') => {
        return menuList.map((item, i) => {
                if (item.subMenuList.length === 0) {
                    return (<Menu.Item
                                key={item.menuName}
                                onClick={() => this.props.setNavTabs({item, parentKey}) }
                            >
                                <a>
                                    { !parentKey && <Icon type={item.menuIcon} />}
                                    <span>{item.menuName}</span>
                                </a>
                            </Menu.Item>)
                } else {
                    return (<SubMenu
                                key={item.menuName}
                                title={
                                    <span>
                                        <Icon type={item.menuIcon}/>
                                        <span>{ item.menuName } </span> </span>
                                    }
                                >
                                {this.setMenuList(item.subMenuList, item.menuName)}
                            </SubMenu>
                )
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            menuList: nextProps.menuList,
            rootSubmenuKeys: nextProps.rootSubmenuKeys,
            openKeys: nextProps.openKeys,
        });
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