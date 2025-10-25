import type { HttpContext } from '@adonisjs/core/http'
import { RegisterValidator, LoginValidator } from '#validators/auth'
import User from '#models/user'

export default class AuthController {
  /**
   * @register
   * @responseBody <RegisterValidator>
   * @responseBody 201 - { "token": <string>, "type": "Bearer", "expiresIn": "2025-01-01T00:00:00.000Z" }
   * @responseBody 422 - { "error": [{ "message": "Validation error", "field": "email", "rule": "unique" }] }
   * @responseBody 500 - { "message": "Internal server error" }
   */
  public async register({ request, auth }: HttpContext) {
    const data = await request.validateUsing(RegisterValidator)
    const user = await User.create(data)
    return await auth.use('jwt').generate(user)
  }

  /**
   * @login
   * @responseBody <LoginValidator>
   * @responseBody 200 - { "token": <string>, "type": "Bearer", "expiresIn": "2025-01-01T00:00:00.000Z" }
   * @responseBody 422 - { "error": [{ "message": "Validation error", "field": "email", "rule": "unique" }] }
   * @responseBody 400 - { "message": "Invalid credentials" }
   * @responseBody 500 - { "message": "Internal server error" }
   */
  public async login({ request, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(LoginValidator)
    const user = await User.verifyCredentials(email, password)
    return await auth.use('jwt').generate(user)
  }

  /**
   * @me
   * @responseBody 200 - { "user": <User> }
   * @responseBody 401 - { "message": "E_UNAUTHORIZED_ACCESS: Unauthorized access" }
   * @responseBody 500 - { "message": "Internal server error" }
   */
  public async me({ auth }: HttpContext) {
    return {
      user: auth.use('jwt').getUserOrFail(),
    }
  }
}
