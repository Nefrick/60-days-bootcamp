
 const Alert = ({ alert: { msg, type } }) => {
  return (
    msg && type && (
      <div className={`alert alert-${type}`}>
        <i className="fas fa-info-circle"></i> {msg}
      </div>
    )
  )
}

export default Alert;