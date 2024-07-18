const AttendeeCard = ({ nickname, avatar, hosted }) => {
  const positionTitle = hosted ? 'Organizer' : 'Member'

  return (
    <div className="col-6 col-sm-4 col-md-3">
      <div className="j-one-attendee">
        <div className="j-one-attendee__img-wrap">
          <img src={avatar} alt="" />
        </div>
        <div className="j-one-attendee__name">{nickname}</div>
        <div className="j-one-attendee__position">{positionTitle}</div>
      </div>
    </div>
  )
}

export default AttendeeCard
