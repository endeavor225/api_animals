import Animal from '#models/animal'
import { AnimalValidator } from '#validators/animal'
import type { HttpContext } from '@adonisjs/core/http'

export default class AnimalsController {
  /**
   * @list
   * @summary List all animals
   * @responseBody 200 - <Animal[]>
   * @responseBody 500 - {message: "Internal server error"}
   */
  public async list({ response }: HttpContext) {
    const animals = await Animal.all()
    return response.json(animals)
  }

  /**
   * @show
   * @summary Show a single animal by ID
   * @paramPath id - The ID of the animal to retrieve @type(number) - @required
   * @responseBody 200 - <Animal>
   * @responseBody 404 - {message: "Animal not found"}
   * @responseBody 500 - {message: "Internal server error"}
   */
  public async show({ params, response }: HttpContext) {
    const { id } = params
    const animal = await Animal.findOrFail(id)
    return response.json(animal)
  }

  /**
   * @create
   * @summary Create a new animal
   * @requestBody <AnimalValidator>
   * @responseBody 201 - <Animal>
   * @responseBody 422 - {error: [{message: "Validation error", field: "age", rule: "minLength"}]}
   * @responseBody 500 - {message: "Internal server error"}
   */
  public async create({ request, response }: HttpContext) {
    const payload = await request.validateUsing(AnimalValidator)
    const animal = await Animal.create(payload)
    return response.status(201).json(animal)
  }

  /**
   * @update
   * @summary Update an existing animal by ID
   * @paramPath id - The ID of the animal to update @type(number) - @required
   * @requestBody <AnimalValidator>
   * @responseBody 200 - <Animal>
   * @responseBody 404 - {message: "Animal not found"}
   * @responseBody 422 - {error: [{message: "Validation error", field: "age", rule: "minLength"}]}
   * @responseBody 500 - {message: "Internal server error"}
   */
  public async update({ params, request, response }: HttpContext) {
    const { id } = params
    const payload = await request.validateUsing(AnimalValidator)
    const animal = await Animal.findOrFail(id)
    animal.merge(payload)
    await animal.save()
    return response.json(animal)
  }

  /**
   * @delete
   * @summary Delete an animal by ID
   * @paramPath id - The ID of the animal to delete @type(number) - @required
   * @responseBody 204 - No Content
   * @responseBody 404 - {message: "Animal not found"}
   * @responseBody 500 - {message: "Internal server error"}
   */
  public async delete({ params, response }: HttpContext) {
    const { id } = params
    const animal = await Animal.findOrFail(id)
    await animal.delete()
    return response.status(204).noContent()
  }
}
