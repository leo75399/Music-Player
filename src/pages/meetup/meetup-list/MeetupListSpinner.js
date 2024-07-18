const MeetupListSpinner = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center m-auto"
      style={{ height: '10vh' }}
    >
      <div className="spinner-border team-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default MeetupListSpinner
