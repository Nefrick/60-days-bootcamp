import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

 const Alert = () => {
  const { alert } = useContext(AlertContext);
  const { msg, type } = alert || { msg: null, type: null };
  console.log('Alert:', alert);
  return (
    msg && type && (
      <div className={`alert alert-${type}`}>
        <i className="fas fa-info-circle"></i> {msg}
      </div>
    )
  )
}

export default Alert;