import request from '@/utils/request'

export function listServices(query) {
  return request({
    url: '/services',
    method: 'get',
    params: query
  })
}
