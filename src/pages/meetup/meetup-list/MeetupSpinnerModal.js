import MeetupLoader from '../meetup-loader'

const MeetupSpinnerModal = () => {
  return (
    <div
      className="j-modal-background"
      style={{ background: 'rgba(255,255,255,0.8)' }}
    >
      <MeetupLoader />
    </div>
  )
}

export default MeetupSpinnerModal
