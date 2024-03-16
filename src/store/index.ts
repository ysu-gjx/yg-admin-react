import { create } from 'zustand'
import { User } from '@/types/api'

type State = {
  token: string
  userInfo: User.UserItem
}

type Action = {
  updateToken: (token: State['token']) => void
  updateUserInfo: (userInfo: State['userInfo']) => void
}

export const useStore = create<State & Action>(set => ({
  token: '',
  userInfo: {
    _id: '',
    userId: 0,
    userName: '',
    userEmail: '',
    deptId: '',
    state: 0,
    mobile: '',
    job: '',
    role: 0,
    roleList: '',
    createId: 0,
    deptName: '',
    userImg: ''
  },
  updateToken: token => set(() => ({ token })),
  updateUserInfo: userInfo => set(() => ({ userInfo }))
}))
