import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import nomatch from '../assets/404.png';

class NoMatch extends Component {
	constructor(props) {
        super();
    }

    goHome = () => {
        this.props.history.push('index/iframe');
    }

    render() {
        return (
		        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
                    <img src={nomatch} alt="404.png"/>
                    <Button icon="home" type="dashed" onClick={() => this.goHome()}>返回主页</Button>
                </div>
        )
    }
}

export default NoMatch;

