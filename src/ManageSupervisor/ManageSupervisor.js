import React from 'react';
import styles from './manageSupervisor.module.css';
import uomHeader from '../header/uomheader.js';
import { connect } from 'react-redux';
import { userActions } from '../_actions';


class ManageSupervisor extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            emails:'',
            emailText: 'Dear Supervisor,\n\nPlease use the following link to gain access to the system and your allocated projects:\n<URL>\n\nKind regards,\n<Coordinator>\n',
            submitted: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });

        const { emails, emailText } = this.state; 
        if(emails){
            this.props.sendEmail(emails, emailText);
        }

    }

    render(){
        const{ emails, emailText, submitted } = this.state;
        const placeholderText = 'Dear Supervisor,\n\nPlease use the following link to gain access to the system and your allocated projects:\n<url>\n\nKind regards,\n<Coordinator>\n';
        
        return(
            <div className="uomcontent">
                {uomHeader("Invite Supervisor")}
                <div role="main">
                    <form name="form">
                    <div align="center">        
                        <input type = "text" className={styles.searchBar}  name="emails" value={emails} onChange={this.handleChange} placeholder ="Input Email..."/>
                        {submitted && !emails &&
                            <div className="help-block">Email is required!</div>
                        }
                    </div>
                    { Header("Invite Email Details") }
                    <div align = "center">
                        <textarea type = "text" className={styles.emailInputbox} name="emailText" placeholder = {placeholderText} ></textarea>               
                    </div>
                    <div align = "center">
                        <a className="button cta" onClick={this.handleSubmit} >Send Invitation</a>
                        {submitted &&
                            <div className="help-block"> Email is sent to the supervisor(s).</div>
                        } 
                    </div>
                    </form>
                </div>
            </div>
        );
    }
    
}

// THE BELOW FUNCTIONS CAN BE POTENTIALLY EXTRACTED TO A GENERIC COMPONENTS PACKAGE
// generic header
function Header(header){
    return (
        <div align="center" className={styles.hint}>
            <p>
                Input Supervisor's Emails, and separate with "," <br/>
                E.g. supervisor@unimelb.edu.au
            </p>
            <h5>
                {header}
            </h5>
            <h4>
                 
            </h4>
        </div>
    )
}


function mapState(state) {
    const { emails, emailText } = state;
    return { emails, emailText };
}

const actionCreators = {
    sendEmail: userActions.sendEmail,
}

const inviteSupervisor = connect(mapState, actionCreators)(ManageSupervisor);
export { inviteSupervisor as ManageSupervisor };
