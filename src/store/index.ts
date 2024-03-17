import { create } from 'zustand'
import { User } from '@/types/api'

type State = {
  token: string
  userInfo: User.UserItem
  collapsed: boolean
}

type Action = {
  updateToken: (token: State['token']) => void
  updateUserInfo: (userInfo: State['userInfo']) => void
  updateCollapsed: () => void
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
  collapsed: false,
  updateToken: token => set(() => ({ token })),
  updateUserInfo: userInfo => set(() => ({ userInfo })),
  updateCollapsed: () => set(state => ({ collapsed: !state.collapsed }))
}))
