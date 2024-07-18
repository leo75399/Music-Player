import { useEffect } from 'react'
import { history } from '../joeyLink'

const useTeamPush = (user) => {
  useEffect(() => {
    !user.login && history.push('/')
  }, [user])
}

export default useTeamPush
