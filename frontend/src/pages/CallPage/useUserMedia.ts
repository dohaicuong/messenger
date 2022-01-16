import { useEffect, useState } from 'react'

export const useUserMedia = (constraints?: MediaStreamConstraints | undefined) => {
  const [stream, setStream] = useState<MediaStream>()
  const [error, setError] = useState()

  useEffect(() => {
    navigator.mediaDevices.getUserMedia(constraints)
      .then(setStream)
      .catch(setError)
  }, [constraints?.video, constraints?.audio, constraints?.peerIdentity, constraints?.preferCurrentTab])

  return [stream, error]
}
