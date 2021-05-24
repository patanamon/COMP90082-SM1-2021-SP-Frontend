/**
 * This is the AuthRoute react component.
 * Following parameters are props to pass to the component
 * 
 * @summary AuthRoute Component <AuthRoute />
 * @class AuthRoute
 * @author Hilmi Tolga SAHIN (hsahin@virtual-affairs.com)
 * @copyright Virtual Affairs B.V.
 * @requires react
 * @requires react-redux
 * @requires prop-types
 */

import React from 'react'
import {connect} from 'react-redux'
import {Route, Redirect, withRouter} from 'react-router-dom'

class AuthRoute extends React.Component {
	constructor (props) {
		super(props)
		this.state = {}
	}
	componentWillMount () {
        
	}
	componentDidMount () {

	}

	render () {
		const {exact, path, redirect, component, ...rest} = this.props
		const Component = component
		const routeProps = {exact, path}
		return <Route {...routeProps} render={() => {
			if(this.props.authState === `checking`) {
				return <h1>Loading ... </h1>
			} else if(this.props.authState === `loggedin`) {
				return <Component {...rest} />
			} else if(this.props.authState === `loggedout`) {
				return <Redirect to={redirect} />
			} 
			return <div>You are not logged in </div>
		}} />
	}
}

AuthRoute.defaultProps = {}
AuthRoute.propTypes = {}

const mapStateToProps = function (state) {
	return {
		'authState' :       state.auth.state
	}
}
const mapDispatchToProps = dispatch => {
	return {

		// .. some prop to call dispatch 

	}
}
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthRoute))