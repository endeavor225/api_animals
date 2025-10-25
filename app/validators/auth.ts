import vine from '@vinejs/vine'
import { defineValidator } from '#validators/core'

export const RegisterValidator = defineValidator({
  email: vine
    .string()
    .email()
    .maxLength(255)
    .toLowerCase()
    .trim()
    .unique(async (db, value) => {
      const match = await db.from('users').select('id').where('email', value).first()
      return !match
    }),
  password: vine.string().minLength(8),
})

export const LoginValidator = defineValidator({
  email: vine.string().email().toLowerCase().trim(),
  password: vine.string().minLength(8),
})
