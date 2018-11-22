import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import { Layout, Breadcrumb, Tabs, Link } from 'antd';
import CommonHeader from '../components/Header/Header';
import CommonAside from '../components/Aside/Aside';
// import CommonBreadcrumb from '../components/Breadcrumb/Breadcrumb';
import commonIframe from './Iframe';



const { Content } = Layout;
const TabPane = Tabs.TabPane;

class indexHtml extends Component {
	constructor(props) {
        super();
        this.newTabIndex = 0;
        this.state = {
        	breadcrumb_list: ['客服系统'],
      		panes: [],
        	activeKey: '',
        	selectedKeys: [],
        	openKeys: [],
        }
    }

    setNavTabs = (item, parentKey, is_change) => {
        // if (this.state.breadcrumb_list.includes(item.menuName)) {
        //     return;
        // } else {
        //     let arr = ['客服系统'];
        //     arr.push(item.menuName)
        //     this.setState({
        //         breadcrumb_list: arr
        //     })
        // }
        !is_change && this.add(item, parentKey)
    }

    onChange = (activeKey) => {
    	// 页面路由变化
    	this.state.panes.map((item, i) => {
    		if (item.key === activeKey) {
    			let path = {
		              pathname:'/index/iframe',
		              state: item.source_item.menuUrl,
		        }
    			this.props.history.push(path);
    			this.setState({
		    		activeKey: activeKey,
		    		selectedKeys: [activeKey],
		        	openKeys: [item.parentKey],
    			});
    		}
    	})
  	}

  	onEdit = (targetKey, action) => {
	    this[action](targetKey);
  	}

  	add = (item, parentKey) => {
  		let is_include = false;
	    this.state.panes.forEach((pane, i) => {
	      	if (pane.title === item.menuName) {
	        	is_include = true;
	      	}
	    });
	    if (is_include) {
	    	return;
	    } else {
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
	    }
  	}

  	remove = (targetKey) => {
	    let activeKey = this.state.activeKey;
	    let selectedKeys = this.state.selectedKeys;
	    let openKeys = this.state.openKeys;
	    let lastIndex;
	    this.state.panes.forEach((pane, i) => {
	      	if (pane.key === targetKey) {
	      	 	lastIndex = i - 1;
	      	}
	    });
	    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
	    if (lastIndex === -1 && panes.length === 0) {
	    	let path = {
	              pathname:'/index/iframe',
	              state: '',
	        }
			this.props.history.push(path);
	    	activeKey = null;
	      	selectedKeys = [];
	      	openKeys = [];
	    }else if (lastIndex === -1 && panes.length > 0 && activeKey === targetKey) {
	    	activeKey = panes[0].key;
	      	selectedKeys = [panes[0].key];
	      	openKeys = [panes[0].parentKey];
	    } else if (lastIndex >= 0 && activeKey === targetKey) {
	      	activeKey = panes[lastIndex].key;
	      	selectedKeys = [panes[lastIndex].key];
	      	openKeys = [panes[lastIndex].parentKey];
	    }
	    this.setState({ panes, activeKey, selectedKeys, openKeys });
	    // 页面路由变化
	    panes.map((item, i) => {
    		if (item.key === activeKey) {
    			let path = {
		              pathname:'/index/iframe',
		              state: item.source_item.menuUrl,
		        }
    			this.props.history.push(path);
    			this.setState({
		        	openKeys: [item.parentKey],
    			});
    		}
    	})
  	}

  	onSelect = ({ item, key, selectedKeys }) => {
  		console.log(item, key, selectedKeys, this.state.panes)
    	this.state.panes.map((item, i) => {
    		if (item.key === key) {
    			this.setState({
		    		activeKey: key,
		    		selectedKeys: [key],
		        	openKeys: [item.parentKey],
    			});
    			console.log(this.state)
    		}
    	})
  	}

    render() {
        return (
    		<Layout>
			    <CommonHeader/>
			    <Layout>
			      	<CommonAside
			      		pathname={this.props.location.pathname}
			      		setNavTabs={(item, parentKey) => this.setNavTabs(item, parentKey)}
			      		selectedKeys={this.state.selectedKeys}
			      		openKeys={this.state.openKeys}
			      		onSelect={this.onSelect}
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
			                    	<Route path={`/index/iframe`} component={commonIframe} />
	                    		</Content>
                    		</TabPane>)}
        				</Tabs>
		            </Layout>
			    </Layout>
		  </Layout>
        )
    }
}

// <CommonBreadcrumb
// 		breadcrumb_list={this.state.breadcrumb_list}
// />
export default indexHtml;

