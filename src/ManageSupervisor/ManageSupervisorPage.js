import React from 'react';
import {ManageSupervisor} from './ManageSupervisor';
import uomHeader from '../header/uomheader.js';

const header = "Manage Supervisor";

class ManageSupervisorPage extends React.Component{

  render (){
    return (
      <div className="uomcontent">
          {uomHeader("Invite Supervisors")}
          <div role="main">
          <div className="page-inner">
            <ManageSupervisor
                header={header}
            />
          </div>
      </div>
  </div>
    )
  }
}

export default ManageSupervisorPage;