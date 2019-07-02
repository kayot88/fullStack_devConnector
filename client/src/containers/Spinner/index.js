import React from 'react';
import './style.css'

const Spinner = () => {
  return (
    <div className="lds-css ng-scope">
      <div className="lds-pacman">
        <div>
          <div />
          <div />
          <div />
        </div>
        <div>
          <div />
          <div />
        </div>
      </div>
    </div>
  );
};

export default Spinner;
