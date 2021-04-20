import React from 'react'
import {Nav} from 'react-bootstrap'
import styles from './navbar.module.css';
import styled from 'styled-components';
import logo from "../unimelb_logo.jpg";
import { connect } from 'react-redux';
import { userActions } from '../_actions';

const NavIcon = styled.div`
    width: 100px;
    text-align: center;
`

const NavTitle = styled.p`
    width: 100px;
    text-align: center;
    font-size: 14px;
    font-family: Lato Regular;
    font-weight: 100;
    color: white;
`

const BarLayout = styled.div`
    display: grid;
    grid-template-columns: 100px;
    grid-template-rows: repeat(auto-fill, 70px);
`

class NavButton extends React.Component{
    render(){
        return [
            <Nav.Link bsPrefix className={styles.navbutton} href={this.props.link}>
                <NavIcon>
                    <img className={styles.filterwhite}
                         src={this.props.imgsrc}
                    />
                </NavIcon>
                <NavTitle>
                    {this.props.title}
                </NavTitle>
            </Nav.Link>
        ]
    }
}

class GridNavbar extends React.Component{
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { height: props.height };
    }


    componentWillMount() {
        window.addEventListener('resize', this.handleResize.bind(this))
        this.setState({ height: window.innerHeight + 'px' });
    }

    handleResize() {

        this.setState({ height: window.innerHeight + 'px' });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.logout();
    }

    render(){

        var IsSupervisor = false;
        var IsCoordinator = false;
        var IsProject = true;


        var url = GetUrlRelativePath();
        if( url == "/SupervisorHomePage"){
            IsSupervisor = true;
            IsCoordinator = false;
            IsProject = false;

        }else if( url == "/CoordinatorHomePage" 
                ||url == "/ImportProjectPage" 
                ||url == "/ManageSupervisor"){
            IsCoordinator = true;
            IsSupervisor = false;
            IsProject = false;

        }else if( url == "/ProjectHomePage"
                ||url == "/ProcessQualityPage"
                ||url == "/CommunicationQualityPage"
                ||url == "/IndividualContributionPage"
                ||url == "/ProjectSettingsPage"){

            IsProject = true;
            IsCoordinator = false;
            IsSupervisor = false;


        }

        return (
            <div style={{ "backgroundColor": "#014085","min-height":this.state.height}}>
                <img src={logo} className="logo" id="logo" alt="logo" height="100" width="100"/>
                { IsSupervisor &&
                    <BarLayout>
                        <NavButton
                            link = "/SupervisorHomePage"
                            imgsrc = "icons/home.png"
                            title = "Home (S)"
                            id = {4}
                        />
                        <div className={styles.navbutton} onClick={this.handleSubmit}></div>
                        <NavButton
                            link="/LoginPage"
                            imgsrc="icons/logout.png"
                            title="Logout"
                            id = {100}
                        />
                    </BarLayout>
                }
                
                { IsCoordinator &&
                    <BarLayout>
                        <NavButton
                            link = "/CoordinatorHomePage"
                            imgsrc = "icons/home.png"
                            title = "Home (C)"
                            id = {1}
                        />
                        <div className={styles.navbutton} onClick={this.handleSubmit}></div>
                        <NavButton
                            link="/LoginPage"
                            imgsrc="icons/logout.png"
                            title="Logout"
                            id = {100}
                        />
                    </BarLayout>
                }

                {IsProject &&
                    <BarLayout>
                        <NavButton
                            link = "/CoordinatorHomePage"
                            imgsrc = "icons/home.png"
                            title = "Home"
                            id = {1}
                        />
                        <NavButton
                            link = "/ProjectHomePage"
                            imgsrc = "icons/dashboard.png"
                            title = "Project Overview"
                            id = {5}
                        />
                        <NavButton
                            link = "/ProductQualityPage"
                            imgsrc = "icons/product.png"
                            title = "Product"
                        />
                        <NavButton
                            link = "/ProcessQualityPage"
                            imgsrc = "icons/process.png"
                            title = "Process"
                            id = {7}
                        />
                        <NavButton
                            link = "/CommunicationQualityPage"
                            imgsrc = "icons/communication.png"
                            title = "Communication"
                            id = {8}
                        />
                        <NavButton
                            link = "/IndividualContributionPage"
                            imgsrc = "icons/individual.png"
                            title = "Individual"
                            id = {9}
                        />
                        <NavButton
                            link = "/ProjectSettingsPage"
                            imgsrc = "icons/config.png"
                            title = "Configuration"
                            id = {10}
                        />

                        <div className={styles.navbutton} onClick={this.handleSubmit}></div>
                        <NavButton
                            link="/LoginPage"
                            imgsrc="icons/logout.png"
                            title="Logout"
                            id = {100}
                        />
                    </BarLayout>

                }

                { !IsSupervisor && !IsCoordinator && !IsProject &&
                    <BarLayout>
                        <div className={styles.navbutton} onClick={this.handleSubmit}></div>
                        <NavButton
                            link="/LoginPage"
                            imgsrc="icons/logout.png"
                            title="Logout"
                            id = {100}
                        />
                    </BarLayout>

                }



            </div>

        );
    }
}


　function GetUrlRelativePath()
　　{
　　　　var url = document.location.toString();
　　　　var arrUrl = url.split("//");

　　　　var start = arrUrl[1].indexOf("/");
　　　　var relUrl = arrUrl[1].substring(start);

　　　　if(relUrl.indexOf("?") != -1){
　　　　　　relUrl = relUrl.split("?")[0];
　　　　}
　　　　return relUrl;
　　}



function mapState(state) {
    const { loggingIn } = state;
    return { loggingIn };
}

const actionCreators = {
    logout: userActions.logout
};

const TempNavbar = connect(mapState, actionCreators)(GridNavbar);
export { TempNavbar as GridNavbar };