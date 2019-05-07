import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import util from '../assets/js/util';

class DemoCloseCurrentTab extends Component {
    constructor(props) {
        super(props);
    }

    controlFramework({ fnName, params }) {
        let parent_url = location.href,
            is_in_framework = false;
        if (parent !== window) {
            try {
                parent_url = parent.location.href; // 同源
            } catch (e) {
                parent_url = document.referrer; // 不同源
            }
        }
        is_in_framework = parent_url.indexOf('/antd-admin/page/index/iframe') > -1;
        // 在 antd-admin 框架内
        if (window.parent.frames.length > 0 && is_in_framework) {
            let data = {
                controlFrameworkInfo: {
                    fnName, // 调用框架的函数名
                    params, // 调用框架的函数的参数
                    // EG: 新增 nav
                    // {
                    //  fnName: 'setNavTabs',
                    //  params: {
                    //      item: {
                    //          menuName: tab_name,
                    //          menuUrl: tab_url,
                    //      }
                    // }
                    // EG: 删除 nav
                    // {
                    //  fnName: 'remove',
                    //  params: 'tab_name'
                }
            };
            parent.postMessage(data, '*')
        } else { // 无父窗口 || 父窗口不是- antd-admin 框架
            // 新增 nav_tab 则新窗口打开此页面
            if (fnName === 'setNavTabs') {
                window.open(params.item.menuUrl)
            }
        }
    }

    render() {
        return (
            <div className="p-lg">
                <p>
                    <a
                        onClick={() => {
                            this.controlFramework({
                                fnName: 'remove',
                                params: '关闭标签页',
                            })
                        }}
                    >
                        关闭当前标签页
                    </a>
                </p>
                <p>
                    <a
                        onClick={() => {
                            this.controlFramework({
                                fnName: 'remove',
                                params: '首页',
                            })
                        }}
                    >
                        关闭指定标签页 - 首页
                    </a>
                </p>
                使用方法见<a href="https://www.ningzongyuan.com" target="_blank">https://www.ningzongyuan.com</a>
            </div>
        )
    }
}

export default DemoCloseCurrentTab;