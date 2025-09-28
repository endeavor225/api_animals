/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

// Import dynamic controller
const homeController = () => import('#controllers/home_controller')
const animalsController = () => import('#controllers/animals_controller')

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
