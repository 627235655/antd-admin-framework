import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
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

const subMenuList = [{
                        "subMenuList":[],
                        "menuIcon":"home",
                        "menuUrl":"https://www.ningzongyuan.com/blog/index/home",
                        "menuId":969,
                        "menuName":"首页"
                    },{
                        "subMenuList":[{
                            "subMenuList":[],
                            "menuIcon":"",
                            "menuUrl":"http://dotamax.com/",
                            "menuId":974,
                            "menuName":"max+"
                        },{
                            "subMenuList":[],
                            "menuIcon":"",
                            "menuUrl":"https://tieba.baidu.com/f?kw=dota2&fr=ala0&tpl=5",
                            "menuId":974,
                            "menuName":"dota2吧"
                        },{
                            "subMenuList":[],
                            "menuIcon":"",
                            "menuUrl":"https://www.dota2.com.cn/index.htm",
                            "menuId":974,
                            "menuName":"dota2官网"
                        }],
                        "menuIcon":"form",
                        "menuId":973,
                        "menuName":"Dota2"
                    }];
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
        // axios.post('/custom-service-home/menu/getUserMenuTree', data)
        //     .then(function(response) {
        //         let res = response.data;
        //         let rootSubmenuKeys = self.state.rootSubmenuKeys;
        //         res.data.subMenuList.map((item, i) => {
        //             if (item.subMenuList.length > 0) {
        //                 rootSubmenuKeys.push(item.menuName)
        //             }
        //         })
        //         self.setState({
        //             menuList: res.data.subMenuList,
        //             rootSubmenuKeys: rootSubmenuKeys,
        //         })
        //         // 默认打开首页
        //         if (self.state.menuList.length > 0) {
        //             let path = {
        //                 pathname: '/index/iframe',
        //                 state: {
        //                     url: self.state.menuList[0].menuUrl,
        //                     reload: true,
        //                 },
        //             }
        //             self.props.history.push(path);
        //             self.props.setNavTabs(self.state.menuList[0], '')
        //         }
        //     })
        //     .catch(function(error) {
        //         console.log(error);
        //     });
        // 默认打开首页
        self.setState({
            menuList: subMenuList,
            rootSubmenuKeys: self.state.rootSubmenuKeys,
        }, () => {
            if (self.state.menuList.length > 0) {
                let path = {
                    pathname: '/index/iframe',
                    state: {
                        url: self.state.menuList[0].menuUrl,
                        reload: true,
                    },
                }
                self.props.history.push(path);
                self.props.setNavTabs(self.state.menuList[0], '')
            }
        })
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
                                onClick={() => this.props.setNavTabs(item, parentKey) }
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