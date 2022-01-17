import { useEffect, useState } from 'react'

export const usePeerConnection = (configuration?: RTCConfiguration) => {
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection>()

  const stringConfig = configuration ? JSON.stringify(configuration) : ''
  useEffect(() => {
    const pc = new RTCPeerConnection(configuration)
    setPeerConnection(pc)
  }, [stringConfig])

  return [peerConnection]
}
