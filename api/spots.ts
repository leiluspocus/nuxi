import { type Spot } from '../types/Spot'

import { createClient } from '@supabase/supabase-js'

const initDB = () => {
  const runtimeConfig = useRuntimeConfig();
  return createClient(
    runtimeConfig.public.SUPABASE_HOST,
    runtimeConfig.public.SUPABASE_KEY
  )
}

async function getSpots(): Promise<Array<Spot>> {
  const supabase = initDB();
  const { data } = await supabase.from('spots').select().is('visible', true)
  if (data === undefined || data === null) return []
  return data
}

async function insertSpot(spot: Spot): Promise<Boolean> {
  try {
    const supabase = initDB();
    const { data, error } = await supabase
      .from('spots')
      .insert({ ...spot })
      .select()
    if (error) {
      return false
    }
    return true
  } catch (err) {
    return false
  }
}

export { getSpots, insertSpot }
