import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';


class CommonBreadcrumb extends Component {
	constructor(props) {
        super(props);
        this.state = {
            breadcrumb_list: []
        }
    }

    setBreadcrumbList(breadcrumb_list) {
        let array = [];
        breadcrumb_list.map((item, i) => {
            let obj = {
                path: '/home',
                breadcrumbName: item
            }
            array.push(obj)
        })
        this.setState({
            breadcrumb_list: array
        })
    }

    componentDidMount() {
        this.setBreadcrumbList(this.props.breadcrumb_list);
    }

    componentWillReceiveProps(nextProps) {
        this.setBreadcrumbList(nextProps.breadcrumb_list)
    }

    itemRender(route, params, routes, paths) {
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
    }

    render() {
        let routes = this.state.breadcrumb_list;
        return (
            <Breadcrumb
                itemRender={this.itemRender}
                routes={routes}
            />
        )
    }
}

export default CommonBreadcrumb;

