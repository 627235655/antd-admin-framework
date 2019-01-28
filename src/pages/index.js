import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';
import {
	Route
} from 'react-router-dom';
import {
	Layout,
	Breadcrumb,
	Tabs,
	Link
} from 'antd';
import axios from 'axios';
import CommonHeader from '../components/Header/Header';
import CommonAside from '../components/Aside/Aside';
import commonIframe from './Iframe';

const {
	Content
} = Layout;
const TabPane = Tabs.TabPane;

class indexHtml extends Component {
	constructor(props) {
		super();
		this.newTabIndex = 0;
		this.state = {
			userName: window.userName, // 后端绑定
        	logoutUrl: window.logoutUrl, // 后端绑定
        	menuList: [],
        	rootSubmenuKeys: [],
			panes: [],
			activeKey: '首页', // tab - 默认打开首页
			selectedKeys: ['首页'], // aside - 默认打开首页
			openKeys: [], // aside - 默认打开首页
		}
	}

	// 在此处获取或者设置导航菜单信息
	getMenuItems = () => {
		let self = this;
		let res = {
			data: {
				subMenuList: [
					{
						"subMenuList": [],
						"menuIcon": "",
						"menuUrl": "/antd-admin/page/demo-home",
						"menuId": 1,
						"menuName": "首页"
					},
					{
						"subMenuList": [],
						"menuIcon": "",
						"menuUrl": "/antd-admin/page/demo-control-other-tab",
						"menuId": 2,
						"menuName": "打开另一个侧边导航"
					},
					{
						"subMenuList": [],
						"menuIcon": "",
						"menuUrl": "/antd-admin/page/demo-control-new-tab",
						"menuId": 3,
						"menuName": "新开标签页"
					},
					{
						"subMenuList": [
							{
								"subMenuList": [],
								"menuIcon": "",
								"menuUrl": "https://www.dota2.com.cn/index.htm",
								"menuId": 5,
								"menuName": "DOTA2-官网"
							},
							{
								"subMenuList": [],
								"menuIcon": "",
								"menuUrl": "https://tieba.baidu.com/f?kw=dota2&fr=ala0&tpl=5",
								"menuId": 6,
								"menuName": "DOTA2-贴吧"
							},
							{
								"subMenuList": [],
								"menuIcon": "",
								"menuUrl": "http://www.dotamax.com/",
								"menuId": 7,
								"menuName": "MAX+"
							},
							{
								"subMenuList": [],
								"menuIcon": "",
								"menuUrl": "https://baike.baidu.com/item/%E5%88%80%E5%A1%942/18511480?fromtitle=dota2&fromid=5221381&fr=aladdin",
								"menuId": 8,
								"menuName": "DOTA2-百度百科"
							}
						],
						"menuIcon": "form",
						"menuId": 4,
						"menuName": "DOTA2-二级菜单"
					}
				]
			}
		}
		self.setState({
            menuList: res.data.subMenuList,
            rootSubmenuKeys: self.state.rootSubmenuKeys,
        }, () => {
        	// 默认打开首页
	        if (self.state.menuList.length > 0) {
	            self.changeHistory({
					iframe_url: self.state.menuList[0].menuUrl,
					is_reload: false,
				})
	            self.setNavTabs({
	        		item:self.state.menuList[0],
	        	})
	        }
        })
    }

	// 改变页面路由
	changeHistory = (params = {}) => {
		let path = {
			pathname: '/index/iframe',
			state: params,
		}
		this.props.history.push(path);
	}

	/**
	 * [判断链接是否存在于侧边栏]
	 * @param  {[type]} url [链接URL]
	 * @return {[type]}     [description]
	 */
	isInMenuList = (url) => {
		let reg_str = url.split('?')[0],
			params_str = url.split('?')[1] ? '?' + url.split('?')[1] : '',
			iframe_url,
			is_include = false;
		this.state.menuList.map((v, i) => {
			if (v.subMenuList.length  ===  0) {
				let href_without_search = v.menuUrl.split('?')[0];
				if (href_without_search.indexOf(reg_str) > -1) {
					is_include = true;
					iframe_url = href_without_search + params_str; // 链接存在于侧边栏
				}
			} else {
				v.subMenuList.map((v2, i2) => {
					let href_without_search = v2.menuUrl.split('?')[0];
					if (href_without_search.indexOf(reg_str) > -1) {
						is_include = true;
						iframe_url = href_without_search + params_str; // 链接存在于侧边栏
					}
				})
			}
		})
		if (!is_include) {
			iframe_url = url.indexOf('http') > -1 ? url : window.location.origin + url; // 外链 和 不是导航的内链
		}
		return {is_include, iframe_url};
	}

	/**
	 * [切换 tab]
	 * @param  {[type]} activeKey [description]
	 * @return 无需刷新iframe, 同时切换侧边栏导航
	 */
	onChange = (activeKey) => {
		this.state.panes.map((item, i) => {
			if (item.key === activeKey) {
				this.setState({
					activeKey: activeKey,
					selectedKeys: [activeKey],
					openKeys: [item.parentKey],
				});
				// 保持 iframe 不刷新 - 改变 history 的原因-要确认哪一个 iframe 是打开的
				this.changeHistory({
					iframe_url: item.source_item.menuUrl,
					is_reload: false,
				})
			}
		})
	}

