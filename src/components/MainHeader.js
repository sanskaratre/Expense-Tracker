import React, { Fragment } from 'react';
import './MainHeader.module.css';

const MainHeader=() =>{

  return (
      <Fragment>
        <div className="up">
          <h3 className="h3"> 
            <div className="a" >
              HOME
           </div>
           <div className="a" >
              STORE
           </div> 
           <div className="a">
              ABOUT us
           </div>
        </h3>
      </div>
</Fragment>
  )
}

export default MainHeader;
