import request from '@/utils/request'

export function getTotalFlow() {
  return request({
    url: '/dashboard/flow',
    method: 'get'
  })
}

export function getServicePercentage() {
  return request({
    url: '/dashboard/percentage/services',
    method: 'get'
  })
}

export function getStatistics() {
  return request({
    url: '/dashboard/statistics',
    method: 'get'
  })
}
