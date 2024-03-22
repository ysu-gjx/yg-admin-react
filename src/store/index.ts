import { create } from 'zustand'
import { User } from '@/types/api'
import storage from '@/utils/storage'

type State = {
  token: string
  userInfo: User.UserItem
  collapsed: boolean
  isDark: boolean
}

type Action = {
  updateToken: (token: State['token']) => void
  updateUserInfo: (userInfo: State['userInfo']) => void
  updateCollapsed: () => void
  updateTheme: (isDark: State['isDark']) => void
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
  isDark: storage.get('isDark') || false,
  updateToken: token => set(() => ({ token })),
  updateUserInfo: userInfo => set(() => ({ userInfo })),
  updateCollapsed: () => set(state => ({ collapsed: !state.collapsed })),
  updateTheme: isDark => set(() => ({ isDark }))
}))
