import React from 'react';
import { Redirect } from 'react-router-dom';
import md5 from 'md5';
import logo from "../unimelb_logo.jpg";

import { connect } from 'react-redux';
import { userActions } from '../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email:'',
            password: '',
            role: '',
            firstName: '',
            lastName: '',
            submitted: false,
            // This info stand for the user is a valid user in the backend database
            existedUser: false,
            validRegister: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    // TODO: find a method with no error
    validateEmail(email) {
        const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return re.test(email);
    }


    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password, firstName, lastName } = this.state;
        if (username && password && firstName && lastName) {
            var  registerInfo = {
                'key' : getQueryStringArgs(),
                'username' : username,
                'password': md5(password),
                'first_name':firstName,
                'last_name':lastName,
            };
            
            this.props.register(registerInfo);
        }
    }

    render() {
        const { Registering } = this.props;
        const { username, email, password, role, firstName, lastName, submitted, existedUser, validInput, validRegister} = this.state;
        // If this user is a valid user, then after it login, the page will jump to the coordinator homepage
        if(this.state.validRegister){
            return (<Redirect to={'/CoordinatorHomepage'}/>)
        }
        return (
            <div className="uomcontent">
                <div role="main">
            {/*<div className="col-md-6 col-md-offset-3">*/}
                {uomHeader("Welcome to SP System Registration")}
                <h2></h2>
                <form name="form">
                    {submitted && existedUser &&
                        <div className="help-block">This username is already registered.</div>
                    }
                    {validInput &&
                        <div className="help-block">Please input valid information.</div>
                    }
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !firstName ? ' has-error' : '')}>
                        <label htmlFor="firstName">First Name</label>
                        <input type="firstName" className="form-control" name="firstName" value={firstName} onChange={this.handleChange} />
                        {submitted && !firstName &&
                            <div className="help-block">First name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !lastName ? ' has-error' : '')}>
                        <label htmlFor="lastName">Last Name</label>
                        <input type="lastName" className="form-control" name="lastName" value={lastName} onChange={this.handleChange} />
                        {submitted && !lastName &&
                            <div className="help-block">Last name is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <a className="button cta" onClick={this.handleSubmit} >Register</a>
                        {Registering &&
                            <div className="help-block">You are Successfully register to the system!</div>
                        }
                    </div>
                </form>
            {/*</div>*/}
                </div>
            </div>
        );
    }
}

function uomHeader(pageName){
    return (
        <header class="header">
            <img src={logo} className="logo" id="logo" alt="logo"/>
            <h1 id='title'>{pageName}</h1>
        </header>
    )
}


function getQueryStringArgs(){ 

    // return the part before ?
    var args = window.location.search;
    // return the part without "?invite_key="
    args = args.substring(12);

    return args; 
} 


function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };

