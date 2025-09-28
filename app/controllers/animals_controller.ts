import Animal from '#models/animal'
import { AnimalSchema } from '#validators/animal'
import type { HttpContext } from '@adonisjs/core/http'

export default class AnimalsController {
  public async list({ response }: HttpContext) {
    const animals = await Animal.all()
    return response.json(animals)
  }

  public async show({ params, response }: HttpContext) {
    const { id } = params
    const animal = await Animal.findOrFail(id)
    return response.json(animal)
  }

  public async create({ request, response }: HttpContext) {
    const payload = await request.validateUsing(AnimalSchema)
    const animal = await Animal.create(payload)
    return response.status(201).json(animal)
  }

  public async update({ params, request, response }: HttpContext) {
    const { id } = params
    const payload = await request.validateUsing(AnimalSchema)
    const animal = await Animal.findOrFail(id)
    animal.merge(payload)
    await animal.save()
    return response.json(animal)
  }

  public async delete({ params, response }: HttpContext) {
    const { id } = params
    const animal = await Animal.findOrFail(id)
    await animal.delete()
    return response.status(204).noContent()
  }
}
