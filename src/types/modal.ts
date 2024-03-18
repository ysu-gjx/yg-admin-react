import { User } from '@/types/api'

export type IAction = 'create' | 'edit' | 'delete'

export interface IModalRef<T = User.UserItem> {
  open: (action: IAction, data?: T) => void
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
