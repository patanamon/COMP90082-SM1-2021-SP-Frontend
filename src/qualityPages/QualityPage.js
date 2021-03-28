import React from 'react';
import styles from './quality.module.css';


class QualityPage extends React.Component{

    render(){
         return [
             // header with team name and quality type
             qualityHeader("Team " + this.props.team +" "+ this.props.qType + " Quality"),
             // TO DO summary
             summary()
         ]
    }
}

// THE BELOW FUNCTIONS CAN BE POTENTIALLY EXTRACTED TO A GENERIC COMPONENTS PACKAGE

// generic header
function qualityHeader(team, quality){
    return (
        <div>
            <h5 className={styles.projecteam}>{team}</h5>
            {/*<h6 className={styles.qualityname}>{quality}</h6>*/}
        </div>
    )
}

// generic paragraph in a box
function summary(){ 
    const placeholderText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    return(
        <div>
            <p className={styles.summary}>{placeholderText}</p>
        </div>
    );
}



export default QualityPage;