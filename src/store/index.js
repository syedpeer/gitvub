import Vue from 'vue'
import Vuex from 'vuex'
import repositories from './modules/repositories'
import users from './modules/users'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    repositories,
    users
  },
  strict: debug
})

/* istanbul ignore if */
if (module.hot) {
  module.hot.accept([
    './modules/repositories',
    './modules/users'
  ], () => {
    const repositories = require('./modules/repositories').default
    store.hotUpdate({
      modules: {
        repositories,
        users
      }
    })
  })
}

export default store
