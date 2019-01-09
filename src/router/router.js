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

// local   /custom-service-views
// online  /custom-service-home
class BasicRoute extends Component {
	render() {
		return (
			<BrowserRouter basename="/custom-service-views/page">
		        <Switch>
		            <Route path="/index" component={indexHtml} />
		            <Route component={NoMatch}/>
		        </Switch>
		    </BrowserRouter>
		);
	}
}

export default BasicRoute;