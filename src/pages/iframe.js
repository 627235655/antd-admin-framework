import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import {
    Layout,
    Breadcrumb
} from 'antd';
import Iframe from 'react-iframe';

const {
    Content
} = Layout;

class commonIframe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            iframe_url: this.props.location.state.url,
        }
    }

    componentWillReceiveProps(nextProps) {
        // 代表点击的侧边栏 iframe 刷新
        if (nextProps.location.state.reload && nextProps.location.state.url === this.state.iframe_url) {
            this.setState({
                iframe_url : ""
            })
            setTimeout(()=>{
                this.setState({
                    iframe_url : nextProps.location.state.url
                })
            }, 100)
        }
    }

    render() {
        return (
            <Iframe
                url={this.state.iframe_url}
                onLoad={() => {}}
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