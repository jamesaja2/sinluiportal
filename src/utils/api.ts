// client.d.ts is generated from portal backend. Regenerate if API is changed.
import type { AppType } from './client.d.ts'
import { hc } from 'hono/client'

export const client = hc<AppType>(import.meta.env.VITE_BACKEND_URL);