import Vue from 'vue'
import Router from 'vue-router'
import router from '@/router/index'

jest.mock('vue', () => ({
  use: jest.fn()
}))

jest.mock('vue-router', () => class VueRouter {
  constructor (routes) {
    return routes
  }
})

jest.mock('@/views/Welcome', () => 'Welcome component')
jest.mock('@/views/RepoList', () => 'RepoList component')
jest.mock('@/views/RepoDetail', () => 'RepoDetail component')

describe('router', () => {
  it('Vue should use router', () => {
    expect(Vue.use).toHaveBeenCalledWith(Router)
  })

  it('should declare Welcome route', () => {
    expect(router.routes[0].component).toEqual('Welcome component')
    expect(router.routes[0].name).toEqual('Welcome')
    expect(router.routes[0].path).toEqual('/')
  })

  it('should declare RepoList route', () => {
    expect(router.routes[1].component).toEqual('RepoList component')
    expect(router.routes[1].name).toEqual('RepoList')
    expect(router.routes[1].path).toEqual('/users/:user')
  })

  it('should declare RepoDetail route', () => {
    expect(router.routes[2].component).toEqual('RepoDetail component')
    expect(router.routes[2].name).toEqual('RepoDetail')
    expect(router.routes[2].path).toEqual('/users/:user/:repository/detail')
  })
})
