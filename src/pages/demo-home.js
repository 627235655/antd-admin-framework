import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';

class DemoHome extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="p-lg">
                <h3>项目背景</h3>
                    <ul className="desc-list">
                        <li>公司所有项目组的后台管理系统都混合在一个大的 admin 系统中，此 admin 系统是使用 jQuery 开发，样式老旧，切不支持多 tab 打开，小伙伴们可能会有同时打开几个页面的需求，故而需要打开多个浏览器窗口，极其不方便</li>
                        <li>本人所在的项目组决定将本项目组的所有内容迁移出来，从新的 admin 系统迭代维护，新页面使用 react 开发，同时也要继续维护旧的 jQuery 开发的页面，但入口必须是新的 admin 系统</li>
                        <li>最终选择使用 antd，且使用 iframe 的方式，以保证能正常使用旧项目的功能</li>
                    </ul>
            	<h3>基于 Antd 的多 Tab 切换后台系统</h3>
            	<p>
        			基于 antd 的后台管理系统框架，子页面通过 iframe 嵌入，支持 tab 打开多个子页面
            	</p>
            	<ul className="desc-list">
            		<li>支持多标签页</li>
            		<li>支持多级导航</li>
            		<li>支持 iframe 内控制侧边导航切换</li>
            		<li>支持 iframe 内打开新标签页</li>
            		<li>点击左侧侧边导航可刷新页面</li>
            		<li>点击顶部 tab 导航可切换页面且保存当前页面信息</li>
            	</ul>
                <p className="tips">注意：此框架最好为单独的一个项目，不要把子页面写在框架所在的项目里，以便于复用(设置不同的侧边导航列表和 header 即是不同的系统)</p>
                <p className="tips">注意：登录功能可自行结合公司登录系统进行拓展，权限控制可通过控制侧边导航内容实现</p>
                <h3>优点及使用场景</h3>
                <p>
                    可适用于老项目，新项目混合的模式，子页面不拘泥于前端框架
                </p>
                <ul className="desc-list">
                    <li>框架本身是使用 react 技术栈，ui 框架为 antd，为了保证整体样式统一，建议子页面也使用 antd</li>
                    <li>子页面通过 iframe 嵌入，所以不论子页面是用什么框架书写，都无所谓</li>
                </ul>
                <h3>使用方法</h3>
                <p>
                    拷贝此项目，然后设置你的导航列表即可
                </p>
                <ul className="desc-list">
                    <li>cd 到工作目录</li>
                    <li>clone 项目：<code>git clone git@github.com:627235655/antd-admin-framework.git</code></li>
                    <li>更改文件名：<code>mv antd-admin-framework A(your name)</code></li>
                    <li>删除 .git：<code>cd antd-admin-framework(A)</code> 然后 <code>rm -rf .git</code></li>
                    <li>合并到远程创建的 gitlab 地址：<span className="tips">(本地运行可以先跳过此步骤)</span>
                        <ul>
                            <li><code>git init</code></li>
                            <li><code>git remote add origin http://(远程分支地址)</code></li>
                            <li><code>git add .</code></li>
                            <li><code>git commit -m'(message)'</code></li>
                            <li><code>git push -u origin master</code></li>
                        </ul>
                    </li>
                    <li>安装依赖 <code>npm i</code></li>
                    <li>修改 package.json 的 name&repository 的 URL</li>
                    <li>设置 header 和 侧边导航列表</li>
                    <li><code>npm run dev</code></li>
                </ul>
            	<h3>联系我</h3>
            	<p>github: <a href="https://github.com/627235655/antd-admin-framework" target="_blank">https://github.com/627235655/antd-admin-framework</a></p>
            	<p>email: 627235655@qq.com</p>
            	<p>blog: <a href="https://www.ningzongyuan.com" target="_blank">https://www.ningzongyuan.com</a></p>
            </div>
        )
    }
}

export default DemoHome;