	// tab 绑定 remove 事件
	onEdit = (targetKey, action) => {
		this[action](targetKey);
	}

	/**
	 * [新增 tab]
	 * @param  {[string]} item      [侧边栏导航的选中项]
	 * @param  {[string]} parentKey [侧边栏导航的选中项的父导航]
	 * @return 存在则切换至该 tab 并且刷新 iframe, 负责新增 tab
	 */
	setNavTabs = ({item, parentKey = ''}) => {
		let is_in_panes = false,
			is_in_menulist = this.isInMenuList(item.menuUrl).is_include;
		item.menuUrl = this.isInMenuList(item.menuUrl).iframe_url;
		this.state.panes.forEach((pane, i) => {
			if (pane.title === item.menuName) {
				is_in_panes = true;
			}
		});
		// 切换页面路由
		this.changeHistory({
			iframe_url: item.menuUrl,
			is_reload: true,
		})
		// 不存在于侧边栏则新 tab 打开
		if (!is_in_menulist) {
			// 切换 tab 页
			this.setState({
				activeKey: item.menuName,
			});
		} else {
			// 切换侧边栏 - tab 页
			this.setState({
				activeKey: item.menuName,
				selectedKeys: [item.menuName],
				openKeys: [parentKey],
			});
		}
		if (!is_in_panes) {
			let obj = {
				title: item.menuName,
				key: item.menuName,
				source_item: item,
				parentKey: parentKey,
			}
			this.state.panes.push(obj);
			this.setState({
				panes: this.state.panes,
			});
		}
	}

	/**
	 * [移除 tab]
	 * @param  {[string]} targetKey [移除的tab 名称]
	 * @return 修改对应的侧边栏选中项
	 */
	remove = (targetKey) => {
		let activeKey = this.state.activeKey,
			selectedKeys = this.state.selectedKeys,
			openKeys = this.state.openKeys,
			lastIndex; // 下一个 active 的 tab index

		this.state.panes.forEach((pane, i) => {
			if (pane.key === targetKey) {
				lastIndex = i - 1;
			}
		});

		const panes = this.state.panes.filter(pane => pane.key !== targetKey);
		// 删除首项 && tab 为空； 则页面为空
		if (lastIndex === -1 && panes.length === 0) {
			this.changeHistory()
			activeKey = null;
			selectedKeys = [];
			openKeys = [];
		}
		// 首项选中 && 删除首项 && tab 不为空； 则 tab 切换至 当前第一项
		else if (lastIndex === -1 && panes.length > 0 && activeKey === targetKey) {
			activeKey = panes[0].key;
			selectedKeys = [panes[0].key];
			openKeys = [panes[0].parentKey];
		}
		// 此项选中 && 删除此项； 则 tab 切换至 当前最后一项
		else if (lastIndex >= 0 && activeKey === targetKey) {
			activeKey = panes[lastIndex].key;
			selectedKeys = [panes[lastIndex].key];
			openKeys = [panes[lastIndex].parentKey];
		}
		this.setState({
			panes,
			activeKey,
			selectedKeys,
			openKeys
		});
	}

	/**
	 * [选中侧边栏]
	 * @param  {[type]} options.item         [description]
	 * @param  {[type]} options.key          [description]
	 * @param  {[type]} options.selectedKeys [description]
	 * @return {[type]}                      [description]
	 */
	onSelect = ({
		item,
		key,
		selectedKeys
	}) => {
		this.state.panes.map((item, i) => {
			if (item.key === key) {
				this.setState({
					activeKey: key,
					selectedKeys: [key],
					openKeys: [item.parentKey],
				});
			}
		})
	}

	componentDidMount() {
        this.getMenuItems();
		window.setNavTabs = this.setNavTabs;
	}

	render() {
		return (
			<Layout>
			    <CommonHeader
			    	userName={this.state.userName}
        			logoutUrl={this.state.logoutUrl}
			    />
			    <Layout>
			      	<CommonAside
			      		menuList={this.state.menuList}
			      		rootSubmenuKeys={this.state.rootSubmenuKeys}
			      		pathname={this.props.location.pathname}
			      		setNavTabs={({item, parentKey}) => this.setNavTabs({item, parentKey})}
			      		selectedKeys={this.state.selectedKeys}
			      		openKeys={this.state.openKeys}
			      		onSelect={this.onSelect}
			      		history={this.props.history}
		      		/>
		      		<Layout className="page-layout">
			      		<Tabs
				          hideAdd
				          onChange={this.onChange}
				          activeKey={this.state.activeKey}
				          type="editable-card"
				          onEdit={this.onEdit}
				        >
				          {this.state.panes.map(pane =>
				          	<TabPane tab={pane.title} key={pane.key}>
					          	<Content className="page-content">
			                    	<Route
			                    		exact
			                    		path={`/index/iframe`}
			                    		component={commonIframe}
		                    		/>
	                    		</Content>
                    		</TabPane>)}
        				</Tabs>
		            </Layout>
			    </Layout>
		  </Layout>
		)
	}
}

export default indexHtml;