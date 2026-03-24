import { neon } from '@neondatabase/serverless'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { databaseUrl } = useRuntimeConfig()
  if (!databaseUrl) {
    throw createError({ statusCode: 500, message: 'DATABASE_URL non configurée' })
  }
  const sql = neon(databaseUrl)
  const hash_id = crypto.randomUUID().replace(/-/g, '').slice(0, 6)
  console.log(hash_id)
  try {
    await sql`
      INSERT INTO spots (
        hash_id, name, address, lat, lng, postal_code, city,
        stroller_access, changing_table
      ) VALUES (
        ${hash_id}, ${body.name}, ${body.address}, ${body.lat}, ${body.lng},
        ${body.postal_code}, ${body.city}, ${body.stroller_access ?? false},
        ${body.changing_table ?? false}
      )
    `
    return { success: true }
  } catch (err) {
    console.error('[spots.post] Erreur:', err)
    throw createError({ statusCode: 500, message: 'Erreur lors de l\'insertion' })
  }
})
