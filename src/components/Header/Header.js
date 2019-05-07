import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Header.scss'
import { Layout, Avatar, Badge} from 'antd';
import logo from 'assets/images/logo.png';


const { Header } = Layout;

class CommonHeader extends Component {
	constructor(props) {
        super(props);
    }

    render() {
        return (
        	<Header theme="light" className="header">
					<div className="logo">
						<Avatar shape="square" size="large" src={logo} />
						<span className="logo-text">Admin</span>
					</div>
		    </Header>
    	)
    }
}

export default CommonHeader