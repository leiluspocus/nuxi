import { neon } from '@neondatabase/serverless'

export default defineEventHandler(async () => {
  const { databaseUrl } = useRuntimeConfig()
  if (!databaseUrl) {
    console.error('[spots.get] DATABASE_URL non configurée')
    return []
  }
  const sql = neon(databaseUrl)
  const data = await sql`SELECT * FROM spots WHERE visible = true`
  console.log('[spots.get]', data.length, 'spots chargés')
  return data
})
