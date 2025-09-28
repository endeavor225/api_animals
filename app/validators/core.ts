import vine from '@vinejs/vine'
import { SchemaTypes } from '@vinejs/vine/types'

/**
 * Définit et compile un validateur basé sur un objet de propriétés.
 *
 * Cette fonction crée un validateur Vine en compilant un schéma objet
 * à partir des propriétés fournies.
 *
 * @template Properties - Type générique représentant un objet avec des clés string et des valeurs SchemaTypes
 * @param properties - Objet contenant les propriétés et leurs types de schéma à valider
 * @returns Un validateur Vine compilé pour l'objet spécifié
 *
 * @example
 * ```typescript
 * const userValidator = defineValidator({
 *   name: vine.string(),
 *   age: vine.number()
 * });
 * ```
 */
export function defineValidator<Properties extends Record<string, SchemaTypes>>(
  properties: Properties
) {
  return vine.compile(vine.object(properties))
}
