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
import DemoControlOtherTab from '../pages/demo-control-other-tab'
import DemoControlNewTab from '../pages/demo-control-new-tab'


class BasicRoute extends Component {
	render() {
		return (
			<BrowserRouter basename="/antd-admin/page">
		        <Switch>
		            <Route path="/index" component={indexHtml} />
		            <Route path="/demo-home" component={DemoHome}/>
		            <Route path="/demo-control-other-tab" component={DemoControlOtherTab}/>
		            <Route path="/demo-control-new-tab" component={DemoControlNewTab}/>
		            <Route component={NoMatch}/>
		        </Switch>
		    </BrowserRouter>
		);
	}
}

export default BasicRoute;