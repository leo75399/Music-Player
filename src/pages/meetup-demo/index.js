import { useEffect, useState } from 'react'
import MemberMeetupCard from './MemberMeetupCard'
import axios from 'axios'
import { MEETUP_HOST, MEETUP_JOIN } from '../../config'

// FIX
// 理論上應該是 user.member_sid
// 但這邊為了不要太複雜所以先寫死
const currentLoginUser_id = 2

const Demo = () => {
  // NOTE Host 的代表 活動為該用戶舉辦的 因此該用戶為"舉辦人"
  const [userHostedMeetup, setUserHostedMeetup] = useState([])

  // NOTE Join 的代表 該用戶參加的活動  因此該用戶為"參加人"
  const [userJoinedMeetup, setUserJoinedMeetup] = useState([])

  /////////////////////////////////////////////////////////
  // Host 獲取 該用戶舉辦的活動
  useEffect(() => {
    const getUserHostedMeetup = async () => {
      // FIX currentLoginUser_id
      const { data } = await axios.get(MEETUP_HOST + currentLoginUser_id)

      // TODO: 看要不要處理 data.error 但理論上正常操作 + 用戶都有登入的情況下
      // 頂多沒有舉辦紀錄
      data.success ? setUserHostedMeetup(data.result) : console.log(data.error)
    }
    getUserHostedMeetup()
  }, [])

  /////////////////////////////////////////////////////////
  // Join 獲取 該用戶參加的活動
  useEffect(() => {
    const getUserJoinedMeetup = async () => {
      // FIX currentLoginUser_id
      const { data } = await axios.get(MEETUP_JOIN + currentLoginUser_id)

      // TODO: 看要不要處理 data.error 但理論上正常操作 + 用戶都有登入的情況下
      // 頂多沒有舉辦紀錄
      data.success ? setUserJoinedMeetup(data.result) : console.log(data.error)
    }
    getUserJoinedMeetup()
  }, [])

  /////////////////////////////////////////////////////////
  // Host map 該用戶舉辦的活動
  const renderedUserHostedMeetup = userHostedMeetup.map((meetup) => (
    <MemberMeetupCard key={meetup.id} meetup={meetup} />
  ))

  /////////////////////////////////////////////////////////
  // Join map 該用戶參加的活動
  const renderedUserJoinedMeetup = userJoinedMeetup.map((meetup) => (
    <MemberMeetupCard key={meetup.id} meetup={meetup} />
  ))

  return (
    <>
      {/* Host */}
      <div className="container mt-5">
        <div style={{ fontSize: '32px' }} className="text-center">
          當前登入用戶所舉辦的活動(寫死的:currentLoginUser_id=2 )
        </div>
        <div className="row">{renderedUserHostedMeetup}</div>
      </div>

      {/* --------------------------------------------------------------- */}

      {/* Join */}
      <div className="container mt-5">
        <div style={{ fontSize: '32px' }} className="text-center">
          當前登入用戶所參加的活動(非舉辦者)(寫死的:currentLoginUser_id=2 )
        </div>
        <div className="row">{renderedUserJoinedMeetup}</div>
      </div>
    </>
  )
}

export default Demo
