import vine from '@vinejs/vine'
import { defineValidator } from '#validators/core'

// Définir les propriétés de validation pour les données d'animal
const properties = {
  name: vine.string().minLength(3).maxLength(255),
  species: vine.string().minLength(3).maxLength(255),
  age: vine.number().min(0).max(100),
  adopted: vine.boolean(),
}

// Exporter le schéma de validation d'animal
export const AnimalSchema = defineValidator(properties)
