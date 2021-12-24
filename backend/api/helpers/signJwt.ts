import { sign } from 'jsonwebtoken'

export const signJwt = (payload: any) => {
  return sign(payload, process.env.JWT_SECRET || '')
}