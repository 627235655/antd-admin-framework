import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Header.scss'
import { Layout, Avatar, Badge} from 'antd';
import head from 'assets/images/head.png';
import logo from 'assets/images/logo.png';


const { Header } = Layout;

class CommonHeader extends Component {
	constructor(props) {
        super(props);
    }

    render() {
    	let login_user_dom = this.props.userName ?
    						(
								<div className="user">
									<span className="user-head">
										<Avatar shape="circle" size="large" src={head} />
									</span>
									<span className="user-name">{this.props.userName}</span>
									<a className="log-out" href={this.props.logoutUrl}>退出登录</a>
								</div>
							)
							:
							'';
        return (
        	<Header theme="light" className="header">
					<div className="logo">
						<Avatar shape="square" size="large" src={logo} />
						<span className="logo-text">Admin</span>
					</div>
					{
						login_user_dom
					}
		    </Header>
    	)
    }
}

export default CommonHeader