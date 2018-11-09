// We only need to import the modules necessary for initial render
import { injectReducer } from 'store/reducers'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path        : '/',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Home = require('./Home/containers/HomeContainer').default
      const module = require('./Home/containers/HomeModule')
      const reducer = module.default
      const key = module.NAME    
      injectReducer(store, { key, reducer })

      /*  Return getComponent   */
      cb(null, Home)

    /* Webpack named bundle   */
    }, 'home')
  },
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
