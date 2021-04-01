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

export function deleteService(id) {
  return request({
    url: '/services/' + id,
    method: 'delete'
  })
}
