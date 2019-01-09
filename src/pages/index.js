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
			userName: window.userName,
        	logoutUrl: window.logoutUrl,
			panes: [],
			activeKey: '首页',
			selectedKeys: ['首页'], // 默认打开首页
			openKeys: [],
		}
	}

	setNavTabs = (item, parentKey) => {
		this.add(item, parentKey)
	}

	// 切换 tab
	onChange = (activeKey) => {
		this.state.panes.map((item, i) => {
			if (item.key === activeKey) {
				this.setState({
					activeKey: activeKey,
					selectedKeys: [activeKey],
					openKeys: [item.parentKey],
				});
				let path = {
					pathname: '/index/iframe',
					state: {
						url: item.source_item.menuUrl,
						reload: false,
					},
				}
				this.props.history.push(path);
			}
		})
	}

	// tab 绑定 remove 事件
	onEdit = (targetKey, action) => {
		this[action](targetKey);
	}

	// 新增 tab
	add = (item, parentKey) => {
		let self = this;
		let is_include = false;
		this.state.panes.forEach((pane, i) => {
			if (pane.title === item.menuName) {
				is_include = true;
			}
		});
		if (is_include) {
			// 存在则刷新 iframe
			let path = {
				pathname: '/index/iframe',
				state: {
					url: item.menuUrl,
					reload: true,
				},
			}
			this.props.history.push(path);
		} else {
			// 不存在 则 push 进 tab_panes 数组
			let obj = {
				title: item.menuName,
				key: item.menuName,
				source_item: item,
				parentKey: parentKey,
			}
			this.state.panes.push(obj);
			this.setState({
				panes: this.state.panes,
				activeKey: item.menuName,
			});
			// 页面路由变化
			let path = {
				pathname: '/index/iframe',
				state: {
					url: item.menuUrl,
					reload: true,
				},
			}
			this.props.history.push(path);
		}
	}

	// 移除 tab
	remove = (targetKey) => {
		let activeKey = this.state.activeKey;
		let selectedKeys = this.state.selectedKeys;
		let openKeys = this.state.openKeys;
		let lastIndex; // 下一个 active 的 tab index
		this.state.panes.forEach((pane, i) => {
			if (pane.key === targetKey) {
				lastIndex = i - 1;
			}
		});
		const panes = this.state.panes.filter(pane => pane.key !== targetKey);
		// 删除首项 且 tab 为空； 则页面为空
		if (lastIndex === -1 && panes.length === 0) {
			let path = {
				pathname: '/index/iframe',
				state: '',
			}
			this.props.history.push(path);
			activeKey = null;
			selectedKeys = [];
			openKeys = [];
		}
		// 首项选中 且 删除首项 且 tab 不为空； 则 tab 切换至 当前第一项
		else if (lastIndex === -1 && panes.length > 0 && activeKey === targetKey) {
			activeKey = panes[0].key;
			selectedKeys = [panes[0].key];
			openKeys = [panes[0].parentKey];
		}
		// 此项选中 且 删除此项； 则 tab 切换至 当前最后一项
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
		panes.map((item, i) => {
			if (item.key === activeKey) {
				this.setState({
					openKeys: [item.parentKey],
				});
				// 页面路由变化
				let path = {
					pathname: '/index/iframe',
					state: {
						url: item.source_item.menuUrl,
						reload: false,
					},
				}
				this.props.history.push(path);
			}
		})
	}

	// 侧边栏选中
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

	render() {
		return (
			<Layout>
			    <CommonHeader
			    	userName={this.state.userName}
        			logoutUrl={this.state.logoutUrl}
			    />
			    <Layout>
			      	<CommonAside
			      		pathname={this.props.location.pathname}
			      		setNavTabs={(item, parentKey) => this.setNavTabs(item, parentKey)}
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
			                    	<Route exact path={`/index/iframe`} component={commonIframe} />
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