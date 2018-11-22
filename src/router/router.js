import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import indexHtml from '../pages/index'
import NoMatch from '../pages/no-match'

// /customer-service-system-backend
// /custom-service-home/page
class BasicRoute extends Component {
	render (){
		return (
		    <BrowserRouter basename="/custom-service-home/page">
		        <Switch>
		            <Route path="/index" component={indexHtml} />
		            <Route component={NoMatch}/>
		        </Switch>
		    </BrowserRouter>
		);
	}
}

export default BasicRoute;
