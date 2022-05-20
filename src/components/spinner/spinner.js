import React from 'react';

const Spinner = () => {
  return (
    <div className="spinner row mt-5 d-flex justify-content-center align-items-center">
      <div className="lds-css col-md-8">
        <div className="lds-double-ring">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
