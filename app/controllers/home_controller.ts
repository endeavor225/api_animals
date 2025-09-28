import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  public async index({ response }: HttpContext) {
    return response.json({ message: 'welcome to the AdonisJS API Application' })
  }
}
