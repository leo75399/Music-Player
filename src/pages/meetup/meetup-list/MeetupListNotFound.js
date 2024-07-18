import { withRouter } from 'react-router-dom'

const MeetupListNotFound = ({ history }) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center m-auto flex-column"
      style={{ height: '10vh' }}
    >
      <h2>Oops 查無活動呢</h2>
      <button
        className="btn team-btn mt-3"
        onClick={() => history.push('/meetup/game')}
      >
        隨機抽取MeetUp活動
      </button>
    </div>
  )
}

export default withRouter(MeetupListNotFound)
