import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Header.scss'
import { Layout, Avatar, Badge} from 'antd';
import head from '../../assets/head.png';
import logo from '../../assets/logo.png';


const { Header } = Layout;

class CommonHeader extends Component {
	constructor() {
        super();
        this.state = {
        	userName: window.userName,
        	logoutUrl: window.logoutUrl
        }
    }

    render() {
    	let login_user_dom = '';
    	if (this.state.userName) {
			login_user_dom = (
								<div className="user">
									<span className="user-head">
										<Avatar shape="circle" size="large" src={head} />
									</span>
									<span className="user-name">{this.state.userName}</span>
									<a className="log-out" href={this.state.logoutUrl}>退出登录</a>
								</div>
							)
		}
        return (
        	<Header theme="light" className="header">
					<div className="logo">
						<Avatar shape="square" size="large" src={logo} />
						<span className="logo-text">客服系统</span>
					</div>
					{
						login_user_dom
					}
		    </Header>
    	)
    }
}

export default CommonHeader