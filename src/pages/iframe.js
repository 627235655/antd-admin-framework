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
            iframe_url: this.props.location.state.iframe_url,
            iframe_nav_name: this.props.location.state.iframe_nav_name,
        }
    }

    componentWillReceiveProps(nextProps) {
        let iframe_is_reload = nextProps.location.state.is_reload,
            iframe_url_is_same = nextProps.location.state.iframe_url.split('?')[0] === this.state.iframe_url.split('?')[0],
            iframe_nav_name_is_same = nextProps.location.state.iframe_nav_name === this.state.iframe_nav_name
        // 代表侧边栏被点击 iframe 刷新 // 判断不带参数的页面路由是否一致.split('?')[0]
        if (iframe_is_reload && iframe_url_is_same && iframe_nav_name_is_same) {
            this.setState({
                iframe_url : ""
            })
            setTimeout(() => {
                this.setState({
                    iframe_url : nextProps.location.state.iframe_url
                })
            }, 1)
        }
    }

    componentDidMount(){
        window.removeEventListener("message", getPostMessage, false);
        function getPostMessage(event) {
            if(event != undefined){
                event.data.controlFrameworkInfo
                &&
                window[event.data.controlFrameworkInfo.fnName](event.data.controlFrameworkInfo.params)
            }
        }
        //监听message事件
        window.addEventListener("message", getPostMessage, false);
    };

    render() {
        return (
            <Iframe
                url={this.state.iframe_url}
                onLoad={() => {}}
                height="100%"
                id={this.state.iframe_url}
                position="relative"
                width="100%"
                frameBorder="0"
                ref="iframe"
                allowFullScreen/>
        )
    }
}

export default commonIframe;