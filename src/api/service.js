import request from '@/utils/request'

export function listServices(query) {
  return request({
    url: '/services',
    method: 'get',
    params: query
  })
}

export function createHttpService(data) {
  return request({
    url: '/services/http',
    method: 'post',
    data
  })
}

export function createTcpService(data) {
  return request({
    url: '/services/tcp',
    method: 'post',
    data
  })
}

export function createGrpcService(data) {
  return request({
    url: '/services/grpc',
    method: 'post',
    data
  })
}

export function showService(id) {
  return request({
    url: '/services/' + id,
    method: 'get'
  })
}

export function updateHttpService(id, data) {
  return request({
    url: '/services/http/' + id,
    method: 'put',
    data
  })
}

export function updateTcpService(id, data) {
  return request({
    url: '/services/tcp/' + id,
    method: 'put',
    data
  })
}

export function updateGrpcService(id, data) {
  return request({
    url: '/services/grpc/' + id,
    method: 'put',
    data
  })
}

export function deleteService(id) {
  return request({
    url: '/services/' + id,
    method: 'delete'
  })
}

export function getServiceFlow(id) {
  return request({
    url: '/dashboard/flow/services/' + id,
    method: 'get'
  })
}
