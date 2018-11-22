import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tabs } from 'antd';
import { Link } from 'react-router-dom';


class CommonTabs extends Component {
	constructor(props) {
        super(props);
        this.state = {
            panes: [],
            activePath: '',
            activeKey: '',
            selectedKeys: [''],
        }
    }

    render() {
        let routes = this.state.Tabs_list;
        return (
            <Tabs
              hideAdd
              onChange={this.onChange}
              activeKey={this.state.activeKey}
              type="editable-card"
              onEdit={this.onEdit}
            >
              {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}></TabPane>)}
            </Tabs>
        )
    }
}

export default CommonTabs;

