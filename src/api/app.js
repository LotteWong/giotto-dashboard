import request from '@/utils/request'

export function listApps(query) {
  return request({
    url: '/apps',
    method: 'get',
    params: query
  })
}

export function createApp(data) {
  return request({
    url: '/apps',
    method: 'post',
    data
  })
}

export function showApp(id) {
  return request({
    url: '/apps/' + id,
    method: 'get'
  })
}

export function updateApp(id, data) {
  return request({
    url: '/apps/' + id,
    method: 'put',
    data
  })
}

export function deleteApp(id) {
  return request({
    url: '/apps/' + id,
    method: 'delete'
  })
}

export function getAppFlow(id) {
  return request({
    url: '/dashboard/flow/apps/' + id,
    method: 'get'
  })
}
