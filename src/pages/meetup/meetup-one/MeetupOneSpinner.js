const MeetupOneSpinner = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center "
      style={{ height: '50vh' }}
    >
      <div className="spinner-border team-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default MeetupOneSpinner
