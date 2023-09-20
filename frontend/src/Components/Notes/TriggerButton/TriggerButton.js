import React from 'react';
const Trigger = ({ buttonRef, showModal }) => {
  return (
    <button
      className="btn btn-lg btn-danger center modal-button"
      ref={buttonRef}
      onClick={showModal}
      style={{ backgroundColor: 'transparent' , border: 'none'}}
      
    >
    <img src="./img/create.png" alt="Create Note"></img>
    </button>
  );
};
export default Trigger;
