import { User } from '@/types/api'
export type IAction = 'create' | 'edit' | 'delete'

export interface IModalRef {
  open: (action: IAction, data?: User.UserItem) => void
}
export interface IModalProp {
  // mRef: MutableRefObject<
  //   | {
  //       open: (action: IAction, data?: User.UserItem) => void
  //     }
  //   | undefined
  // >
  update: () => void
}
