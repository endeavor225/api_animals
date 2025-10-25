/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'
import { middleware } from '#start/kernel'

// Import dynamic controller
const homeController = () => import('#controllers/home_controller')
const animalsController = () => import('#controllers/animals_controller')
const authController = () => import('#controllers/auth_controller')

// returns swagger in YAML
router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

// Renders Swagger-UI and passes YAML-output of /swagger
router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
  // return AutoSwagger.default.scalar("/swagger"); to use Scalar instead. If you want, you can pass proxy url as second argument here.
  // return AutoSwagger.default.rapidoc("/swagger", "view"); to use RapiDoc instead (pass "view" default, or "read" to change the render-style)
})

router.post('/register', [authController, 'register']).as('auth.register')
router.post('/login', [authController, 'login']).as('auth.login')
router.get('/me', [authController, 'me']).as('auth.me').use(middleware.auth())

router
  .group(() => {
    router.get('/', [animalsController, 'list'])
    router.get('/:id', [animalsController, 'show'])
    router.post('/', [animalsController, 'create'])
    router.put('/:id', [animalsController, 'update'])
    router.delete('/:id', [animalsController, 'delete'])
  })
  .prefix('/animals')

router.get('/', [homeController, 'index'])
