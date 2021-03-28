import React from 'react'
// import {Nav} from 'react-bootstrap'
// import styles from './navbar.module.css';
// import styled from 'styled-components';
import '../unimelb.css';
import './uomheader.css';
import logo from '../unimelb_logo.jpg';
// import styles from "./qualityPages/quality.module.css";

// const NavIcon = styled.div`
//     width: 100px;
//     text-align: center;
// `
//
// const NavTitle = styled.p`
//     width: 100px;
//     text-align: center;
//     font-size: 14px;
//     font-family: Lato Regular;
//     font-weight: 100;
//     color: white;
// `
//
// const BarLayout = styled.div`
//     display: grid;
//     height: 100vh;
//     grid-template-columns: 100px;
//     grid-template-rows: repeat(10, 70px) auto 70px;
// `

// class uomHeader extends React.Component{
//     render(){
//         return [
//             <Nav.Link bsPrefix className={styles.navbutton} href={this.props.link}>
//                 <NavIcon>
//                     <img className={styles.filterwhite}
//                          src={this.props.imgsrc}
//                     />
//                 </NavIcon>
//                 <NavTitle>
//                     {this.props.title}
//                 </NavTitle>
//             </Nav.Link>
//         ]
//     }
// }

function uomHeader(pageName) {
    return (
        <div role="main">
            {/*<Nav.Link bsPrefix className={styles.navbutton} href={this.props.link}>*/}
                {/*<NavIcon>*/}
                    {/*<img className={styles.filterwhite}*/}
                         {/*src={this.props.imgsrc}*/}
                    {/*/>*/}
                {/*</NavIcon>*/}
                {/*<NavTitle>*/}
                    {/*{this.props.title}*/}
                {/*</NavTitle>*/}
            {/*</Nav.Link>*/}
            <header className="header">
                {/*<img src={logo} className="logo" id="logo" alt="logo"/>*/}
                <h1 id='title'>{pageName}</h1>
            </header>
        </div>
    )
}

export default uomHeader;