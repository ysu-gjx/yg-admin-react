// import DashBoard from '@/views/dashboard'
// import exp from 'constants'

export interface Result<T = any> {
  code: number
  msg: string
  data: T
}

export interface ResultData<T = any> {
  list: T[]
  page: {
    pageNum: number
    pageSize: number
    total: number | 0
  }
}

export namespace Login {
  export interface params {
    userName: string
    userPwd: string
  }
}

export interface PageParams {
  pageNum: number
  pageSize?: number
}

// 菜单管理
export namespace Menu {
  export interface Params {
    menuName: string
    menuState: number
  }
  export interface CreateParams {
    menuName: string
    icon?: string // 菜单图标
    menuType: number // 菜单类型 1：菜单 2：按钮 3：页面
    menuState: number // 菜单正常 停用
    menuCode?: string // 按钮权限标识
    parentId?: string // 父级菜单id
    path?: string // 菜单路径
    component?: string // 组件名称
  }

  export interface MenuItem extends CreateParams {
    _id: string
    createTime: string
    buttons?: MenuItem[]
    children?: MenuItem[]
  }
  // 菜单编辑
  export interface EditParams extends CreateParams {
    _id: string
  }

  // 删除菜单
  export interface DelParams {
    _id: string
  }
}

// 部门信息类型
export namespace Dept {
  export interface Params {
    deptName?: string
  }

  export interface CreateParams {
    deptName: string
    parentId?: string
    userName: string
  }

  export interface EditParams extends CreateParams {
    _id: string
  }

  export interface DelParams {
    _id: string
  }

  export interface DeptItem {
    _id: string
    createTime: string
    updateTime: string
    deptName: string
    parentId: string
    userName: string
    children: DeptItem[]
  }
}

export namespace User {
  export interface Params extends PageParams {
    userId?: number
    userName?: string
    state?: number
  }
  export interface UserItem {
    _id: string
    userId: number
    userName: string
    userEmail: string
    deptId: string
    state: number
    mobile: string
    job: string
    role: number
    roleList: string
    createId: number
    deptName: string
    userImg: string
  }

  export interface CreateParams {
    userName: string
    userEmail: string
    mobile?: number
    job?: string
    deptId: string
    state?: number
    roleList: string[]
    userImg: string
  }

  export interface EditParams extends CreateParams {
    userId: number
  }
}

export namespace Dashboard {
  export interface ReportData {
    driverCount: number
    totalMoney: number
    orderCount: number
    cityNum: number
  }

  export interface LineData {
    label: string[]
    order: string[]
    money: string[]
  }

  export interface PieData {
    name: string
    value: number
  }

  export interface RadarData {
    indicator: Array<{ name: string; max: number }>
    data: {
      name: string
      value: number[]
    }
  }
}

export namespace Role {
  export interface Params extends PageParams {
    roleName?: string
  }
  export interface CreateParams {
    roleName: string
    remark?: string
  }
  export interface RoleItem extends CreateParams {
    _id: string
    permissionList: {
      checkedKeys: string[]
      halfCheckedKeys: string[]
    }
    updateTime: string
    createTime: string
  }

  export interface EditParams extends CreateParams {
    _id: string
  }

  export interface Permission {
    _id: string
    permissionList: {
      checkedKeys: string[]
      halfCheckedKeys: string[]
    }
  }
}

export namespace Order {
  export enum IState {
    doing = 1,
    done = 2,
    timeout = 3,
    cance = 4
  }

  export interface CreateParams {
    cityName: string
    userName: string
    mobile: number
    startAddress: string // 订单开始地址
    endAddress: string // 订单结束地址
    orderAmount: number // 订单金额
    userPayAmount: number // 支付金额
    dirverAmount: number // 支付金额
    // 1 微信  2 支付宝
    payType: number // 支付方式
    dirverName: string // 司机名称
    vehicleName: string // 订单车型
    // 1 进行中 2 已完成 3 超时 4 取消
    state: IState // 订单状态
    useTime: string // 用车时间
    endTime: string // 订单结束时间
  }

  export interface OrderItem extends CreateParams {
    _id: string
    orderId: string
    route: Array<{ lng: string; lat: string }> // 行使轨迹
    createTime: string // 订单创建时间
    remark: string // 备注
  }

  export interface SearchParams {
    orderId?: string
    userName?: string
    state?: IState
  }

  export interface Params extends PageParams {
    orderId?: string
    userName?: string
    state?: IState
  }

  export interface DictItem {
    id: string
    name: string
  }

  export interface OrderRoute {
    orderId: string
    route: Array<{ lng: string; lat: string }>
  }

  export interface DriverParams {
    driverName?: string
    accountStatus?: number
  }

  export enum DriverStatus {
    auth = 0, // 待认证
    normal = 1, //正常
    temp = 2, // 暂时拉黑
    always = 3, // 永久拉黑
    stop = 4 //停止推送
  }
  export interface DriverItem {
    driverName: string // 司机名称
    driverId: number // 司机ID
    driverPhone: string // 司机手机号
    cityName: string // 城市名称
    grade: boolean // 会员等级
    driverLevel: number // 司机等级
    accountStatus: DriverStatus // 司机状态
    carNo: string // 车牌号
    vehicleBrand: string // 车辆品牌
    vehicleName: string // 车辆名称
    onlineTime: number // 昨日在线时长
    driverAmount: number // 昨日司机流水
    rating: number // 司机评分
    driverScore: number // 司机行为分
    pushOrderCount: number // 昨日推单数
    orderCompleteCount: number // 昨日完单数
    createTime: string // 创建时间
  }
}
