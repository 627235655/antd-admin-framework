import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter,
	Route,
	Switch
} from 'react-router-dom';
import indexHtml from '../pages/index'
import NoMatch from '../pages/no-match'
import DemoHome from '../pages/demo-home'
import DemoOpenAsideTab from '../pages/demo-open-aside-tab'
import DemoOpenNewTab from '../pages/demo-open-new-tab'
import DemoCloseCurrentTab from '../pages/demo-close-current-tab'


class BasicRoute extends Component {
	render() {
		return (
			<BrowserRouter basename="/antd-admin/page">
		        <Switch>
		            <Route path="/index" component={indexHtml} />
		            <Route path="/demo-home" component={DemoHome}/>
		            <Route path="/demo-open-aside-tab" component={DemoOpenAsideTab}/>
		            <Route path="/demo-open-new-tab" component={DemoOpenNewTab}/>
		            <Route path="/demo-close-current-tab" component={DemoCloseCurrentTab}/>
		            <Route component={NoMatch}/>
		        </Switch>
		    </BrowserRouter>
		);
	}
}

export default BasicRoute;