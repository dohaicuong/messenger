import { sign, verify } from 'jsonwebtoken'

export const signJwt = (payload: any) => {
  return sign(payload, process.env.JWT_SECRET || '')
}

export const verifyJwt = (token?: string): string | undefined => {
  if (!token) return

  try {
    const payload = verify(token, process.env.JWT_SECRET || '')
    return payload.sub as string
  }
  catch(err) {
    return
  }
}