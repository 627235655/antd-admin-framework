import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Layout, Breadcrumb } from 'antd';
import Iframe from 'react-iframe';

const { Content } = Layout;

class commonIframe extends Component {
	constructor(props) {
        super(props);
        this.state = {
            iframe_url: '',
        }
    }

    componentDidMount() {
        this.setState({
            iframe_url: this.props.location.state,
        })
    }

    onload = () => {
        console.log(1123)
    }

    render() {
        return (
            <Iframe
                url={this.state.iframe_url}
                onLoad={() => this.onload}
                height="100%"
                id="myIframe"
                position="relative"
                width="100%"
                frameBorder="0"
                ref="iframe"
                allowFullScreen/>
        )
    }
}

export default commonIframe;

