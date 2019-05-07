import React, {
    Component
} from 'react';
import {
    message
} from "antd";
import axios from 'axios';

class Util {
    init = () => {
        this.bindEvents();
    }

    bindEvents = () => {
        let self = this;
        document.body.addEventListener('click', (e) => {
            if (e.target.className && e.target.className.toString().indexOf('to-customer-framework-link') > -1) {
                e.preventDefault();
                let params = {
                    tab_name: e.target.getAttribute('framework-tab-name'),
                    tab_url: e.target.getAttribute('href'),
                }
                self.toCustomerFramework(params)
            }
        })
    }

    toCustomerFramework({tab_name, tab_url}) {
        let parent_url = location.href,
            is_in_customer_framework = false;
        if (parent !== window) {
            try {
               parent_url = parent.location.href; // 同源
            } catch (e) {
               parent_url = document.referrer; // 不同源
            }
        }
        is_in_customer_framework = parent_url.indexOf('/antd-admin/page/index/iframe') > -1;
        // 在系统框架内
        if (window.parent.frames.length > 0 && is_in_customer_framework) {
            let data = {
                TO_CUSTOMER_FRAMEWORK: [{
                    fnName: 'setNavTabs', // 调用框架的函数名
                    params: { // 调用框架的函数的参数
                        item: {
                            menuName: tab_name,
                            menuUrl: tab_url,
                        }
                    }
                }]
            }
            parent.postMessage(data, '*');
        } else { // 无父窗口 || 父窗口不是-客服系统框架
            window.open(tab_url);
        }
    }
}

let util = new Util();
util.init();
export default util;