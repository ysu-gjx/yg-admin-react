/**
 * 工具类函数封装
 */

import { Menu } from '@/types/api'
import type { RouteObject } from 'react-router-dom'

// 格式化金额
export const formatMoney = (num?: number | string) => {
  if (!num) return '0.00'
  const a = parseFloat(num.toString())
  return a.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' })
}

// 格式化数字
export const formatNum = (num?: number | string) => {
  if (!num) return 0
  const a = num.toString()
  if (a.indexOf('.') > -1) return a.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  return a.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
}

// 格式化时间
export const toLocalDate = (date?: Date, rule?: string) => {
  let curDate = new Date()
  if (date) curDate = date
  if (rule === 'yyyy-MM-dd') {
    return curDate.toLocaleDateString().replaceAll('/', '-')
  }
  if (rule === 'HH:mm:ss') {
    return curDate.toLocaleTimeString().replaceAll('/', '-')
  }
  return curDate.toLocaleString().replaceAll('/', '-')
}

// 格式化日期
export const formatDate = (date?: Date | string, rule?: string) => {
  let curDate = new Date()
  if (date instanceof Date) curDate = date
  else if (date) curDate = new Date(date)

  let fmt = rule || 'yyyy-MM-dd HH:mm:ss'
  fmt = fmt.replace(/(y+)/, curDate.getFullYear().toString())
  type OType = {
    [key: string]: number
  }
  const O: OType = {
    'M+': curDate.getMonth() + 1,
    'd+': curDate.getDate(),
    'H+': curDate.getHours(),
    'm+': curDate.getMinutes(),
    's+': curDate.getSeconds()
  }
  for (const k in O) {
    const val = O[k].toString()
    fmt = fmt.replace(new RegExp(`(${k})`), O[k] > 9 ? O[k].toString() : '0' + O[k].toString())
    // fmt = fmt.replace(new RegExp(`(${k})`), ('00' + val).substring(val.length))
  }
  return fmt
}

// 用户状态转换
export const formateState = (state: number) => {
  if (state === 1) return '在职'
  if (state === 2) return '试用期'
  if (state === 3) return '离职'
}

// 获取页面路径
export const getMenuPath = (list: Menu.MenuItem[]): string[] => {
  return list.reduce((result: string[], item: Menu.MenuItem) => {
    return result.concat(Array.isArray(item.children) && !item.buttons ? getMenuPath(item.children) : item.path + '')
  }, [])
}

// 递归获取路由对象
export const searchRoute: any = (targetPath: string, routes: RouteObject[]) => {
  for (const route of routes) {
    if (route.path === targetPath) {
      return route
    }
    if (route.children && route.children.length) {
      return searchRoute(targetPath, route.children)
    }
  }

  return ''
}

// 手机号加密
export const formateMobile = (mobile?: string | number) => {
  if (!mobile) return '-'
  const phone = mobile.toString()
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}
