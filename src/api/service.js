import request from '@/utils/request'

export function listServices(query) {
  return request({
    url: '/services',
    method: 'get',
    params: query
  })
}

export function deleteService(id) {
  return request({
    url: '/services/' + id,
    method: 'delete'
  })
}
